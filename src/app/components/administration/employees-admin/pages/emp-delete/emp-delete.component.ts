import {Component, OnInit} from "@angular/core";
import {IEmployee, IResponseValue} from "../../../../../../misc/interfaces";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";
import {AdministratorService} from "../../../../../services/administrator.service";

@Component({
    template: `
        <app-edit-current (choosenUser)="choosenEmployee($event)" [currentUsers]="employees"
                          [label]="'Vælg medarbejder'"></app-edit-current>
        <app-emp-form [showDeleteButton]="true" [disableForm]="true" [employee]="employeeChoosen"
                      [showPasswordInClearText]="true"
                      [showRequired]="false" [generateAPassword]="false" [showPasswordInput]="false"
                      [showGeneratePassword]="true" (formSubmit)="formSubmit($event)"></app-emp-form>
    `
})
export class EmpDeleteComponent implements OnInit {
    employees: IEmployee[] = [];
    employeeChoosen: IEmployee = null;

    constructor(private _adminService: AdministratorService,
                private _flashMessageService: FlashMessageService) {
    }

    private getEmployees() {
        this._adminService.getAllEmployees().subscribe((res: IResponseValue<IEmployee[]>) => {
            if (res.success) {
                this.employees = res.data;
            }
        });
    }

    choosenEmployee(employee: IEmployee) {
        this.employeeChoosen = employee;
    }

    formSubmit(employee: IEmployee) {
        if (employee) {
            this._adminService.deleteEmployee(employee._id).subscribe((res: IResponseValue<IEmployee>) => {
                if (res.success) {
                    const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet slettet";
                    this._flashMessageService.showFlashMessage({
                        timeout: 2000,
                        data: name
                    });

                    this.employeeChoosen = null;
                    this.getEmployees();
                }
            });
        }
    }

    ngOnInit() {
        this.getEmployees();
    }

}
