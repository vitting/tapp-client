import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./components/home/home.component";
import {CanActiveAuth} from "./services/auth-guard.service";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [CanActiveAuth]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
