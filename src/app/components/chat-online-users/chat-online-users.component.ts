import * as $ from "jquery";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {IMyInfo, IObjectIndex, ISocketNewUserConnected} from "../../../misc/interfaces";
import {ChatSocketService} from "../../services/chat-socket.service";
import {UtilityService} from "../../services/utility.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: "app-chat-online-users",
    templateUrl: "./chat-online-users.component.html",
    styleUrls: ["./chat-online-users.component.scss"]
})
export class ChatOnlineUsersComponent implements OnInit, OnDestroy {
    @Output() startNewChat = new EventEmitter<ISocketNewUserConnected>();
    @Input() openChatUsers: string[] = [];
    @Input() myInfo: IMyInfo = {id: "", name: "", isAdmin: false};
    chatStatus: boolean = false;
    chatUsersOnline: ISocketNewUserConnected[] = [];
    chatUsersOffline: ISocketNewUserConnected[] = [];
    chatStatusText: string = "Offline";
    messageNotify: Map<string, number> = new Map();
    offlineUserCount: number = 0;
    onlineUserCount: number = 0;
    getOnlineUsersSub: Subscription;
    getOfflineUsersSub: Subscription;
    getSocketStatusSub: Subscription;
    myOfflineUserMessageCountSub: Subscription;

    constructor(private _chatSocketService: ChatSocketService,
                public _utilityService: UtilityService) {
    }

    startChatWith(user: ISocketNewUserConnected) {
        this.resetMessageNotifyForUSer(user.id);
        this.startNewChat.next(user);
    }

    setChatStatus(status: boolean) {
        this.chatStatus = status;
        if (status) {
            this.chatStatusText = "Online";
        } else {
            this.chatStatusText = "Offline";
        }
    }

    private resetMessageNotifyForUSer(userId: string) {
        this.messageNotify.delete(userId);
        $("#counter_" + userId + " .message-unread-counter").text("");
    }

    private initUsersAndStatus() {
        this.getOnlineUsersSub = this._chatSocketService.getOnlineUsers().subscribe((users: ISocketNewUserConnected[]) => {
            this.chatUsersOnline = users;
            this.onlineUserCount = users.length;
        });

        this.getOfflineUsersSub = this._chatSocketService.getOfflineUsers().subscribe((users: ISocketNewUserConnected[]) => {
            this.chatUsersOffline = users;
            this.offlineUserCount = users.length;

            this._chatSocketService.getMyOfflineUsersMessageCount(this.myInfo.id);
        });

        this.myOfflineUserMessageCountSub = this._chatSocketService.myOfflineUsersUnreadMessageCount().subscribe((unreadCount: IObjectIndex) => {
            for (const userId in unreadCount) {
                if (unreadCount.hasOwnProperty(userId)) {
                    $("#counter_" + userId + " .message-unread-counter").text(unreadCount[userId]);
                }
            }
        });

        this.getSocketStatusSub = this._chatSocketService.getSocketStatus().subscribe((status: boolean) => {
            this.chatStatus = status;
            this.setChatStatus(status);
        });
    }

    ngOnInit() {
        this.initUsersAndStatus();
    }

    ngOnDestroy(): void {
        this.getOnlineUsersSub.unsubscribe();
        this.getOfflineUsersSub.unsubscribe();
        this.myOfflineUserMessageCountSub.unsubscribe();
        this.getSocketStatusSub.unsubscribe();
    }
}
