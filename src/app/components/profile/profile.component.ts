import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import {ErrorMessagesService} from "../../services/error-messages.service";
import {FlashMessageService} from "../flash-message/flash-message.service";
import {AuthentationService} from "../../services/authentication.service";
import {ProfileService} from "../../services/profile.service";
import {IDawaAddress, IEmployee, IResponseValue} from "../../../misc/interfaces";
import {DawaService} from "../../services/dawa.service";

@Component({
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    username: FormControl;
    firstName: FormControl;
    lastName: FormControl;
    street: FormControl;
    zipCode: FormControl;
    city: FormControl;
    mail: FormControl;
    mobilePhone: FormControl;
    streetLoading: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _flashMessageService: FlashMessageService,
                private _errorMessageService: ErrorMessagesService,
                private _authService: AuthentationService,
                private _profileService: ProfileService,
                private _dawaService: DawaService) {
    }

    private showErrorMessages() {
        const errorMessages = this._errorMessageService.getErrorMessages(this.profileForm);
        this._flashMessageService.showFlashMessage({
            data: errorMessages
        });
    }

    private initForm() {
        this.username = new FormControl({value: "", disabled: true});
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

        this.profileForm = this._formBuilder.group({
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

    private setFormAddressValues(street: string, zipCode: number, city: string) {
        this.street.setValue(street);
        this.zipCode.setValue(zipCode);
        this.city.setValue(city);
    }

    private setFormValues(emp: IEmployee) {
        this.username.setValue(emp.username);
        this.firstName.setValue(emp.firstName);
        this.lastName.setValue(emp.lastName);
        this.setFormAddressValues(emp.address.street, emp.address.zipCode, emp.address.city);
        this.mail.setValue(emp.mail);
        this.mobilePhone.setValue(emp.mobilePhone);
    }

    private getProfile() {
        const id = this._authService.getUserId();
        this._profileService.getProfile(id).subscribe((emp: IResponseValue<IEmployee>) => {
            if (emp.success) {
                this.setFormValues(emp.data);
            }
        }, (err) => {
            console.log(err);
        });
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

    streetSelected(selected: NgbTypeaheadSelectItemEvent) {
        selected.preventDefault();
        const addr = this._dawaService.formatDawaAddress(selected.item);
        this.setFormAddressValues(addr, selected.item.data.postnr, selected.item.data.postnrnavn);
    }

    submit() {
        if (this.profileForm.valid) {
            const id = this._authService.getUserId();
            this._profileService.updateProfile(id, this.profileForm.value).subscribe((resValue: IResponseValue<null>) => {
                this._authService.refreshTokenAndSetValues();
            }, (err) => {
                console.log(err);
            });
        } else {
            this.showErrorMessages();
        }
    }

    ngOnInit() {
        this.initForm();
        this.getProfile();
    }
}
