import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/interval";

import {HttpSecureService} from "./httpSecure.service";
import {UtilityService} from "./utility.service";
import {config} from "../../misc/configs";
import {IAuthentication, ILogin, IMyInfo, IStoredUser} from "../../misc/interfaces";
import {SidebarService} from "../components/sidebar/sidebar.service";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {HttpResponseErrorHandler, HttpResponseMapHandler} from "../../misc/helperFunctions";

export enum RefreshTokenAction {
    start = 1,
    stop = 2
}

@Injectable()
export class AuthentationService {
    private userIsloggedIn: Subject<void> = new Subject<void>();
    authToken: string;
    user: any;
    refreshSubscribtion: any = null;
    observerRefreshToken: any;

    constructor(private _http: Http,
                private _router: Router,
                private _utilityService: UtilityService,
                private _httpSecure: HttpSecureService,
                private _sidebarService: SidebarService) {
        this.init_refreshToken();
    }

    // 900000 = 15 min.
    private init_refreshToken() {
        this.observerRefreshToken = Observable
            .interval(900000)
            .mergeMap(() => {
                return this.getRefreshedToken();
            });
    }

    private start_refreshToken() {
        if (!this.refreshSubscribtion) {
            this.refreshSubscribtion = this.observerRefreshToken.subscribe((data: IAuthentication) => {
                if (data && data.token) {
                    this.storeUserAuthData(data.token);
                }
            });
        }
    }

    private stop_refreshToken() {
        this.refreshSubscribtion.unsubscribe();
        this.refreshSubscribtion = null;
    }

    setUserAsLoggedin() {
        this.userIsloggedIn.next();
    }

    refreshIsUserLoggedIn(): Observable<void> {
        return this.userIsloggedIn.asObservable();
    }

    login(login: ILogin): Observable<IAuthentication> {
        const loginUrl = config.apiUrl + "/user/authenticate";
        return this._http.post(loginUrl, login)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    storeUserAuthData(token: string): Promise<boolean> {
        return this._utilityService.storeToken(token);
    }

    changePassword(newPassword: string): Observable<IAuthentication> {
        const changePasswordUrl = config.apiUrl + "/user/changepassword";
        return this._httpSecure.put(changePasswordUrl, {"password": newPassword})
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    logout(): Observable<IAuthentication> {
        const logoutUrl = config.apiUrl + "/user/logout";
        return this._httpSecure.post(logoutUrl, {"userId": this.getUserId()})
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler)
            .do(() => {
                this.authToken = null;
                this.user = null;
                this._utilityService.clearStoredToken();
                this._utilityService.clearStoredUser();
                this._sidebarService.setTitle("");
                this.refreshToken(RefreshTokenAction.stop);
            });
    }

    getRefreshedToken(): Observable<IAuthentication> {
        const refreshUrl = config.apiUrl + "/user/token/refresh";
        return this._httpSecure.get(refreshUrl)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    refreshToken(action: RefreshTokenAction) {
        if (action === RefreshTokenAction.start) {
            this.start_refreshToken();
        } else if (action === RefreshTokenAction.stop) {
            this.stop_refreshToken();
        }
    }

    refreshTokenAndSetValues(): Promise<boolean> {
        return new Promise((resolve) => {
            this.getRefreshedToken().subscribe((auth: IAuthentication) => {
                if (auth.token) {
                    this.storeUserAuthData(auth.token).then(() => {
                        this._sidebarService.setTitle(this.getUserName());
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            });
        });
    }


    isAuthenticated(): boolean {
        return !this._utilityService.isTokenExpired();
    }

    isAuthenticatedOnServer(): Observable<IAuthentication> {
        const refreshUrl = `${config.apiUrl}/user/isauthenticated/${this.getUserId()}`;
        return this._httpSecure.get(refreshUrl)
            .map(HttpResponseMapHandler)
            .catch(HttpResponseErrorHandler);
    }

    userIsNotAuthenticated() {
        this._utilityService.clearStoredUserData();
        this._router.navigate(["/login"]);
    }

    getUser(): IStoredUser {
        return this._utilityService.getStoredUser();
    }

    getUserName(): string {
        const user: IStoredUser = this.getUser();
        return user ? user.name : null;
    }

    getUserId(): string {
        const user = this.getUser();
        return user ? user._id : null;
    }

    isAdmin(): boolean {
        const user = this.getUser();
        return user ? user.isAdmin : null;
    }

    getToken(): string {
        return this._utilityService.getStoredToken();
    }

    getMyInfo(): IMyInfo {
        const myInfo: IMyInfo = {id: "", name: "", isAdmin: false};
        myInfo.id = this.getUserId();
        myInfo.name = this.getUserName();
        return myInfo;
    }
}
