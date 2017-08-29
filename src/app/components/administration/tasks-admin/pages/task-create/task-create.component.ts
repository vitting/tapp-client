import {Component} from "@angular/core";
import {IResponseValue, ITask} from "../../../../../../misc/interfaces";
import {AdministratorService} from "../../../../../services/administrator.service";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";

@Component({
    template: `
        <app-task-form [showRequired]="true" (formSubmit)="formSubmit($event)"></app-task-form>
    `
})
export class TaskCreateComponent {
    constructor(private _adminService: AdministratorService,
                private _flashMessageService: FlashMessageService) {
    }

    formSubmit(task: ITask) {
        // this._adminService.createTask(task).subscribe((res: IResponseValue<ITask>) => {
        //     if (res.success) {
        //         const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet oprettet";
        //         this._flashMessageService.showFlashMessage({
        //             timeout: 2000,
        //             data: name
        //         });
        //     }
        // });
    }
}
