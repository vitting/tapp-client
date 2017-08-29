import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {FlashMessageService, IFlashMessageOptions} from "./flash-message.service";

// User defined Type Guards. Typescript construction to check for instance of Interface
function isIFlashMessageOptions(arg: any): arg is IFlashMessageOptions {
    return arg.data !== undefined;
}

@Component({
    selector: "app-flash-message",
    styles: [
        ".flash-message-container {width: 90vw;margin: auto;padding: 1rem;background-color: lightgrey;}"
    ],
    template: `
        <div *ngIf="showFlashMessage">
            <div [ngClass]="cssClasses">
                <div *ngIf="showList">
                    <ul *ngIf="!insertAsHtml">
                        <li *ngFor="let i of data">{{i}}</li>
                    </ul>
                    <ul *ngIf="insertAsHtml">
                        <li *ngFor="let i of data" [innerHtml]="i"></li>
                    </ul>
                </div>
                <div *ngIf="!showList">
                    <div *ngIf="!insertAsHtml">
                        <div *ngFor="let i of data">{{i}}</div>
                    </div>
                    <div *ngIf="insertAsHtml">
                        <div *ngFor="let i of data" [innerHtml]="i"></div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FlashMessageComponent implements OnInit, OnDestroy {
    showFlashMessage: boolean = false;
    subscription: Subscription;
    data: string[];
    showList: boolean = false;
    cssClasses: string | string[];
    timeoutId: number;
    insertAsHtml: boolean = false;

    constructor(private _flashMessageService: FlashMessageService) {
    }

    ngOnInit() {
        this.subscription = this._flashMessageService.flashMessage$.subscribe((options: IFlashMessageOptions | boolean) => {
            if (typeof options === "boolean") {
                this.showFlashMessage = false;
            } else if (isIFlashMessageOptions(options)) {
                if (options.data && options.data instanceof Array) {
                    this.data = options.data;
                }

                if (options.data && typeof options.data === "string") {
                    this.data = [options.data];
                }

                if (options.insertAsHtml) {
                    this.insertAsHtml = options.insertAsHtml;
                } else {
                    this.insertAsHtml = false;
                }

                if (options.asList) {
                    this.showList = options.asList;
                } else {
                    this.showList = false;
                }

                if (options.cssClasses) {
                    this.cssClasses = options.cssClasses;
                } else {
                    this.cssClasses = "flash-message-container";
                }

                if (options.timeout) {
                    this.timeoutId = window.setTimeout(() => {
                        this.showFlashMessage = false;
                    }, options.timeout);
                }

                this.showFlashMessage = true;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
