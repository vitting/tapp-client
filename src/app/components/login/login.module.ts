import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {LoginComponent} from "./login.component";
import {LoginRoutingModule} from "./login-routing.module";
import {ErrorMessagesService} from "../../services/error-messages.service";

@NgModule({
    imports: [
        ReactiveFormsModule,
        RouterModule,
        LoginRoutingModule
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [
        ErrorMessagesService
    ],
})
export class LoginModule {
}
