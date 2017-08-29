import { NgModule } from "@angular/core";

import { ChatComponent } from "./chat.component";
import {ChatRoutingModule} from "./chat-routing.module";
import {ChatOnlineUsersModule} from "../chat-online-users/chat-online-users.module";
import {ChatUserModule} from "../chat-user/chat-user/chat-user.module";
import {ChatSocketService} from "../../services/chat-socket.service";
import {AuthentationService} from "../../services/authentication.service";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule, ChatRoutingModule, ChatOnlineUsersModule, ChatUserModule],
    exports: [],
    declarations: [ChatComponent],
    providers: [ChatSocketService, AuthentationService],
})
export class ChatModule { }
