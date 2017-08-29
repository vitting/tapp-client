import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ChangePasswordComponent} from "./change-password.component";
import {CanActiveAuth} from "../../services/auth-guard.service";

const routes: Routes = [
    {
        path: "changepassword",
        component: ChangePasswordComponent,
        canActivate: [CanActiveAuth]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanActiveAuth]
})
export class ChangePasswordRoutingModule {
}
