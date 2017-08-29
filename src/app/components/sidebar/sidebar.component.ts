import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {NavigationEnd, Router} from "@angular/router";
import * as $ from "jquery";

import {SidebarService} from "./sidebar.service";

@Component({
    selector: "app-sidebar",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div id="sidebarOverlay"></div>
        <div class="sidebar">
            <div class="sidebar-header">
                <a [href]="" (click)="close()">
                    <i class="fa fa-arrow-circle-right d-flex justify-content-end" aria-hidden="true"></i>
                </a>
            </div>
            <div class="sidebar-title">
                {{title}}
            </div>

            <div class="sidebar-body">
                <ul>
                    <ng-content></ng-content>
                </ul>
            </div>
        </div>
    `,
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @Input() show: boolean = false;
    @Output() sidebarHide = new EventEmitter<boolean>();
    title: string = "";
    subscriptionTitle: Subscription;
    subscriptionShowHide: Subscription;

    constructor(private _router: Router,
                private _sidebarService: SidebarService) {
    }

    private hideSidebar() {
        if (this.show) {
            this.show = false;
            this.close();
        }
    }

    private showSidebar() {
        this.show = true;
        this.open();
    }

    // Close sidebar
    close() {
        if ($(".sidebar").hasClass("slideIn")) {
            $(".sidebar").removeClass("slideIn").addClass("slideOut");
        }
        $("#sidebarOverlay").hide();
        this.sidebarHide.next(true);
    }

    // Open sidebar
    open() {
        $("#sidebarOverlay").show();
        $(".sidebar").removeClass("slideOut").addClass("slideIn");
    }

    // Read properties values when they are changed
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["show"] && changes["show"].currentValue === true) {
            this.open();
        } else {
            this.close();
        }
    }

    ngOnInit(): void {
        this._router.events.subscribe((data) => {
            if (data instanceof NavigationEnd) {
                this.hideSidebar();
            }
        });

        this.subscriptionTitle = this._sidebarService.sidebarTitle$.subscribe((title: string) => {
            this.title = title;
        });

        this.subscriptionShowHide = this._sidebarService.sidebarShowHide$.subscribe((show: boolean) => {
            if (show) {
                this.showSidebar();
            } else {
                this.hideSidebar();
            }
        });
    }

    ngAfterViewInit(): void {
        $("#sidebarOverlay").click(() => {
            this.close();
        });
    }

    ngOnDestroy(): void {
        this.subscriptionTitle.unsubscribe();
        this.subscriptionShowHide.unsubscribe();
    }
}
