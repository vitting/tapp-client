import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "app-edit-current",
    template: `
        <div class="form-group">
            <div ngbDropdown class="d-inline-block">
                <button class="btn btn-secondary" id="currentUser" ngbDropdownToggle>{{label}}</button>
                <div class="dropdown-menu" aria-labelledby="currentUser">
                    <button *ngFor="let user of currentUsers" class="dropdown-item" (click)="userChoosen(user)">
                        {{user?.firstName + " " + user?.lastName}}
                    </button>
                </div>
            </div>
        </div>
    `
})
export class EditCurrentComponent {
    @Input() label: string = "";
    @Input() currentUsers: any[] = [];
    @Output() choosenUser: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    userChoosen(user) {
        this.choosenUser.next(user);
    }
}
