import { NgModule } from "@angular/core";

import { ChatUserMessageComponent } from "./chat-user-message.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [ChatUserMessageComponent],
    declarations: [ChatUserMessageComponent],
    providers: [],
})
export class ChatUserMessageModule { }
