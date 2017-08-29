import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {CalendarModule} from "angular-calendar";

import {TaskCalendarComponent} from "./task-calendar.component";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        CalendarModule.forRoot(),
    ],
    exports: [TaskCalendarComponent],
    declarations: [TaskCalendarComponent]
})
export class TaskCalendarModule {
}
