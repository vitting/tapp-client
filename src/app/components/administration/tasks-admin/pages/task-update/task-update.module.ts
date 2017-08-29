import { NgModule } from "@angular/core";

import {TaskUpdateComponent} from "./task-update.component";
import {TaskFormModule} from "../../elements/task-form/task-form.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditCurrentModule} from "../../../common-elements/edit-current/edit-current.module";

@NgModule({
    imports: [ReactiveFormsModule, TaskFormModule, EditCurrentModule],
    exports: [],
    declarations: [TaskUpdateComponent],
    providers: [],
})
export class TaskUpdateModule { }
