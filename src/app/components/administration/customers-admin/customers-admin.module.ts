import { NgModule } from "@angular/core";

import { CustomersAdminComponent } from "./customers-admin.component";
import {CustomersAdminRoutingModule} from "./customers-admin-routing.module";
import {RouterModule} from "@angular/router";
import {EditCurrentModule} from "../common-elements/edit-current/edit-current.module";
import {CudActionsModule} from "../common-elements/cud-actions/cud-actions.module";
import {CustCreateModule} from "./pages/cust-create/cust-create.module";
import {CustUpdateModule} from "./pages/cust-update/cust-update.module";
import {CustDeleteModule} from "./pages/cust-delete/cust-delete.module";
import {AdministratorService} from "../../../services/administrator.service";

@NgModule({
    imports: [
        RouterModule,
        CustomersAdminRoutingModule,
        CudActionsModule,
        EditCurrentModule,
        CustCreateModule,
        CustUpdateModule,
        CustDeleteModule
    ],
    exports: [],
    declarations: [CustomersAdminComponent],
    providers: [AdministratorService],
})
export class CustomersAdminModule { }
