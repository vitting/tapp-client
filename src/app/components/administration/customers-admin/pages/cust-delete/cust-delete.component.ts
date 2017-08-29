import {Component, OnInit} from "@angular/core";
import {ICustomer, IResponseValue} from "../../../../../../misc/interfaces";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";
import {AdministratorService} from "../../../../../services/administrator.service";

@Component({
    template: `
        <app-edit-current (choosenUser)="choosenCustomer($event)" [currentUsers]="customers"
                          [label]="'Vælg kunde'"></app-edit-current>
        <app-cust-form [showDeleteButton]="true" [disableForm]="true" [customer]="customerChoosen"
                       [showRequired]="false" (formSubmit)="formSubmit($event)"></app-cust-form>
    `
})
export class CustDeleteComponent implements OnInit {
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

    choosenCustomer(customer: ICustomer) {
        this.customerChoosen = customer;
    }

    formSubmit(customer: ICustomer) {
        if (customer) {
            this._adminService.deleteCustomer(customer._id).subscribe((res: IResponseValue<ICustomer>) => {
                if (res.success) {
                    const name: string = res.data.firstName + " " + res.data.lastName + "\nEr blevet slettet";
                    this._flashMessageService.showFlashMessage({
                        timeout: 2000,
                        data: name
                    });

                    this.customerChoosen = null;
                    this.getCustomers();
                }
            });
        }
    }

    ngOnInit() {
        this.getCustomers();
    }

}
