import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {AuthentationService} from "./services/authentication.service";
import {SidebarService} from "./components/sidebar/sidebar.service";
import {CommonSocketService} from "./services/common-socket.service";
import {NavbarService} from "./components/navbar/navbar.service";
import {IAuthentication} from "../misc/interfaces";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    sidebarShow: boolean = false;
    isAuthenticated: boolean = false;
    isAdmin: boolean = false;
    private getIsThereNewNotificationsSub: Subscription = null;


    constructor(public _authService: AuthentationService,
                private _sidebarService: SidebarService,
                private _commonSocketService: CommonSocketService,
                private _navbarService: NavbarService) {
    }

    showSidebar() {
        this.sidebarShow = true;
    }

    hideSidebar() {
        this.sidebarShow = false;
    }

    private initCommonSocket() {
        this._commonSocketService.startCommonSocketService();
        this.getIsThereNewNotificationsSub = this._commonSocketService.getIsThereNewNotifications().subscribe((numberOfUnreadMessages: number) => {
            this._navbarService.setUnreadMessagesCounter(numberOfUnreadMessages);
        });
    }

    private initHammerGestures() {
        const element = document.getElementsByTagName("html");
        if (element && element[0]) {
            const hammer = new Hammer(element[0]);
            hammer.on("swiperight", (event) => {
                if (event.deltaX <= 100) {
                    this._sidebarService.show();
                }
            });
        }
    }

    private sidebarAuthentication() {
        this.isAuthenticated = this._authService.isAuthenticated();
        this.isAdmin = this._authService.isAdmin();
    }

    ngOnInit(): void {
        this._authService.isAuthenticatedOnServer().subscribe((auth: IAuthentication) => {
            if (auth.success) {
                this._authService.refreshTokenAndSetValues().then(() => {
                    this.initCommonSocket();
                    this.sidebarAuthentication();
                });
            } else {
                this._authService.userIsNotAuthenticated();
            }
        });

        this._authService.refreshIsUserLoggedIn().subscribe(() => {
            this.sidebarAuthentication();
        });
    }

    ngAfterViewInit(): void {
        this.initHammerGestures();
    }

    ngOnDestroy(): void {
        this.getIsThereNewNotificationsSub.unsubscribe();
        this._commonSocketService.stopCommonSocketService();
    }

    // TODO: Remove if not used
    // TODO: Implement remove DB Token entry
    @HostListener("window:beforeunload", ["$event"])
    onBeforeUnload(event) {
        console.log(event);
    }
}
