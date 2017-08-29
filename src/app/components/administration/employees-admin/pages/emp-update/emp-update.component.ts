import {Component, OnInit} from "@angular/core";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";
import {AdministratorService} from "../../../../../services/administrator.service";
import {IEmployee, IResponseValue} from "../../../../../../misc/interfaces";

@Component({
    template: `
        <app-edit-current (choosenUser)="choosenEmployee($event)" [currentUsers]="employees"
                          [label]="'Vælg medarbejder'"></app-edit-current>
        <app-emp-form [employee]="employeeChoosen" [showPasswordInClearText]="true"
                      [showRequired]="true" [generateAPassword]="false" [showPasswordInput]="false"
                      [showGeneratePassword]="true" (formSubmit)="formSubmit($event)"></app-emp-form>
    `
})
export class EmpUpdateComponent implements OnInit {
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

    formSubmit(employee: IEmployee) {
        this._adminService.updateEmployee(this.employeeChoosen._id, employee).subscribe((res: IResponseValue<IEmployee>) => {
            if (res.success) {
                const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet opdateret";
                this._flashMessageService.showFlashMessage({
                    timeout: 2000,
                    data: name
                });

                this.employeeChoosen = null;
                this.getEmployees();
            }
        });
    }

    choosenEmployee(employee: IEmployee) {
        this.employeeChoosen = employee;
    }

    ngOnInit() {
        this.getEmployees();
    }
}
