import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home.component";
import {CanActiveAuth} from "../../services/auth-guard.service";

const routes: Routes = [
    {path: "home", component: HomeComponent, canActivate: [CanActiveAuth]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}
