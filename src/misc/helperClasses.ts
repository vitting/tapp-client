import {IChatMessage} from "./interfaces";

export class ChatMessage implements IChatMessage {
    date: Date;
    receiverId: string;
    senderId: string;
    message: string;
    messageRead: boolean;

    constructor(receiverId: string, senderId: string, message: string, date: Date = new Date(Date.now())) {
        this.receiverId = receiverId;
        this.senderId = senderId;
        this.date = date;
        this.message = message;
        this.messageRead = true;
    }
}
