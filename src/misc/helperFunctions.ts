import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

export function HttpResponseMapHandler(res: Response) {
    return res.json();
}

export function HttpResponseErrorHandler(err: ErrorObservable) {
    return Observable.throw(err || "server error");
}
