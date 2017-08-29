import { NgModule } from "@angular/core";

import { EmpUpdateComponent } from "./emp-update.component";
import {EmpFormModule} from "../../elements/emp-form/emp-form.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditCurrentModule} from "../../../common-elements/edit-current/edit-current.module";

@NgModule({
    imports: [ReactiveFormsModule, EmpFormModule, EditCurrentModule],
    exports: [],
    declarations: [EmpUpdateComponent],
    providers: [],
})
export class EmpUpdateModule { }
