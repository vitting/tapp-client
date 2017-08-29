import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Router} from "@angular/router";

export enum CUDAction {
    none = 0,
    create = 1,
    update = 2,
    delete = 3
}

@Component({
    selector: "app-cud-actions",
    template: `
        <div class="d-flex justify-content-center">
            <button type="button" class="btn-round mr-3" (click)="clickAction(cudAction.create)" title="Opret"><i
                class="fa fa-plus" aria-hidden="true"></i></button>
            <button type="button" class="btn-round mr-3" (click)="clickAction(cudAction.update)" title="Rediger"><i
                class="fa fa-pencil" aria-hidden="true"></i></button>
            <button type="button" class="btn-round" (click)="clickAction(cudAction.delete)" title="Slet"><i
                class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        <app-cud-title [cudAction]="currentAction"></app-cud-title>
    `
})
export class CudActionsComponent implements OnInit {
    @Output() choosenAction: EventEmitter<CUDAction> = new EventEmitter<CUDAction>();
    cudAction = CUDAction;
    currentAction: CUDAction = CUDAction.none;
    constructor(private _router: Router) { }

    clickAction(action: CUDAction) {
        this.currentAction = action;
        this.choosenAction.next(action);
    }

    ngOnInit() {
        const url: string = this._router.url.toLowerCase();
        if (url.indexOf("create") !== -1) {
            this.clickAction(CUDAction.create);
        } else if (url.indexOf("update") !== -1) {
            this.clickAction(CUDAction.update);
        } else if (url.indexOf("delete") !== -1) {
            this.clickAction(CUDAction.delete);
        }
    }

}
