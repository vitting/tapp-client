import {NgModule} from "@angular/core";

import {CustDeleteComponent} from "./cust-delete.component";
import {EditCurrentModule} from "../../../common-elements/edit-current/edit-current.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CustFormModule} from "../../elements/cust-form/cust-form.module";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CustFormModule,
        EditCurrentModule
    ],
    exports: [],
    declarations: [CustDeleteComponent],
    providers: [],
})
export class CustDeleteModule {
}
