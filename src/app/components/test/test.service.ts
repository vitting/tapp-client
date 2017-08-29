import * as moment from "moment";

import { Injectable } from "@angular/core";
import {Http, URLSearchParams, Headers} from "@angular/http";
import {config} from "../../../misc/configs";
import {HttpSecureService} from "../../services/httpSecure.service";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../../misc/helperFunctions";

@Injectable()
export class TestService {
    url: string = "http://localhost:3000/api";
    testMessage: string;
    constructor(
        private _http: Http,
        private _httpSecure: HttpSecureService
    ) { }

    test() {
      const tUrl = config.apiUrl + "/tasks/date/" + moment().toJSON();
      return this._httpSecure.get(tUrl)
        .map(HttpResponseMapHandler)
        .catch(HttpResponseErrorHandler);
    }

    dawaLookup(value: string) {
        const url = "http://dawa.aws.dk/autocomplete";

        const params = new URLSearchParams();
        params.set("type", "adresse");
        params.set("per_side", "10");
        params.set("q", value);

        const headers = new Headers({ "Content-Type": "text/plain" });

        return this._http.get(url, {search: params, headers: headers})
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    logout() {
        const logUrl = this.url + "/user/logout";
        return this._httpSecure.post(logUrl, {})
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    serviceIsStarted(msg: string) {
        if (!this.testMessage) {
            this.testMessage = msg;
        }
        console.log("This is TestService Talking: " + msg);
        console.log("Test Message is: " + this.testMessage);

    }


}
