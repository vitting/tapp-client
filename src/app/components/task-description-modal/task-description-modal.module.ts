import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TaskDescriptionModalComponent} from "./task-description-modal.component";

@NgModule({
    imports: [CommonModule],
    exports: [TaskDescriptionModalComponent],
    declarations: [TaskDescriptionModalComponent],
    providers: [],
})
export class TaskDescriptionModalModule {
}
