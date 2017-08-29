import {AbstractControl, ValidatorFn} from "@angular/forms";

interface IValidatorReturnValue {
    [key: string]: boolean | string;
}

export class CustomValidators {
    static passwordEqual(password: string): ValidatorFn {
        return (control: AbstractControl): IValidatorReturnValue => {
            const newPasswordRepeat: string = control.value;
            if (password === newPasswordRepeat) {
                return null;
            }

            return {"passwordNotEqual": true};
        };
    }
}
