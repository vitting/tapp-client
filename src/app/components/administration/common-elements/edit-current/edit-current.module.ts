import { NgModule } from "@angular/core";

import { EditCurrentComponent } from "./edit-current.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [EditCurrentComponent],
    declarations: [EditCurrentComponent],
    providers: [],
})
export class EditCurrentModule { }
