import {Component, OnInit} from "@angular/core";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";
import {AdministratorService} from "../../../../../services/administrator.service";
import {ICustomer, IResponseValue} from "../../../../../../misc/interfaces";

@Component({
    template: `
        <app-edit-current (choosenUser)="choosenCustomer($event)" [currentUsers]="customers"
                          [label]="'Vælg kunde'"></app-edit-current>
        <app-cust-form [customer]="customerChoosen" [showRequired]="true"
                       (formSubmit)="formSubmit($event)"></app-cust-form>
    `
})
export class CustUpdateComponent implements OnInit {
    customers: ICustomer[] = [];
    customerChoosen: ICustomer = null;

    constructor(private _adminService: AdministratorService,
                private _flashMessageService: FlashMessageService) {
    }

    private getCustomers() {
        this._adminService.getAllCustomers().subscribe((res: IResponseValue<ICustomer[]>) => {
            if (res.success) {
                this.customers = res.data;
            }
        });
    }

    formSubmit(customer: ICustomer) {
        this._adminService.updateCustomer(this.customerChoosen._id, customer).subscribe((res: IResponseValue<ICustomer>) => {
            if (res.success) {
                const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet opdateret";
                this._flashMessageService.showFlashMessage({
                    timeout: 2000,
                    data: name
                });

                this.customerChoosen = null;
                this.getCustomers();
            }
        });
    }

    choosenCustomer(customer: ICustomer) {
        this.customerChoosen = customer;
    }

    ngOnInit() {
        this.getCustomers();
    }
}
