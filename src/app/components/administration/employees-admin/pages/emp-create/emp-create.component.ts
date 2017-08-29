import { Component, OnInit } from "@angular/core";
import {IEmployee, IResponseValue} from "../../../../../../misc/interfaces";
import {AdministratorService} from "../../../../../services/administrator.service";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";

@Component({
    template: `
        <app-emp-form [showRequired]="true" [generateAPassword]="true" [showPasswordInput]="true" [showGeneratePassword]="false" (formSubmit)="formSubmit($event)"></app-emp-form>
    `
})
export class EmpCreateComponent implements OnInit {
    constructor(
        private _adminService: AdministratorService,
        private _flashMessageService: FlashMessageService
    ) { }

    formSubmit(employee: IEmployee) {
        this._adminService.createEmployee(employee).subscribe((res: IResponseValue<IEmployee>) => {
            if (res.success) {
                const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet oprettet";
                this._flashMessageService.showFlashMessage({
                    timeout: 2000,
                    data: name
                });
            }
        });
    }

    ngOnInit() { }

}
