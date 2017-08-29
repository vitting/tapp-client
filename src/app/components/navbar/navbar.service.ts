import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NavbarService {
    newMessages: Subject<number> = new Subject<number>();
    newMessages$ = this.newMessages.asObservable();
    showNewMessages: Subject<boolean> = new Subject<boolean>();
    showNewMessages$ = this.showNewMessages.asObservable();

    constructor() {
    }

    setUnreadMessagesCounter(numberOfUnreadMessages) {
        this.newMessages.next(numberOfUnreadMessages);
    }

    showNewMessagesArea(show: boolean) {
        this.showNewMessages.next(show);
    }
}
