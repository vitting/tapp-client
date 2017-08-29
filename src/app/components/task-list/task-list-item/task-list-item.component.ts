import * as moment from "moment";
import "moment/locale/da";
import * as S from "string";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {IEmployee, IItemData, IStoredUser, ITask, ITaskData} from "../../../../misc/interfaces";
import {UtilityService} from "../../../services/utility.service";

@Component({
    selector: "app-task-list-item",
    template: `
        <div class="task-item-container">
            <a class="list-group-item list-group-item-action flex-column align-items-start" (click)="showInfo()">
                <h6 class="mb-1 text-muted">{{taskData.date}}</h6>
                <h6 class="mb-1 text-muted">{{taskData.time}}</h6>
                <h6 class="mb-1 text-muted">{{taskData.title}}</h6>
                <h6 class="mb-1 text-muted">{{taskData.address}}</h6>
                <div class="mb-1 task-item-body">{{taskData.description}}</div>
                <div class="mt-3" *ngIf="taskData.assignedNames">
          <span class="badge badge-pill badge-primary badge-custom" [style.background-color]="colors[i]"
                *ngFor="let name of taskData.assignedNames; let i = index;">{{name}}</span>
                </div>
            </a>
        </div>
    `
})
export class TaskListItemComponent implements OnInit {
    @Input() listItem: ITask;
    @Output() listItemClick = new EventEmitter<IItemData>();
    taskData: ITaskData = {
        taskId: "",
        title: "",
        date: "",
        time: "",
        description: "",
        address: "",
        assignedNames: [],
        userAssigned: false
    };
    colors = ["#201360", "#1E5763", "#49FFA9", "#2E4863", "#343663", "#443863"];

    constructor(private _utilityService: UtilityService) {
    }

    private generateTaskItemData(): void {
        const currentUser: IStoredUser = this._utilityService.getStoredUser();
        if (this.listItem) {
            this.taskData.taskId = this.listItem._id;
            this.taskData.title = `${this.listItem.customer.firstName} ${this.listItem.customer.lastName}`;
            this.taskData.date = `${S(moment(this.listItem.startDate).format("dddd")).capitalize()} ${moment(this.listItem.startDate).format("d")}. ${moment(this.listItem.startDate).format("MMMM")}`;
            this.taskData.time = `${moment(this.listItem.startDate).format("HH:mm")} - ${moment(this.listItem.endDate).format("HH:mm")}`;
            this.taskData.description = this.listItem.description;
            this.taskData.address = `${this.listItem.address.street}, ${this.listItem.address.zipCode} ${this.listItem.address.city}`;
            this.listItem.employeesAssigned.forEach((emp: IEmployee) => {
                if (emp._id === currentUser._id) {
                    this.taskData.userAssigned = true;
                }
                this.taskData.assignedNames.push(`${emp.firstName} ${emp.lastName}`);
            });
        }
    }

    showInfo(): void {
        this.listItemClick.next({taskItem: this.listItem, taskData: this.taskData});
    }

    ngOnInit() {
        this.generateTaskItemData();
    }
}
