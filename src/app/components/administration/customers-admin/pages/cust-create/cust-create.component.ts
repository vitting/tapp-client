import {Component, OnInit} from "@angular/core";
import {ICustomer, IResponseValue} from "../../../../../../misc/interfaces";
import {AdministratorService} from "../../../../../services/administrator.service";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";

@Component({
    template: `
        <app-cust-form [showRequired]="true" (formSubmit)="formSubmit($event)"></app-cust-form>
    `
})
export class CustCreateComponent implements OnInit {
    constructor(private _adminService: AdministratorService,
                private _flashMessageService: FlashMessageService) {
    }

    formSubmit(customer: ICustomer) {
        this._adminService.createCustomer(customer).subscribe((res: IResponseValue<ICustomer>) => {
            if (res.success) {
                const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet oprettet";
                this._flashMessageService.showFlashMessage({
                    timeout: 2000,
                    data: name
                });
            }
        });
    }

    ngOnInit() {
    }

}
