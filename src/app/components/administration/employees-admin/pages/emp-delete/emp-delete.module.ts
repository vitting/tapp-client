import {NgModule} from "@angular/core";

import {EmpDeleteComponent} from "./emp-delete.component";
import {EditCurrentModule} from "../../../common-elements/edit-current/edit-current.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EmpFormModule} from "../../elements/emp-form/emp-form.module";

@NgModule({
    imports: [
        ReactiveFormsModule,
        EmpFormModule,
        EditCurrentModule
    ],
    exports: [],
    declarations: [EmpDeleteComponent],
    providers: [],
})
export class EmpDeleteModule {
}
