import {Injectable} from "@angular/core";
import * as socketIo from "socket.io-client";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/bindCallback";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/switchMap";
import {IChatMessage, IMyInfo, IObjectIndex, IResponseValue, ISocketNewUserConnected} from "../../misc/interfaces";
import {AuthentationService} from "./authentication.service";
import {config} from "../../misc/configs";
import {Observer} from "rxjs/Rx";
import {HttpSecureService} from "./httpSecure.service";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../misc/helperFunctions";
import Socket = SocketIOClient.Socket;

@Injectable()
export class ChatSocketService {
    private chatSocket: Socket = null;
    private onlineUsers: Subject<ISocketNewUserConnected[]> = new Subject<ISocketNewUserConnected[]>();
    private offlineUsers: Subject<ISocketNewUserConnected[]> = new Subject<ISocketNewUserConnected[]>();
    private messageSub = new Subject<IChatMessage>();
    private socketConnected: Subject<boolean> = new Subject<boolean>();
    private unreadMessageCountSub: Subject<IObjectIndex> = new Subject<IObjectIndex>();

    constructor(private _authService: AuthentationService,
                private _httpSecure: HttpSecureService) {
    }

    initChatSocketEvents() {
        this.chatSocket.on("connect", () => {
            this.socketConnected.next(true);
            this.chatSocket.emit("i_am_active", {
                    "id": this._authService.getUserId(),
                    "name": this._authService.getUserName(),
                    "socketId": this.chatSocket.id
                },
                this._authService.getToken());
        });

        this.chatSocket.on("message", (chatMessage: IChatMessage) => {
            this.messageSub.next(chatMessage);
        });

        // this.chatSocket.on("new_message_notify", (senderId: string) => {
        //     this.messageNotifySub.next(senderId);
        // });

        this.chatSocket.on("my_unread_messages_count", (unreadCount: IObjectIndex) => {
            this.unreadMessageCountSub.next(unreadCount);
        });

        this.chatSocket.on("update_online_users", (usersOnline: ISocketNewUserConnected[], usersOffline: ISocketNewUserConnected[]) => {
            const myInfo: IMyInfo = this._authService.getMyInfo();

            this.onlineUsers.next(
                usersOnline.filter((value) => {
                    return value.socketId !== this.chatSocket.id;
                })
            );

            this.offlineUsers.next(
                usersOffline.filter((value) => {
                    return value.id !== myInfo.id;
                })
            );
        });

        this.chatSocket.on("error", (err) => {
            console.log(err);
        });

        this.chatSocket.on("disconnect", () => {
            this.socketConnected.next(false);
        });
    }

    addChatWindowStatus(myId: string, chatWindowUserId: string) {
        this.chatSocket.emit("chat_window_open", myId, chatWindowUserId);
    }

    removeChatWindowStatus(myId: string, chatWindowUserId: string) {
        this.chatSocket.emit("chat_window_close", myId, chatWindowUserId);
    }

    sendMessage(message: IChatMessage) {
        this.chatSocket.emit("message", message);
    }

    // getMessageNotify() {
    //     return this.messageNotifySub.asObservable();
    // }

    getMessage() {
        return this.messageSub.asObservable();
    }

    startChatSocketService() {
        setTimeout(() => {
            if (!this.chatSocket) {
                this.chatSocket = socketIo(config.chatSocketUrl);
                this.initChatSocketEvents();
            }
        }, 1000);
    }

    stopChatSocketService() {
        if (this.chatSocket) {
            this.chatSocket.disconnect();
            this.chatSocket = null;
        }
    }

    getChatHistory(myId: string, yourId: string): any {
        return Observable.create((observer: Observer<IChatMessage[]>) => {
            const resFn = (result: IChatMessage[]) => {
                observer.next(result);
            };

            this.chatSocket.emit("get_chat_history", myId, yourId, resFn);
        });
    }

    getSocketStatus(): Observable<boolean> {
        return this.socketConnected.asObservable();
    }

    getOnlineUsers(): Observable<ISocketNewUserConnected[]> {
        return this.onlineUsers.asObservable();
    }

    getOfflineUsers(): Observable<ISocketNewUserConnected[]> {
        return this.offlineUsers.asObservable();
    }

    getMyOfflineUsersMessageCount(myId: string): void {
        this.chatSocket.emit("get_my_unread_messages", myId);
    }

    myOfflineUsersUnreadMessageCount(): Observable<IObjectIndex> {
        return this.unreadMessageCountSub.asObservable();
    }

    getChatUserInfo(userId: string): Observable<IResponseValue<ISocketNewUserConnected>> {
        const chatUserUrl = config.apiUrl + "/employees/" + userId + "/chat";
        return this._httpSecure.get(chatUserUrl)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }
}
