import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthentationService, RefreshTokenAction} from "../../services/authentication.service";
import {FlashMessageService} from "../flash-message/flash-message.service";
import {ErrorMessagesService} from "../../services/error-messages.service";
import {IAuthentication} from "../../../misc/interfaces";
import {SidebarService} from "../sidebar/sidebar.service";

@Component({
    styles: [".login-container {height: 50vh;}"],
    template: `
        <div class="row d-flex justify-content-center align-items-center login-container">
            <div class="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                <h4 class="d-flex justify-content-center component-title">Log ind</h4>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
                    <div class="form-group">
                        <label for="username" class="required">Brugernavn</label>
                        <input id="username" name="username" type="text" class="form-control" formControlName="username"
                               required>
                    </div>
                    <div class="form-group">
                        <label for="password" class="required">Kodeord</label>
                        <input id="password" name="password" type="password" class="form-control"
                               formControlName="password" required>
                    </div>
                    <div>
                        <button type="submit" class="btn-round"><i class="fa fa-check" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username: FormControl;
    password: FormControl;
    show: boolean = false;

    constructor(private _router: Router,
                private _formBuilder: FormBuilder,
                private _authService: AuthentationService,
                private _flashMessageService: FlashMessageService,
                private _errorMessageService: ErrorMessagesService,
                private _sidebarService: SidebarService) {
    }

    private initForm() {
        this.username = new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ]));
        this.password = new FormControl("", Validators.required);
        this.loginForm = this._formBuilder.group({
            username: this.username,
            password: this.password
        });
    }

    private showErrorMessages() {
        const errorMessages = this._errorMessageService.getErrorMessages(this.loginForm);
        this._flashMessageService.showFlashMessage({
            data: errorMessages
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this._authService.login(this.loginForm.value).subscribe((auth: IAuthentication) => {
                if (auth.success) {
                    this._sidebarService.setTitle(auth.data);
                    this._authService.storeUserAuthData(auth.token);
                    this._authService.refreshToken(RefreshTokenAction.start);

                    setTimeout(() => {
                        this._authService.setUserAsLoggedin();
                        this._router.navigate(["/home"]);
                    }, 1000);
                } else {
                    this._flashMessageService
                        .showFlashMessage({
                            data: "Det indtastede brugernavn eller kodeord er ikke korrekt. Prøv igen.",
                            timeout: 3000
                        });
                }
            }, (err: any) => {
                console.log(err);
            });
        } else {
            this.showErrorMessages();
        }
    }

    ngOnInit() {
        if (this._authService.isAuthenticated()) {
            this._router.navigate(["/home"]);
        }

        this.initForm();
    }
}
