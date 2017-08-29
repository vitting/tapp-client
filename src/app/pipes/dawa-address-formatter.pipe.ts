import {Pipe, PipeTransform} from "@angular/core";

import {IDawaAddress} from "../../misc/interfaces";
import {DawaService} from "../services/dawa.service";

@Pipe({
    name: "dawaAddressFormatter"
})
export class DawaAddressFormatterPipe implements PipeTransform {
    constructor(private _dawaService: DawaService) {
    }

    transform(dawa: IDawaAddress): any {
        let address: string;
        let vejnavn: string = "";
        let husnr: string = "";
        let etage: string = "";
        let door: string = "";
        let postnr: string = "";
        let postnrnavn: string = "";

        if (dawa.data.vejnavn) {
            vejnavn = dawa.data.vejnavn;
        }

        if (dawa.data.husnr) {
            husnr = ` ${dawa.data.husnr}`;
        }

        if (dawa.data.etage) {
            etage = `,${dawa.data.etage}`;
        }

        if (dawa.data.dør) {
            door = ` ${dawa.data.dør}`;
        }

        if (dawa.data.postnr) {
            postnr = dawa.data.postnr;
        }

        if (dawa.data.postnrnavn) {
            postnrnavn = dawa.data.postnrnavn;
        }

        address = this._dawaService.formatDawaAddress(dawa);

        return `${address} (${postnr} ${postnrnavn})`;
    }
}
