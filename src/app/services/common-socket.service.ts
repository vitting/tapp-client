import {Injectable} from "@angular/core";
import * as socketIo from "socket.io-client";
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
import {config} from "../../misc/configs";
import {AuthentationService} from "./authentication.service";
import Socket = SocketIOClient.Socket;

@Injectable()
export class CommonSocketService {
    private commonSocket: Socket = null;
    private thereIsNewNotifications: Subject<any> = new Subject<any>();
    private doIHaveNewNotificationsInterval: any = null;

    constructor(private _authService: AuthentationService) {
    }

    private initCommonSocketEvents() {
        this.commonSocket.on("connect", () => {
            this.iAmActive();
        });

        this.commonSocket.on("you_have_new_notifications", (numberOfUnreadMessages: number) => {
            this.thereIsNewNotifications.next(numberOfUnreadMessages);
        });

        this.commonSocket.on("error", (err) => {
            console.log("CommonSocket Error", err);
        });

        this.commonSocket.on("disconnect", () => {
            console.log("CommonSocket Disconnected");
        });
    }

    private doIHaveNewNotifications() {
        this.checkForNewNotifications();

        this.doIHaveNewNotificationsInterval = setInterval(() => {
            const myId: string = this._authService.getMyInfo().id;
            if (this._authService.isAuthenticated() && myId) {
                this.commonSocket.emit("do_i_have_new_notifications", myId);
            }
        }, 60000);
    }

    checkForNewNotifications() {
        const myId: string = this._authService.getMyInfo().id;
        if (myId && this.commonSocket) {
            this.commonSocket.emit("do_i_have_new_notifications", myId);
        }
    }

    startCommonSocketService() {
        setTimeout(() => {
            if (!this.commonSocket) {
                this.commonSocket = socketIo(config.commonSocketUrl);
                this.initCommonSocketEvents();
                this.doIHaveNewNotifications();
            }
        }, 1000);
    }

    stopCommonSocketService() {
        if (this.commonSocket) {
            this.commonSocket.disconnect();
            this.commonSocket = null;
            clearInterval(this.doIHaveNewNotificationsInterval);
        }
    }

    iAmActive() {
        if (this._authService.isAuthenticated()) {
            this.commonSocket.emit("i_am_active", this._authService.getUserId(), this._authService.getToken());
        }
    }

    iAmNotActive() {
        this.commonSocket.emit("i_am_not_active", this._authService.getUserId());
    }

    getIsThereNewNotifications() {
        return this.thereIsNewNotifications.asObservable();
    }
}
