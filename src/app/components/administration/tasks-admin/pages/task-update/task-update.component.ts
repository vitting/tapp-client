import {Component, OnInit} from "@angular/core";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";
import {AdministratorService} from "../../../../../services/administrator.service";
import {IResponseValue, ITask} from "../../../../../../misc/interfaces";

@Component({
    template: `
        <app-edit-current (choosenUser)="choosenTask($event)" [currentUsers]="tasks"
                          [label]="'Vælg opgave'"></app-edit-current>
        <app-task-form [task]="taskChoosen" [showRequired]="true"
                       (formSubmit)="formSubmit($event)"></app-task-form>
    `
})
export class TaskUpdateComponent implements OnInit {
    tasks: ITask[] = [];
    taskChoosen: ITask = null;

    constructor(private _adminService: AdministratorService,
                private _flashMessageService: FlashMessageService) {
    }

    private getTasks() {
        // this._adminService.getAllTasks().subscribe((res: IResponseValue<ITask[]>) => {
        //     if (res.success) {
        //         this.tasks = res.data;
        //     }
        // });
    }

    formSubmit(task: ITask) {
        // this._adminService.updateTask(this.taskChoosen._id, task).subscribe((res: IResponseValue<ITask>) => {
        //     if (res.success) {
        //         const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet opdateret";
        //         this._flashMessageService.showFlashMessage({
        //             timeout: 2000,
        //             data: name
        //         });
        //
        //         this.taskChoosen = null;
        //         this.getTasks();
        //     }
        // });
    }

    choosenTask(task: ITask) {
        this.taskChoosen = task;
    }

    ngOnInit() {
        this.getTasks();
    }
}
