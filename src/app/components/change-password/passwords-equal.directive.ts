import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";
import {Directive, Input, OnChanges, SimpleChanges} from "@angular/core";

import {CustomValidators} from "./passwords-equal.validator";

@Directive({
    selector: "[appPasswordEqual]",
    providers: [{provide: NG_VALIDATORS, useExisting: PasswordEqualValidatorDirective, multi: true}]
})
export class PasswordEqualValidatorDirective implements Validator, OnChanges {
    @Input() appPasswordEqual: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes["appPasswordEqual"];
        if (change) {
            const val: string = change.currentValue;
            this.valFn = CustomValidators.passwordEqual(val);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
