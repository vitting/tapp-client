import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AuthentationService} from "../../services/authentication.service";

@Component({
    template: `
        <div class="row">
            <div class="col-md-12">
                <h4 class="d-flex justify-content-center component-title">Log ud</h4>
                <div class="d-flex justify-content-center mt-2 mb-2">Tryk for at logge ud</div>
                <div class="d-flex justify-content-center">
                    <button type="button" (click)="logout()" class="btn-round"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    `
})
export class LogoutComponent implements OnInit {
    constructor(private _router: Router,
                private _authService: AuthentationService) {
    }

    logout() {
        this._authService.logout().subscribe(() => {
            setTimeout(() => {
                this._authService.setUserAsLoggedin();
                this._router.navigate(["/login"]);
            }, 1000);
        }, (err) => {
            console.log(err);
        });
    }

    ngOnInit() {
    }
}
