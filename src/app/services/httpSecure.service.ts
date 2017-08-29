import {Injectable} from "@angular/core";
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/*
 Insert into AppModule Providers

 {
 provide: HttpSecureService,
 useFactory: HttpSecureFactory,
 deps: [XHRBackend, RequestOptions]
 }
 */

export function HttpSecureFactory(backend: XHRBackend, options: RequestOptions) {
    return new HttpSecureService(backend, options);
}

@Injectable()
export class HttpSecureService extends Http {
    constructor(backend: XHRBackend, options: RequestOptions) {
        const token = localStorage.getItem("token");
        options.headers.set("Authorization", token);

        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        const token = localStorage.getItem("token");
        if (typeof url === "string") { // meaning we have to add the token to the options, not in url
            if (!options) {
                // let's make option object
                options = {headers: new Headers()};
            }
            options.headers.set("Authorization", token);
        } else {
            // we have to add the token to the url object
            url.headers.set("Authorization", token);
        }
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError(self: HttpSecureService) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log(res);
            }
            return Observable.throw(res);
        };
    }
}
