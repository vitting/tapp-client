import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {TaskCalendarModule} from "../task-calendar/task-calendar.module";
import {TaskListModule} from "../task-list/task-list.module";
import {TaskDescriptionModalModule} from "../task-description-modal/task-description-modal.module";
import {TaskService} from "../../services/task.service";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TaskCalendarModule,
        TaskListModule,
        TaskDescriptionModalModule
    ],
    exports: [HomeComponent],
    declarations: [
        HomeComponent
    ],
    providers: [
        TaskService
    ]
})
export class HomeModule {
}
