import * as moment from "moment";
import "moment/locale/da";
import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IChatMessage, IMyInfo, ISocketNewUserConnected} from "../../../../misc/interfaces";

@Component({
    selector: "app-chat-user-message",
    styleUrls: ["./chat-user-message.component.scss"],
    template: `
        <div class="chat-message">
            <div *ngIf="!isMe" class="d-flex justify-content-between align-content-center">
                <span class="chat-message-user-name">{{name}}</span>
                <span class="chat-message-time">{{date}}</span>
            </div>
            <div *ngIf="isMe" class="d-flex justify-content-between align-content-center">
                <span class="chat-message-user-name chat-name-me">{{name}}</span>
                <span class="chat-message-time">{{date}}</span>
            </div>
            <div class="chat-message-text">
                {{message.message}}
            </div>
        </div>
    `
})
export class ChatUserMessageComponent implements OnInit, AfterViewInit {
    @Input() message: IChatMessage = null;
    @Input() user: ISocketNewUserConnected = null;
    @Input() myInfo: IMyInfo = null;
    @Output() messageCreated = new EventEmitter<number>();
    isMe: boolean = false;
    name: string;
    date: string;
    constructor() { }

    ngOnInit() {

        this.date = moment(this.message.date).format("HH:mm DD-MM-YYYY");
        if (this.message.senderId === this.myInfo.id) {
            this.isMe = true;
            this.name = this.myInfo.name;
        } else {
            this.isMe = false;
            this.name = this.user.name;
        }
    }

    ngAfterViewInit(): void {
        this.messageCreated.next(1);
    }
}
