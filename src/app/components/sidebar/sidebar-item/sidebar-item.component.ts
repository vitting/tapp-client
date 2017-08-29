import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "app-sidebar-item",
    template: `
        <li *ngIf="!hide">
            <a href="#" [routerLink]="routerLink" [routerLinkActive]="routerLinkActive"
               [routerLinkActiveOptions]="routerLinkActiveOptions">
                <ng-content></ng-content>
            </a>
        </li>
    `,
    styleUrls: ["./sidebar-item.component.scss"]
})
export class SidebarItemComponent implements OnInit {
    @Input() hide: boolean = false;
    @Input() staticItem: boolean = false;
    @Input() routerLink: any[] | string;
    @Input() routerLinkActive: string[] | string;
    @Input() routerLinkActiveOptions: { exact: boolean };

    constructor() {
    }

    ngOnInit() {
        if (!this.routerLink) {
            this.routerLink = "";
        }
        if (!this.routerLinkActive) {
            this.routerLinkActive = [""];
        }
        if (!this.routerLinkActiveOptions) {
            this.routerLinkActiveOptions = {exact: false};
        }
    }
}
