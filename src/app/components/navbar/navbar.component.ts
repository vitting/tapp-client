import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {NavbarService} from "./navbar.service";

@Component({
    selector: "app-navbar",
    template: `
        <header>
            <nav class="d-flex justify-content-between">
                <a [href]="" (click)="show()" class="p-2">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </a>
                <div class="d-flex" *ngIf="showNotifications && numberOfUnreadMessages" (click)="gotoChat()">
                    <div class="nav-notify">{{numberOfUnreadMessages}}</div>
                    <div class="nav-notify-icon"><i class="fa fa-commenting" aria-hidden="true"></i></div>
                </div>
            </nav>
        </header>`,
    styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
    @Output() sidebarShow = new EventEmitter<boolean>();
    numberOfUnreadMessages: number = 0;
    showNotifications: boolean = true;

    constructor(private router: Router, private _navbarService: NavbarService) {
    }

    show() {
        this.sidebarShow.next(true);
    }

    ngOnInit() {
        this._navbarService.newMessages$.subscribe((numberOfUnreadMessages: number) => {
            this.numberOfUnreadMessages = numberOfUnreadMessages;
        });

        this._navbarService.showNewMessages$.subscribe((show: boolean) => {
            this.showNotifications = show;
        });
    }

    gotoChat() {
        this.router.navigate(["/chat"]);
    }
}
