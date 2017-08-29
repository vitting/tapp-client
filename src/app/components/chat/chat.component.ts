import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChatSocketService} from "../../services/chat-socket.service";
import {IChatMessage, IMyInfo, ISocketNewUserConnected} from "../../../misc/interfaces";
import {AuthentationService} from "../../services/authentication.service";
import {NavbarService} from "../navbar/navbar.service";

@Component({
    templateUrl: "./chat.component.html"
})
export class ChatComponent implements OnInit, OnDestroy {
    openChatUsers: string[] = [];
    myInfo: IMyInfo = {id: "", name: "", isAdmin: false};
    messages: IChatMessage[] = [];

    constructor(private _authService: AuthentationService,
                private _chatSocketService: ChatSocketService,
                private _navbarService: NavbarService) {
    }

    startNewChat(user: ISocketNewUserConnected) {
        if (this.openChatUsers.lastIndexOf(user.id) === -1) {
            this.openChatUsers.push(user.id);
            this._chatSocketService.addChatWindowStatus(this.myInfo.id, user.id);
        }
    }

    chatClosed(userId: string) {
        this.openChatUsers.splice(this.openChatUsers.lastIndexOf(userId), 1);
        this._chatSocketService.removeChatWindowStatus(this.myInfo.id, userId);
    }

    sendMessage(message: IChatMessage) {
        this._chatSocketService.sendMessage(message);
    }

    ngOnInit() {
        this._navbarService.showNewMessagesArea(false);
        this._chatSocketService.startChatSocketService();
        this.myInfo = this._authService.getMyInfo();
    }

    ngOnDestroy(): void {
        this._navbarService.showNewMessagesArea(true);
        this._chatSocketService.stopChatSocketService();
    }
}
