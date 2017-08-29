import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {SettingsComponent} from "./settings.component";
import {CanActiveAuth} from "../../services/auth-guard.service";
import {LogoutComponent} from "../logout/logout.component";
import {ProfileComponent} from "../profile/profile.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";

const routes: Routes = [
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [CanActiveAuth],
        children: [
            {
                path: "",
                component: ProfileComponent,
                canActivate: [CanActiveAuth]
            },
            {
                path: "logout",
                component: LogoutComponent,
                canActivate: [CanActiveAuth]
            },
            {
                path: "profile",
                component: ProfileComponent,
                canActivate: [CanActiveAuth]
            },
            {
                path: "changepassword",
                component: ChangePasswordComponent,
                canActivate: [CanActiveAuth]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {
}

