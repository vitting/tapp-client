import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SidebarService {
    private sidebarTitle = new Subject<string>();
    private sidebarShowHide = new Subject<boolean>();
    sidebarTitle$ = this.sidebarTitle.asObservable();
    sidebarShowHide$ = this.sidebarShowHide.asObservable();

    constructor() {
    }

    setTitle(title: string) {
        this.sidebarTitle.next(title);
    }

    show() {
        this.sidebarShowHide.next(true);
    }

    hide() {
        this.sidebarShowHide.next(false);
    }
}
