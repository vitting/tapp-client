import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {CanActiveAuthAdmin} from "../../../services/auth-guard-admin.service";
import {CustomersAdminComponent} from "./customers-admin.component";
import {CustCreateComponent} from "./pages/cust-create/cust-create.component";
import {CustDeleteComponent} from "./pages/cust-delete/cust-delete.component";
import {CustUpdateComponent} from "./pages/cust-update/cust-update.component";

const routes: Routes = [
    {
        path: "admin/customers",
        component: CustomersAdminComponent,
        canActivate: [CanActiveAuthAdmin],
        children: [
            {
                path: "create",
                component: CustCreateComponent,
                canActivate: [CanActiveAuthAdmin]
            },
            {
                path: "delete",
                component: CustDeleteComponent,
                canActivate: [CanActiveAuthAdmin]
            },
            {
                path: "update",
                component: CustUpdateComponent,
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
export class CustomersAdminRoutingModule {
}
