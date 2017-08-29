import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {NavbarComponent} from "./navbar.component";

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [NavbarComponent],
    declarations: [NavbarComponent],
    providers: [],
})
export class NavbarModule {
}
