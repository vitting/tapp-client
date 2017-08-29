import {Component, OnInit} from "@angular/core";
import {IResponseValue, ITask} from "../../../../../../misc/interfaces";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";
import {AdministratorService} from "../../../../../services/administrator.service";

@Component({
    template: `
        <app-edit-current (choosenUser)="choosenTask($event)" [currentUsers]="tasks"
                          [label]="'Vælg opgave'"></app-edit-current>
        <app-task-form [showDeleteButton]="true" [disableForm]="true" [task]="taskChoosen"
                       [showRequired]="false" (formSubmit)="formSubmit($event)"></app-task-form>
    `
})
export class TaskDeleteComponent implements OnInit {
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

    choosenTask(task: ITask) {
        this.taskChoosen = task;
    }

    formSubmit(task: ITask) {
        if (task) {
            // this._adminService.deleteTask(task._id).subscribe((res: IResponseValue<ITask>) => {
            //     if (res.success) {
            //         const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet slettet";
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
    }

    ngOnInit() {
        this.getTasks();
    }

}
