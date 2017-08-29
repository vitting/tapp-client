import {NgModule} from "@angular/core";

import {TaskDeleteComponent} from "./task-delete.component";
import {EditCurrentModule} from "../../../common-elements/edit-current/edit-current.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TaskFormModule} from "../../elements/task-form/task-form.module";

@NgModule({
    imports: [
        ReactiveFormsModule,
        TaskFormModule,
        EditCurrentModule
    ],
    exports: [],
    declarations: [TaskDeleteComponent],
    providers: [],
})
export class TaskDeleteModule {
}
