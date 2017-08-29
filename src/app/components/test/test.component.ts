import {AfterViewInit, Component, EventEmitter, OnInit, Output} from "@angular/core";
import {TestService} from "./test.service";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/interval";
import Socket = SocketIOClient.Socket;

@Component({
    templateUrl: "./test.component.html",
    styleUrls: ["./test.component.scss"]
})
export class TestComponent implements OnInit, AfterViewInit {
    @Output() accept: EventEmitter<void> = new EventEmitter<void>();
    showButton1: boolean = true;
    showButton2: boolean = false;

    constructor(private _testService: TestService) {
    }

    preAccept() {
        this.showButton2 = !this.showButton2;
    }

    postAccept() {
        this.accept.next();
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {

    }
}
