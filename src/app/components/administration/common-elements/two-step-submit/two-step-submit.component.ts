import {Component, EventEmitter, Output} from "@angular/core";

@Component({
    selector: "app-two-step-submit",
    template: `
        <div class="d-flex justify-content-between">
            <button type="button" class="btn-round" (click)="preAccept()"><i class="fa fa-trash-o"
                                                                             aria-hidden="true"></i></button>
            <span *ngIf="showAcceptButton" class="ml-3 mr-3">er du sikker?</span>
            <button *ngIf="showAcceptButton" type="button" class="btn-round" (click)="postAccept()"><i
                class="fa fa-check" aria-hidden="true"></i></button>
        </div>
    `
})
export class TwoStepSubmitComponent {
    @Output() accept: EventEmitter<void> = new EventEmitter<void>();
    showAcceptButton: boolean = false;

    constructor() {
    }

    preAccept() {
        this.showAcceptButton = !this.showAcceptButton;
    }

    postAccept() {
        this.accept.next();
        this.showAcceptButton = false;
    }
}
