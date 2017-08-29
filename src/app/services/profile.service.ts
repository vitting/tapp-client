import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {HttpSecureService} from "./httpSecure.service";
import {IEmployee, IResponseValue} from "../../misc/interfaces";
import {config} from "../../misc/configs";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../misc/helperFunctions";

@Injectable()
export class ProfileService {

    constructor(private _httpSecure: HttpSecureService) {
    }

    getProfile(id: string): Observable<IResponseValue<IEmployee>> {
        const empUrl = `${config.apiUrl}/employees/${id}`;
        return this._httpSecure.get(empUrl)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    updateProfile(id: string, employee: IEmployee): Observable<IResponseValue<null>> {
        const empUrl = `${config.apiUrl}/employees/${id}`;
        return this._httpSecure.put(empUrl, employee)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }
}
