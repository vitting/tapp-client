import { NgModule } from "@angular/core";

import { ChatUserComponent } from "./chat-user.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ChatUserMessageModule} from "../chat-user-message/chat-user-message.module";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ChatUserMessageModule
    ],
    exports: [
        ChatUserComponent
    ],
    declarations: [
        ChatUserComponent
    ],
    providers: [],
})
export class ChatUserModule { }
