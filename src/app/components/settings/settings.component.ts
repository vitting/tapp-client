import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import * as $ from "jquery";

@Component({
    styleUrls: ["./settings.component.scss"],
    template: `
        <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div class="settings-menu">
                    <ul>
                        <li><a [routerLink]="'./profile'">
                            <button id="menu-profile" type="button" class="btn-round"><i class="fa fa-user"
                                                                                         aria-hidden="true"></i>
                            </button>
                            <span>Profil</span></a></li>
                        <li><a [routerLink]="'./changepassword'">
                            <button id="menu-changepassword" type="button" class="btn-round"><i class="fa fa-key"
                                                                                                aria-hidden="true"></i>
                            </button>
                            <span>Skift kodeord</span></a></li>
                        <li><a [routerLink]="'./logout'">
                            <button id="menu-logout" class="btn-round"><i class="fa fa-sign-out" aria-hidden="true"></i>
                            </button>
                            <span>Log ud</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-9 col-lg-9 col-md-8 col-sm-7">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class SettingsComponent implements OnInit {
    constructor(private _router: Router) {
    }

    ngOnInit() {
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const urlSplit = event.url.split("/");
                const lastPath = `menu-${urlSplit[urlSplit.length - 1]}`;
                $(".settings-menu button").removeClass("menu-active");
                $("#" + lastPath).addClass("menu-active");
            }
        });
    }
}
