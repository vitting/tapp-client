import {Injectable} from "@angular/core";
import {HttpSecureService} from "./httpSecure.service";
import {config} from "../../misc/configs";
import {Observable} from "rxjs/Observable";
import {ICustomer, IEmployee, IResponseValue} from "../../misc/interfaces";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../misc/helperFunctions";

@Injectable()
export class AdministratorService {

    constructor(private _httpSecure: HttpSecureService) {
    }

    getAllEmployees(): Observable<IResponseValue<IEmployee[]>> {
        const url = config.apiAdminUrl + "/employees";
        return this._httpSecure.get(url)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    createEmployee(employee: IEmployee): Observable<IResponseValue<IEmployee>> {
        const url = config.apiAdminUrl + "/employees";
        return this._httpSecure.post(url, employee)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    updateEmployee(id: string, employee: IEmployee): Observable<IResponseValue<IEmployee>> {
        const url = config.apiAdminUrl + "/employees/" + id;
        return this._httpSecure.put(url, employee)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    deleteEmployee(id: string): Observable<IResponseValue<IEmployee>> {
        const url = config.apiAdminUrl + "/employees/" + id;
        return this._httpSecure.delete(url)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    getAllCustomers(): Observable<IResponseValue<ICustomer[]>> {
        const url = config.apiAdminUrl + "/customers";
        return this._httpSecure.get(url)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    createCustomer(customer: ICustomer): Observable<IResponseValue<ICustomer>> {
        const url = config.apiAdminUrl + "/customers";
        return this._httpSecure.post(url, customer)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    updateCustomer(id: string, customer: ICustomer): Observable<IResponseValue<ICustomer>> {
        const url = config.apiAdminUrl + "/customers/" + id;
        return this._httpSecure.put(url, customer)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    deleteCustomer(id: string): Observable<IResponseValue<ICustomer>> {
        const url = config.apiAdminUrl + "/customers/" + id;
        return this._httpSecure.delete(url)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }
}
