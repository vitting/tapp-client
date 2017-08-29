import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule, RequestOptions, XHRBackend} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import "hammerjs";
import "hammer-timejs";
import "jquery-hammerjs";
import "bootstrap";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./components/home/home.module";
import {SidebarModule} from "./components/sidebar/sidebar.module";
import {NavbarModule} from "./components/navbar/navbar.module";
import {LoginModule} from "./components/login/login.module";
import {FlashMessageModule} from "./components/flash-message/flash-message.module";
import {AuthentationService} from "./services/authentication.service";
import {HttpSecureFactory, HttpSecureService} from "./services/httpSecure.service";
import {TestModule} from "./components/test/test.module";
import {ProfileModule} from "./components/profile/profile.module";
import {ChangePasswordModule} from "./components/change-password/change-password.module";
import {LogoutModule} from "./components/logout/logout.module";
import {SidebarService} from "./components/sidebar/sidebar.service";
import {UtilityService} from "./services/utility.service";
import {SettingsModule} from "./components/settings/settings.module";
import {ChatModule} from "./components/chat/chat.module";
import {CommonSocketService} from "./services/common-socket.service";
import {NavbarService} from "./components/navbar/navbar.service";
import {EmployeesAdminModule} from "./components/administration/employees-admin/employees-admin.module";
import {CustomersAdminModule} from "./components/administration/customers-admin/customers-admin.module";
import {TasksAdminModule} from "./components/administration/tasks-admin/tasks-admin.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule, JsonpModule,
        RouterModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        SidebarModule,
        NavbarModule,
        HomeModule,
        ProfileModule,
        ChangePasswordModule,
        LogoutModule,
        LoginModule,
        EmployeesAdminModule,
        CustomersAdminModule,
        TasksAdminModule,
        FlashMessageModule,
        SettingsModule,
        ChatModule,
        TestModule
    ],
    providers: [
        AuthentationService,
        {
            provide: HttpSecureService,
            useFactory: HttpSecureFactory,
            deps: [XHRBackend, RequestOptions]
        },
        SidebarService,
        UtilityService,
        CommonSocketService,
        NavbarService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
