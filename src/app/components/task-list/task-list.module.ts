import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TaskListComponent} from "./task-list.component";
import {TaskListItemModule} from "./task-list-item/tast-list-item.module";
import {TaskDescriptionModalModule} from "../task-description-modal/task-description-modal.module";

@NgModule({
    imports: [CommonModule, TaskListItemModule, TaskDescriptionModalModule],
    exports: [TaskListComponent],
    declarations: [TaskListComponent],
    providers: [],
})
export class TaskListModule {
}
