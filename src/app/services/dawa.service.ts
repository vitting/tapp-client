import {Injectable} from "@angular/core";
import {Headers, Http, URLSearchParams} from "@angular/http";

import {IDawaAddress} from "../../misc/interfaces";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../misc/helperFunctions";

@Injectable()
export class DawaService {

    constructor(private _http: Http) {
    }

    dawaAddressLookup(value: string) {
        const url = "http://dawa.aws.dk/autocomplete";

        const params = new URLSearchParams();
        params.set("type", "adresse");
        params.set("per_side", "15");
        params.set("startfra", "adresse");
        params.set("q", value);

        const headers = new Headers();
        headers.append("Content-Type", "text/plain");

        return this._http.get(url, {search: params, headers: headers})
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    formatDawaAddress(dawa: IDawaAddress): string {
        let vejnavn: string = "";
        let husnr: string = "";
        let etage: string = "";
        let door: string = "";

        if (dawa.data.vejnavn) {
            vejnavn = dawa.data.vejnavn;
        }

        if (dawa.data.husnr) {
            husnr = ` ${dawa.data.husnr}`;
        }

        if (dawa.data.etage) {
            etage = `, ${dawa.data.etage}`;
        }

        if (dawa.data.dør) {
            door = ` ${dawa.data.dør}`;
        }

        return `${vejnavn}${husnr}${etage}${door}`;
    }

}
