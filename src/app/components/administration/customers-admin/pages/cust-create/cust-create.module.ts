import {NgModule} from "@angular/core";

import {CustCreateComponent} from "./cust-create.component";
import {CustFormModule} from "../../elements/cust-form/cust-form.module";

@NgModule({
    imports: [CustFormModule],
    exports: [],
    declarations: [CustCreateComponent],
    providers: [],
})
export class CustCreateModule {
}
