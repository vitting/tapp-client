import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import {AuthentationService} from "./authentication.service";

@Injectable()
export class CanActiveAuth implements CanActivate {

    constructor(private auth: AuthentationService,
                private router: Router) {
    }

    canActivate() {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
