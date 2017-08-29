import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import {AuthentationService} from "./authentication.service";

@Injectable()
export class CanActiveAuthAdmin implements CanActivate {

    constructor(private _auth: AuthentationService,
                private _router: Router) {
    }

    canActivate() {
        if (this._auth.isAuthenticated() && this._auth.isAdmin()) {
            return true;
        } else {
            this._router.navigate(["/login"]);
            return false;
        }
    }
}
