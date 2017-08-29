import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CalendarEvent, CalendarMonthViewDay} from "angular-calendar";

@Component({
    selector: "app-task-calendar",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./task-calendar.component.html"
})
export class TaskCalendarComponent implements OnInit {
    @Output() dayChange = new EventEmitter<Date>();
    @Output() monthChange = new EventEmitter<Date>();
    @Input() events: CalendarEvent[] = [];
    viewDate: Date = new Date(Date.now());
    locale: string = "dk";
    weekStartsOn: number = 1;
    view: string = "month";
    activeDayIsOpen: boolean = false;
    selectedDay: CalendarMonthViewDay;

    constructor() {
    }

    handleEvent(action: string, event: CalendarEvent): void {

    }

    dayClicked(day: CalendarMonthViewDay): void {
        if (this.selectedDay) {
            delete this.selectedDay.cssClass;
        }

        day.cssClass = "cal-day-selected";
        this.selectedDay = day;
        this.activeDayIsOpen = false;
        this.dayChange.next(day.date);
    }

    viewChange(date: Date) {
        this.monthChange.next(date);
    }

    modifyDay(day: CalendarMonthViewDay) {
        if (day.isToday) {
            // day.cssClass = "cal-day-selected";
            // day.badgeTotal = 9;
        }
    }

    ngOnInit() {
        //this.dayChange.next(this.viewDate);
    }
}
