import {NgModule} from "@angular/core";

import {TaskCreateComponent} from "./task-create.component";
import {TaskFormModule} from "../../elements/task-form/task-form.module";

@NgModule({
    imports: [TaskFormModule],
    exports: [],
    declarations: [TaskCreateComponent],
    providers: [],
})
export class TaskCreateModule {
}
