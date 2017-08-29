import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {CUDAction} from "../cud-actions/cud-actions.component";

@Component({
    selector: "app-cud-title",
    template: `
        <h4 *ngIf="title !== ''" class="mt-2 mb-3">{{title}}</h4>
    `
})
export class CudTitleComponent implements OnInit, OnChanges {
    @Input() cudAction: CUDAction;
    title: string = "";
    constructor() { }

    private setTitle(cudAction: CUDAction) {
        if (cudAction === CUDAction.none) {
            this.title = "";
        } else if (cudAction === CUDAction.create) {
            this.title = "Opret ny";
        } else if (cudAction === CUDAction.update) {
            this.title = "Opdater";
        } else if (cudAction === CUDAction.delete) {
            this.title = "Slet";
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["cudAction"]) {
            this.setTitle(changes["cudAction"].currentValue);
        }
    }

    ngOnInit() {
    }
}

