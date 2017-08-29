import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SidebarComponent } from "./sidebar.component";
import { SidebarItemModule } from "./sidebar-item/sidebar-item.module";
import {SidebarService} from "./sidebar.service";

@NgModule({
    imports: [RouterModule, SidebarItemModule],
    exports: [SidebarComponent, SidebarItemModule],
    declarations: [SidebarComponent],
    providers: [SidebarService],
})
export class SidebarModule { }
