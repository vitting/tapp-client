import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {ProfileComponent} from "./profile.component";
import {ProfileService} from "../../services/profile.service";
import {ErrorMessagesService} from "../../services/error-messages.service";
import {DawaService} from "../../services/dawa.service";
import {DawaAddressFormatterPipeModule} from "../../pipes/data-address-formatter.pipe.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule,
        DawaAddressFormatterPipeModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ErrorMessagesService,
        ProfileService,
        DawaService
    ],
})
export class ProfileModule {
}
