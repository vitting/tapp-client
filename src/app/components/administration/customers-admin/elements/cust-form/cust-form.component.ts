import * as $ from "jquery";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICustomer, IDawaAddress} from "../../../../../../misc/interfaces";
import {DawaService} from "../../../../../services/dawa.service";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {ErrorMessagesService} from "../../../../../services/error-messages.service";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-cust-form",
    templateUrl: "./cust-form.component.html"
})
export class CustFormComponent implements OnChanges, OnInit {
    @Output() formSubmit: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
    @Input() showRequired: boolean = false;
    @Input() resetFormAfterSubmit: boolean = true;
    @Input() disableForm: boolean = false;
    @Input() customer: ICustomer = null;
    @Input() showDeleteButton: boolean = false;
    customersForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    street: FormControl;
    zipCode: FormControl;
    city: FormControl;
    mail: FormControl;
    mobilePhone: FormControl;
    streetLoading: boolean = false;

    constructor(private _errorMessageService: ErrorMessagesService,
                private _flashMessageService: FlashMessageService,
                private _dawaService: DawaService,
                private _formBuilder: FormBuilder) {
        this.initForm();
    }

    search = (text$: Observable<string>) => {
        return text$.debounceTime(300)
            .distinctUntilChanged()
            .do(() => {
                this.streetLoading = true;
            })
            .switchMap((term) => {
                if (term.length < 3) {
                    this.streetLoading = false;
                    return [];
                } else {
                    return this._dawaService.dawaAddressLookup(term)
                        .do(() => {
                            this.streetLoading = false;
                        })
                        .catch(() => {
                            return Observable.of([]);
                        });
                }
            })
            .do(() => {
                this.streetLoading = false;
            });
    }

    formatter = (address: IDawaAddress) => {
        if (address && typeof address === "string") {
            return address;
        } else {
            return this._dawaService.formatDawaAddress(address);
        }
    }

    private initForm() {
        this.firstName = new FormControl("", Validators.required);
        this.lastName = new FormControl("", Validators.required);
        this.street = new FormControl("", Validators.required);
        this.zipCode = new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[0-9]*"),
            Validators.minLength(4),
            Validators.maxLength(4)
        ]));
        this.city = new FormControl("", Validators.required);
        this.mail = new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"),
            Validators.minLength(6)
        ]));

        this.mobilePhone = new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[0-9]*"),
            Validators.minLength(8),
            Validators.maxLength(8)
        ]));

        this.customersForm = this._formBuilder.group({
            "firstName": this.firstName,
            "lastName": this.lastName,
            "address": this._formBuilder.group({
                "street": this.street,
                "zipCode": this.zipCode,
                "city": this.city
            }),
            "mail": this.mail,
            "mobilePhone": this.mobilePhone
        });
    }

    private setFormValues(cust: ICustomer) {
        this.firstName.setValue(cust.firstName);
        this.lastName.setValue(cust.lastName);
        this.street.setValue(cust.address.street);
        this.zipCode.setValue(cust.address.zipCode);
        this.city.setValue(cust.address.city);
        this.mail.setValue(cust.mail);
        this.mobilePhone.setValue(cust.mobilePhone);
    }

    private setFormAddressValues(street: string, zipCode: number, city: string) {
        this.street.setValue(street);
        this.zipCode.setValue(zipCode);
        this.city.setValue(city);
    }

    private showErrorMessages() {
        const errorMessages = this._errorMessageService.getErrorMessages(this.customersForm);
        this._flashMessageService.showFlashMessage({
            data: errorMessages
        });
    }

    private resetForm() {
        if (this.resetFormAfterSubmit) {
            this.customersForm.reset();
        }

        $("#firstName").focus();
    }

    private disableFieldsInForm(disable: boolean) {
        if (disable) {
            this.customersForm.disable();
        } else {
            this.customersForm.enable();
        }
    };

    streetSelected(selected: NgbTypeaheadSelectItemEvent) {
        selected.preventDefault();
        const addr = this._dawaService.formatDawaAddress(selected.item);
        this.setFormAddressValues(addr, selected.item.data.postnr, selected.item.data.postnrnavn);
    }

    submitForm() {
        if (this.showDeleteButton) {
            this.formSubmit.next(this.customer);
            this.resetForm();
        } else {
            if (this.customersForm.valid) {
                this.formSubmit.next(this.customersForm.value);
                this.resetForm();
            } else {
                this.showErrorMessages();
            }
        }
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["customer"] && changes["customer"].currentValue) {
            this.setFormValues(changes["customer"].currentValue);
        }

        if (changes["disableForm"]) {
            this.disableFieldsInForm(changes["disableForm"].currentValue);
        }
    }
}
