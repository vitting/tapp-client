import * as $ from "jquery";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDawaAddress, ITask} from "../../../../../../misc/interfaces";
import {DawaService} from "../../../../../services/dawa.service";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {ErrorMessagesService} from "../../../../../services/error-messages.service";
import {FlashMessageService} from "../../../../flash-message/flash-message.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-task-form",
    templateUrl: "./task-form.component.html"
})
export class TaskFormComponent implements OnChanges {
    @Output() formSubmit: EventEmitter<ITask> = new EventEmitter<ITask>();
    @Input() showRequired: boolean = false;
    @Input() resetFormAfterSubmit: boolean = true;
    @Input() disableForm: boolean = false;
    @Input() task: ITask = null;
    @Input() showDeleteButton: boolean = false;
    tasksForm: FormGroup;
    street: FormControl;
    zipCode: FormControl;
    city: FormControl;
    startDate: FormControl;
    startTime: FormControl;
    endTime: FormControl;
    description: FormControl;
    streetLoading: boolean = false;

    constructor(private _errorMessageService: ErrorMessagesService,
                private _flashMessageService: FlashMessageService,
                private _dawaService: DawaService,
                private _formBuilder: FormBuilder) {
        this.initForm();
    }

    search = (text$: Observable<string>) => {
        return text$.debounceTime(300)
            .distinctUntilChanged()
            .do(() => {
                this.streetLoading = true;
            })
            .switchMap((term) => {
                if (term.length < 3) {
                    this.streetLoading = false;
                    return [];
                } else {
                    return this._dawaService.dawaAddressLookup(term)
                        .do(() => {
                            this.streetLoading = false;
                        })
                        .catch(() => {
                            return Observable.of([]);
                        });
                }
            })
            .do(() => {
                this.streetLoading = false;
            });
    }

    formatter = (address: IDawaAddress) => {
        if (address && typeof address === "string") {
            return address;
        } else {
            return this._dawaService.formatDawaAddress(address);
        }
    }

    private initForm() {
        this.startDate = new FormControl("", Validators.required);
        this.startTime = new FormControl({hour: 13, minute: 0}, Validators.required);
        this.endTime = new FormControl({hour: 13, minute: 0}, Validators.required);
        this.street = new FormControl("", Validators.required);
        this.zipCode = new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[0-9]*"),
            Validators.minLength(4),
            Validators.maxLength(4)
        ]));
        this.city = new FormControl("", Validators.required);
        this.description = new FormControl("", Validators.required);

        this.tasksForm = this._formBuilder.group({
            "startDate": this.startDate,
            "startTime": this.startTime,
            "endTime": this.endTime,
            "address": this._formBuilder.group({
                "street": this.street,
                "zipCode": this.zipCode,
                "city": this.city
            }),
            "description": this.description
        });
    }

    private setFormValues(task: ITask) {
        this.street.setValue(task.address.street);
        this.zipCode.setValue(task.address.zipCode);
        this.city.setValue(task.address.city);
    }

    private setFormAddressValues(street: string, zipCode: number, city: string) {
        this.street.setValue(street);
        this.zipCode.setValue(zipCode);
        this.city.setValue(city);
    }

    private showErrorMessages() {
        const errorMessages = this._errorMessageService.getErrorMessages(this.tasksForm);
        this._flashMessageService.showFlashMessage({
            data: errorMessages
        });
    }

    private resetForm() {
        if (this.resetFormAfterSubmit) {
            this.tasksForm.reset();
        }

        $("#firstName").focus();
    }

    private disableFieldsInForm(disable: boolean) {
        if (disable) {
            this.tasksForm.disable();
        } else {
            this.tasksForm.enable();
        }
    };

    streetSelected(selected: NgbTypeaheadSelectItemEvent) {
        selected.preventDefault();
        const addr = this._dawaService.formatDawaAddress(selected.item);
        this.setFormAddressValues(addr, selected.item.data.postnr, selected.item.data.postnrnavn);
    }

    submitForm() {
        if (this.showDeleteButton) {
            this.formSubmit.next(this.task);
            this.resetForm();
        } else {
            if (this.tasksForm.valid) {
                this.formSubmit.next(this.tasksForm.value);
                this.resetForm();
            } else {
                this.showErrorMessages();
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["task"] && changes["task"].currentValue) {
            this.setFormValues(changes["task"].currentValue);
        }

        if (changes["disableForm"]) {
            this.disableFieldsInForm(changes["disableForm"].currentValue);
        }
    }
}
