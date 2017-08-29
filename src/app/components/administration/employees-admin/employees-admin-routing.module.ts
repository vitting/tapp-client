import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {EmployeesAdminComponent} from "./employees-admin.component";
import {CanActiveAuthAdmin} from "../../../services/auth-guard-admin.service";
import {EmpCreateComponent} from "./pages/emp-create/emp-create.component";
import {EmpDeleteComponent} from "./pages/emp-delete/emp-delete.component";
import {EmpUpdateComponent} from "./pages/emp-update/emp-update.component";

const routes: Routes = [
    {
        path: "admin/employees",
        component: EmployeesAdminComponent,
        canActivate: [CanActiveAuthAdmin],
        children: [
            {
                path: "create",
                component: EmpCreateComponent,
                canActivate: [CanActiveAuthAdmin]
            },
            {
                path: "delete",
                component: EmpDeleteComponent,
                canActivate: [CanActiveAuthAdmin]
            },
            {
                path: "update",
                component: EmpUpdateComponent,
                canActivate: [CanActiveAuthAdmin]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanActiveAuthAdmin]
})
export class EmployeesAdminRoutingModule {
}
