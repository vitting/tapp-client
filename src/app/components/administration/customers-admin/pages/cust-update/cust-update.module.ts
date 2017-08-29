import { NgModule } from "@angular/core";

import { CustUpdateComponent } from "./cust-update.component";
import {CustFormModule} from "../../elements/cust-form/cust-form.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditCurrentModule} from "../../../common-elements/edit-current/edit-current.module";

@NgModule({
    imports: [ReactiveFormsModule, CustFormModule, EditCurrentModule],
    exports: [],
    declarations: [CustUpdateComponent],
    providers: [],
})
export class CustUpdateModule { }
