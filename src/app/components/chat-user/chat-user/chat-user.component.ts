import * as $ from "jquery";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IChatMessage, IMyInfo, IResponseValue, ISocketNewUserConnected} from "../../../../misc/interfaces";
import {ChatMessage} from "../../../../misc/helperClasses";
import {ChatSocketService} from "../../../services/chat-socket.service";
import {UtilityService} from "../../../services/utility.service";
import {CommonSocketService} from "../../../services/common-socket.service";

@Component({
    selector: "app-chat-user",
    templateUrl: "./chat-user.component.html",
    styleUrls: ["./chat-user.component.scss"]
})
export class ChatUserComponent implements OnInit {
    @Input() myInfo: IMyInfo;
    @Input() userId: string;
    @Output() closeChat = new EventEmitter<string>();
    @Output() newMessage = new EventEmitter<IChatMessage>();
    message: string = "";
    messages: IChatMessage[] = [];
    user: ISocketNewUserConnected = null;
    private messagesCreated: number = 0;

    constructor(private _commonSocketService: CommonSocketService,
                private _chatSocketService: ChatSocketService,
                public _utilityService: UtilityService) {
    }

    ngOnInit() {
        this.getMessageHistory();
        this._chatSocketService.getChatUserInfo(this.userId).subscribe((res: IResponseValue<ISocketNewUserConnected>) => {
            this.user = res.data;
        });

        this._chatSocketService.getMessage().subscribe((chatMessage: IChatMessage) => {
            this.messages.push(chatMessage);
        });

        this._commonSocketService.checkForNewNotifications();
    }

    private scrollToBottom() {
        const elem = $(`#${this.userId}`);
        const chatOverFlowHeight = elem.find(`.chat-messages-overflow`).height();
        elem.find(`.chat-messages`).scrollTop(chatOverFlowHeight);
    }

    private getMessageHistory() {
        this._chatSocketService.getChatHistory(this.myInfo.id, this.userId).subscribe((messages: IChatMessage[]) => {
            this.messages = messages;
        });
    }

    messageCreated() {
        this.messagesCreated++;
        if (this.messages.length === this.messagesCreated) {
            this.scrollToBottom();
            $(`#${this.userId}`).find(`.message-input`).focus();
        }
    }

    close() {
        this.closeChat.next(this.userId);
    }

    sendNewMessage() {
        this.newMessage.next(new ChatMessage(this.userId, this.myInfo.id, this.message));
        this.message = "";
    }
}
