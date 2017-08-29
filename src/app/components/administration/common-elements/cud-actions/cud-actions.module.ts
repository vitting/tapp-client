import { NgModule } from "@angular/core";

import { CudActionsComponent } from "./cud-actions.component";
import {CudTitleModule} from "../cud-title/cud-title.module";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [CudTitleModule, RouterModule],
    exports: [CudActionsComponent],
    declarations: [CudActionsComponent],
    providers: [],
})
export class CudActionsModule { }
