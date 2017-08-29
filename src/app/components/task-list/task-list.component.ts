import {Component, EventEmitter, Input, Output} from "@angular/core";

import {IItemData, ITask, ITaskAction, ITaskData} from "../../../misc/interfaces";

class TaskAction implements ITaskAction {
    accepted: boolean;
    taskId: string;

    constructor(accepted: boolean, taskId: string) {
        this.accepted = accepted;
        this.taskId = taskId;
    }
}

@Component({
    selector: "app-task-list",
    template: `
        <div class="list-group">
            <app-task-list-item *ngFor="let i of taskListItems; trackBy: i?._id" [listItem]="i"
                                (listItemClick)="showDescription($event)"></app-task-list-item>
        </div>
        <app-task-description-modal [taskData]="taskData" (closeClick)="ejectedTask($event)"
                                    (saveClick)="acceptedTask($event)"
                                    [showSaveBtn]="!taskData?.userAssigned"
                                    [modalName]="modalName"></app-task-description-modal>
    `
})
export class TaskListComponent {
    @Input() taskListItems: ITask[] = [];
    @Output() taskAction: EventEmitter<ITaskAction> = new EventEmitter<ITaskAction>();
    taskItem: ITask;
    taskData: ITaskData = {
        taskId: "",
        title: "",
        date: "",
        time: "",
        description: "",
        address: "",
        assignedNames: [],
        userAssigned: false
    };
    modalName: string = "taskDescriptionModal";

    constructor() {
    }

    showDescription(itemData: IItemData) {
        this.taskItem = itemData.taskItem;
        this.taskData = itemData.taskData;
        $("#" + this.modalName).modal({
            "show": true,
            "keyboard": true,
            "backdrop": "static"
        }).on("hide.bs.modal", () => {
            this.ejectedTask(itemData.taskData.taskId);
        });
    }

    acceptedTask(taskId: string) {
        this.taskAction.next(new TaskAction(true, taskId));
    }

    ejectedTask(taskId: string) {
        this.taskAction.next(new TaskAction(false, taskId));
    }
}
