import { NgModule } from "@angular/core";

import { TasksAdminComponent } from "./tasks-admin.component";
import {TasksAdminRoutingModule} from "./tasks-admin-routing.module";
import {RouterModule} from "@angular/router";
import {EditCurrentModule} from "../common-elements/edit-current/edit-current.module";
import {CudActionsModule} from "../common-elements/cud-actions/cud-actions.module";
import {AdministratorService} from "../../../services/administrator.service";
import {TaskCreateModule} from "./pages/task-create/task-create.module";
import {TaskUpdateModule} from "./pages/task-update/task-update.module";
import {TaskDeleteModule} from "./pages/task-delete/task-delete.module";

@NgModule({
    imports: [
        RouterModule,
        TasksAdminRoutingModule,
        CudActionsModule,
        EditCurrentModule,
        TaskCreateModule,
        TaskUpdateModule,
        TaskDeleteModule
    ],
    exports: [],
    declarations: [TasksAdminComponent],
    providers: [AdministratorService],
})
export class TasksAdminModule { }
