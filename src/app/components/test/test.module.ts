import { NgModule } from "@angular/core";

import { TestComponent } from "./test.component";
import {TestRoutingModule} from "./test-routing.module";
import {TestService} from "./test.service";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [TestRoutingModule, CommonModule, HttpModule],
    exports: [],
    declarations: [TestComponent],
    providers: [TestService],
})
export class TestModule { }
