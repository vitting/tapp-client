import {NgModule} from "@angular/core";

import {CudTitleComponent} from "./cud-title.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [CudTitleComponent],
    declarations: [CudTitleComponent],
    providers: [],
})
export class CudTitleModule {
}
