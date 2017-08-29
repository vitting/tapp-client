import {Component} from "@angular/core";
import {CUDAction} from "../common-elements/cud-actions/cud-actions.component";
import {Router} from "@angular/router";

@Component({
    template: `
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <app-cud-actions (choosenAction)="cudAction($event)"></app-cud-actions>
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class TasksAdminComponent {
    constructor(private _router: Router) {
    }

    cudAction(action: CUDAction) {
        if (action === CUDAction.create) {
            this._router.navigate(["/admin/tasks/create"]);
        } else if (action === CUDAction.update) {
            this._router.navigate(["/admin/tasks/update"]);
        } else if (action === CUDAction.delete) {
            this._router.navigate(["/admin/tasks/delete"]);
        }
    }
}
