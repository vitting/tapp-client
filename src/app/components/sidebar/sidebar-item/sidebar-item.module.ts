import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {SidebarItemComponent} from "./sidebar-item.component";

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        SidebarItemComponent
    ],
    declarations: [
        SidebarItemComponent
    ],
    providers: [],
})
export class SidebarItemModule {
}
