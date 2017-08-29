import { NgModule } from "@angular/core";

import { SettingsComponent } from "./settings.component";
import {SettingsRoutingModule} from "./settings-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [SettingsRoutingModule, RouterModule],
    exports: [],
    declarations: [SettingsComponent],
    providers: [],
})
export class SettingsModule { }
