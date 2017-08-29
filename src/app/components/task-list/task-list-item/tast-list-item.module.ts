import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TaskListItemComponent} from "./task-list-item.component";

@NgModule({
    imports: [CommonModule],
    exports: [TaskListItemComponent],
    declarations: [TaskListItemComponent],
    providers: [],
})
export class TaskListItemModule {
}
