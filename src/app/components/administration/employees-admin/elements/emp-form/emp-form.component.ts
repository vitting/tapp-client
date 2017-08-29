import * as $ from "jquery";
import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output,
    SimpleChanges
} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDawaAddress, IEmployee} from "../../../../../../misc/interfaces";
import {DawaService} from "../../../../../services/dawa.service";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {ErrorMessagesService} from "../../../../../services/error-messages.service";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-emp-form",
    templateUrl: "./emp-form.component.html"
})
export class EmpFormComponent implements OnChanges, OnInit {
    @Output() formSubmit: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();
    @Input() showRequired: boolean = false;
    @Input() showGeneratePassword: boolean = true;
    @Input() showPasswordInput: boolean = true;
    @Input() showPasswordInClearText: boolean = true;
    @Input() generateAPassword: boolean = false;
    @Input() resetFormAfterSubmit: boolean = true;
    @Input() disableForm: boolean = false;
    @Input() employee: IEmployee = null;
    @Input() showDeleteButton: boolean = false;
    employeesForm: FormGroup;
    password: FormControl;
    username: FormControl;
    firstName: FormControl;
    lastName: FormControl;
    street: FormControl;
    zipCode: FormControl;
    city: FormControl;
    mail: FormControl;
    mobilePhone: FormControl;
    passwordInputType: string = "password";
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
        this.password = new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ]));
        this.username = new FormControl("", Validators.required);
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

        this.employeesForm = this._formBuilder.group({
            "password": this.password,
            "username": this.username,
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

    private setShowPasswordInput(show: boolean) {
        if (show) {
            this.password.setValidators([Validators.required, Validators.minLength(8)]);
        } else {
            this.password.clearValidators();
        }
    }

    private setPasswordInClearText(show: boolean) {
        if (show) {
            this.passwordInputType = "text";
        } else {
            this.passwordInputType = "password";
        }
    }

    private setFormValues(emp: IEmployee) {
        this.firstName.setValue(emp.firstName);
        this.lastName.setValue(emp.lastName);
        this.street.setValue(emp.address.street);
        this.zipCode.setValue(emp.address.zipCode);
        this.city.setValue(emp.address.city);
        this.mail.setValue(emp.mail);
        this.mobilePhone.setValue(emp.mobilePhone);
        this.username.setValue(emp.username);
    }

    private setFormAddressValues(street: string, zipCode: number, city: string) {
        this.street.setValue(street);
        this.zipCode.setValue(zipCode);
        this.city.setValue(city);
    }

    private showErrorMessages() {
        const errorMessages = this._errorMessageService.getErrorMessages(this.employeesForm);
        this._flashMessageService.showFlashMessage({
            data: errorMessages
        });
    }

    private resetForm() {
        if (this.resetFormAfterSubmit) {
            this.employeesForm.reset();
        }

        if (this.generateAPassword) {
            this.generatePassword();
        }

        $("#firstName").focus();
    }

    private disableFieldsInForm(disable: boolean) {
        if (disable) {
            this.employeesForm.disable();
        } else {
            this.employeesForm.enable();
        }
    };

    streetSelected(selected: NgbTypeaheadSelectItemEvent) {
        selected.preventDefault();
        const addr = this._dawaService.formatDawaAddress(selected.item);
        this.setFormAddressValues(addr, selected.item.data.postnr, selected.item.data.postnrnavn);
    }

    // TODO: Remove Standard password
    generatePassword() {
        // this.password.setValue(this._utilityService.generatePassword());
        this.password.setValue("se2fl8heste");
    }

    submitForm() {
        if (this.showDeleteButton) {
            this.formSubmit.next(this.employee);
            this.resetForm();
        } else {
            if (this.employeesForm.valid) {
                this.formSubmit.next(this.employeesForm.value);
                this.resetForm();
            } else {
                this.showErrorMessages();
            }
        }
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["showPasswordInput"]) {
            this.setShowPasswordInput(changes["showPasswordInput"].currentValue);
        }

        if (changes["showPasswordInClearText"]) {
            this.setPasswordInClearText(changes["showPasswordInClearText"].currentValue);
        }

        if (changes["employee"] && changes["employee"].currentValue) {
            this.setFormValues(changes["employee"].currentValue);
        }

        if (changes["generateAPassword"]) {
            if (changes["generateAPassword"].currentValue) {
                this.generatePassword();
            }
        }

        if (changes["disableForm"]) {
            this.disableFieldsInForm(changes["disableForm"].currentValue);
        }
    }
}
