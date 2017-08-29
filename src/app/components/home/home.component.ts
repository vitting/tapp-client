import {AfterViewInit, Component, OnInit} from "@angular/core";

import {TaskService} from "../../services/task.service";
import {ICalendarEvent, IResponseValue, ITask, ITaskAction} from "../../../misc/interfaces";
import {AuthentationService} from "../../services/authentication.service";

@Component({
    template: `
        <div class="row">
            <div class="col-md-12">
                <app-task-calendar [events]="calendarEvents" (monthChange)="getEventsForMonth($event)"
                                   (dayChange)="getTasks($event)"></app-task-calendar>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <app-task-list [taskListItems]="taskList" (taskAction)="userAction($event)"></app-task-list>
            </div>
        </div>
    `
})
export class HomeComponent implements OnInit, AfterViewInit {
    taskList: ITask[] = [];
    selectedTaskDate: Date = new Date(Date.now());
    calendarEvents: any[] = [];

    constructor(private _taskService: TaskService,
                private _authService: AuthentationService) {
    }

    ngAfterViewInit(): void {
        this.getEventsForMonth(this.selectedTaskDate);
        this.getTasks(this.selectedTaskDate);
    }

    ngOnInit() {

    }

    userAction(action: ITaskAction) {
        if (action && action.accepted) {
            const taskId = action.taskId;
            const userId = this._authService.getUserId();

            if (userId) {
                this._taskService.assignToTask(taskId, userId).subscribe((data: IResponseValue<any>) => {
                    if (data.success) {
                        this.getTasks(this.selectedTaskDate);
                    }
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }

    getTasks(date: Date) {
        if (date) {
            this.selectedTaskDate = date;
            this._taskService.getTasksByDate(date, "day").subscribe((tasks: IResponseValue<ITask[]>) => {
                this.taskList = tasks.data;
            });
        }
    }

    getEventsForMonth(date: Date) {
        if (date) {
            this._taskService.getTasksByDate(date, "month").subscribe((tasks: IResponseValue<ICalendarEvent[]>) => {
                this.calendarEvents = this.convertEventDate(tasks.data);
            });
        }
    }

    convertEventDate(events: ICalendarEvent[]): ICalendarEvent[] {
        const newEvents: ICalendarEvent[] = [];
        events.forEach((event: ICalendarEvent) => {
            newEvents.push({
                title: event.title,
                start: new Date(event.start),
                color: event.color
            });
        });

        return newEvents;
    }
}
