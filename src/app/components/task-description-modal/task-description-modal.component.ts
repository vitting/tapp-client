import {Component, EventEmitter, Input, Output} from "@angular/core";

import {ITaskData} from "../../../misc/interfaces";

@Component({
    selector: "app-task-description-modal",
    templateUrl: "./task-description-modal.component.html"
})
export class TaskDescriptionModalComponent {
    @Input() taskData: ITaskData = null;
    @Input() modalName: string = "descmodal";
    @Input() showCloseBtn: boolean = true;
    @Input() showSaveBtn: boolean = true;
    @Output() saveClick = new EventEmitter<string>();
    @Output() closeClick = new EventEmitter<string>();

    constructor() {
    }

    private close() {
        $("#" + this.modalName).modal("hide");
    }

    saveModal(taskId: string) {
        this.close();
        this.saveClick.next(taskId);
    }

    closeModal(taskId: string) {
        this.close();
        this.closeClick.next(taskId);
    }
}
