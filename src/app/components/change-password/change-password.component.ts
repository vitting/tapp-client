import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ErrorMessagesService} from "../../services/error-messages.service";
import {AuthentationService} from "../../services/authentication.service";
import {IAuthentication} from "../../../misc/interfaces";
import {FlashMessageService} from "../flash-message/flash-message.service";

@Component({
    template: `
        <div class="row">
            <div class="col-lg-5 col-md-8">
                <h4 class="d-flex justify-content-center component-title">Skift dit kodeord</h4>
                <div>
                    <form [formGroup]="changePasswordForm" (ngSubmit)="submit()" novalidate>
                        <div class="form-group">
                            <label for="newPassword" class="required">Nyt kodeord</label>
                            <input id="newPassword" name="newPassword" type="password" class="form-control"
                                   formControlName="newPassword" [(ngModel)]="newPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="newPasswordRepeat" class="required">Gentag nyt kodeord</label>
                            <input id="newPasswordRepeat" name="newPasswordRepeat" type="password" class="form-control"
                                   formControlName="newPasswordRepeat" [appPasswordEqual]="newPassword" required>
                        </div>
                        <button type="submit" class="btn-round"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
        </div>
    `
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    newPassword: string = "";

    constructor(private _authService: AuthentationService,
                private _formBuilder: FormBuilder,
                private _router: Router,
                private _flashMessageService: FlashMessageService,
                private _errorMessageService: ErrorMessagesService) {
    }

    private initForm() {
        this.changePasswordForm = this._formBuilder.group({
            "newPassword": [
                "",
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])
            ],
            "newPasswordRepeat": [
                "",
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])
            ]
        });
    }

    private showErrorMessages() {
        const errorMessages = this._errorMessageService.getErrorMessages(this.changePasswordForm);
        this._flashMessageService.showFlashMessage({
            data: errorMessages
        });
    }

    ngOnInit() {
        this.initForm();
    }

    submit() {
        if (this.changePasswordForm.valid) {
            this._authService.changePassword(this.newPassword).subscribe((res: IAuthentication) => {
                if (res.success) {
                    this._flashMessageService.showFlashMessage({
                        data: "Dit kodeord er blevet ændret. Du bliver nu logget ud og skal logge ind med dit nye kodeord"
                    });

                    this._authService.logout().subscribe(() => {
                        setTimeout(() => {
                            this._router.navigate(["/login"]);
                        }, 3000);
                    });
                }
            }, (err) => {
                console.log(err);
            });
        } else {
            this.showErrorMessages();
        }
    }
}
