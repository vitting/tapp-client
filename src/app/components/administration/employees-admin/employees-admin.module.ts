import {NgModule} from "@angular/core";

import {EmployeesAdminComponent} from "./employees-admin.component";
import {EmployeesAdminRoutingModule} from "./employees-admin-routing.module";
import {AdministratorService} from "../../../services/administrator.service";
import {EmpCreateModule} from "./pages/emp-create/emp-create.module";
import {EmpDeleteModule} from "./pages/emp-delete/emp-delete.module";
import {EmpUpdateModule} from "./pages/emp-update/emp-update.module";
import {CudActionsModule} from "../common-elements/cud-actions/cud-actions.module";
import {RouterModule} from "@angular/router";
import {EditCurrentModule} from "../common-elements/edit-current/edit-current.module";

@NgModule({
    imports: [
        RouterModule,
        EmployeesAdminRoutingModule,
        EmpCreateModule,
        EmpDeleteModule,
        EmpUpdateModule,
        CudActionsModule,
        EditCurrentModule
    ],
    exports: [],
    declarations: [EmployeesAdminComponent],
    providers: [AdministratorService],
})
export class EmployeesAdminModule {
}
