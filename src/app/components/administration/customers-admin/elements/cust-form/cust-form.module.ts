import {NgModule} from "@angular/core";

import {CustFormComponent} from "./cust-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UtilityService} from "../../../../../services/utility.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DawaService} from "../../../../../services/dawa.service";
import {DawaAddressFormatterPipeModule} from "../../../../../pipes/data-address-formatter.pipe.module";
import {ErrorMessagesService} from "../../../../../services/error-messages.service";
import {TwoStepSubmitModule} from "../../../common-elements/two-step-submit/two-step-submit.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        DawaAddressFormatterPipeModule,
        TwoStepSubmitModule
    ],
    exports: [CustFormComponent],
    declarations: [CustFormComponent],
    providers: [
        UtilityService,
        DawaService,
        ErrorMessagesService
    ],
})
export class CustFormModule {
}
