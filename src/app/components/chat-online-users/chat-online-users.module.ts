import { NgModule } from "@angular/core";

import { ChatOnlineUsersComponent } from "./chat-online-users.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [ChatOnlineUsersComponent],
    declarations: [ChatOnlineUsersComponent],
    providers: [],
})
export class ChatOnlineUsersModule { }
