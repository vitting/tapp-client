import {NgModule} from "@angular/core";

import {EmpCreateComponent} from "./emp-create.component";
import {EmpFormModule} from "../../elements/emp-form/emp-form.module";

@NgModule({
    imports: [EmpFormModule],
    exports: [],
    declarations: [EmpCreateComponent],
    providers: [],
})
export class EmpCreateModule {
}
