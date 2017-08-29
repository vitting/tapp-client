import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {CanActiveAuthAdmin} from "../../../services/auth-guard-admin.service";
import {TasksAdminComponent} from "./tasks-admin.component";
import {TaskCreateComponent} from "./pages/task-create/task-create.component";
import {TaskDeleteComponent} from "./pages/task-delete/task-delete.component";
import {TaskUpdateComponent} from "./pages/task-update/task-update.component";

const routes: Routes = [
    {
        path: "admin/tasks",
        component: TasksAdminComponent,
        canActivate: [CanActiveAuthAdmin],
        children: [
            {
                path: "create",
                component: TaskCreateComponent,
                canActivate: [CanActiveAuthAdmin]
            },
            {
                path: "delete",
                component: TaskDeleteComponent,
                canActivate: [CanActiveAuthAdmin]
            },
            {
                path: "update",
                component: TaskUpdateComponent,
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
export class TasksAdminRoutingModule {
}
