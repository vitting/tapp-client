import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {ChangePasswordComponent} from "./change-password.component";
import {ChangePasswordRoutingModule} from "./change-password-routing.module";
import {PasswordEqualValidatorDirective} from "./passwords-equal.directive";
import {AuthentationService} from "../../services/authentication.service";

@NgModule({
    imports: [
        ChangePasswordRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    exports: [],
    declarations: [
        ChangePasswordComponent,
        PasswordEqualValidatorDirective
    ],
    providers: [AuthentationService],
})
export class ChangePasswordModule {
}
