import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

export interface IFlashMessageOptions {
    data: string | string[];
    asList?: boolean;
    insertAsHtml?: boolean;
    cssClasses?: string | string[];
    timeout?: number;
}

@Injectable()
export class FlashMessageService {
    private flashMessage = new Subject<IFlashMessageOptions | boolean>();
    flashMessage$ = this.flashMessage.asObservable();

    constructor() {
    }

    showFlashMessage(data: IFlashMessageOptions) {
        this.flashMessage.next(data);
    }

    hideFlashMessage() {
        this.flashMessage.next(false);
    }
}
