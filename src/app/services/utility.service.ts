import {Injectable} from "@angular/core";
import * as jwt_decode from "jwt-decode";
import "rxjs/add/observable/throw";
import {Chance} from "chance";

import {IStoredUser} from "../../misc/interfaces";

export enum WindowState {
    opened = 1,
    closed = 2
}

@Injectable()
export class UtilityService {
    private _tokenName = "token";
    private _tokenUserName = "user";

    constructor() {
    }

    getTokenExpirationDate(): Date {
        const token = this.getStoredToken();
        let decoded;

        if (!token) {
            return null;
        }

        decoded = jwt_decode(token);

        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(): boolean {
        const date: Date = this.getTokenExpirationDate();
        if (date == null) {
            return true;
        }

        return !(date.valueOf() > (new Date().valueOf() + 1000));
    }

    storeToken(token): Promise<boolean> {
        const tokenDecoded = jwt_decode(token);
        this.storeUser(tokenDecoded["user"]);
        localStorage.setItem(this._tokenName, token);
        return Promise.resolve(true);
    }

    getStoredToken(): string | null {
        return localStorage.getItem(this._tokenName);
    }

    clearStoredToken(): void {
        localStorage.removeItem(this._tokenName);
    }

    storeUser(user): void {
        localStorage.setItem(this._tokenUserName, JSON.stringify(user));
    }

    clearStoredUser(): void {
        localStorage.removeItem(this._tokenUserName);
    }

    getStoredUser(): IStoredUser {
        const user = localStorage.getItem(this._tokenUserName);

        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    clearStoredUserData() {
        this.clearStoredToken();
        this.clearStoredUser();
    }

    storeWindowState(id: string, state: WindowState) {
        localStorage.setItem("windowState_" + id, state.toString());
    }

    getWindowState(id: string): WindowState {
        const state: string = localStorage.getItem("windowState_" + id);
        if (state) {
            return WindowState[state];
        }

        return null;
    }

    showHideWindow(id: string) {
        const elemContainer = $("#" + id + " .show-hide-container");
        const elemIcon = $("#" + id + " .show-hide-icon");

        if (elemContainer.hasClass("show")) {
            elemContainer.hide().removeClass("show");
            elemIcon.removeClass("fa-minus-square").addClass("fa-plus-square");
            this.storeWindowState(id, WindowState.closed);
        } else {
            elemContainer.show().addClass("show");
            elemIcon.removeClass("fa-plus-square").addClass("fa-minus-square");
            this.storeWindowState(id, WindowState.opened);
        }
    }

    convertMapToArray<T>(map: Map<string, T>): T[] {
        const array: T[] = [];

        map.forEach((value) => {
            array.push(value);
        });

        return array;
    }

    generatePassword() {
        const chance = new Chance();
        const word: string = chance.word({syllables: 3});
        const num: number = chance.natural({min: 1, max: 99});
        return word + num;
    }
}
