import * as moment from "moment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {HttpSecureService} from "./httpSecure.service";
import {config} from "../../misc/configs";
import {ICalendarEvent, IResponseValue, ITask} from "../../misc/interfaces";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../misc/helperFunctions";

@Injectable()
export class TaskService {
    constructor(private _httpSecure: HttpSecureService) {
    }

    /*
     * type = "day" or "month"
     * */
    getTasksByDate(date: Date, type: string): Observable<IResponseValue<ITask[] | ICalendarEvent[]>> {
        const tUrl = config.apiUrl + "/tasks/date/" + moment(date).toJSON() + "?type=" + type;
        return this._httpSecure.get(tUrl)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    assignToTask(taskId: string, userId: string): Observable<IResponseValue<any>> {
        const tUrl = config.apiUrl + "/tasks/users";
        const body = {taskId: taskId, userId: userId};
        return this._httpSecure.post(tUrl, body)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }
}
