import {Injectable} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";

@Injectable()
export class ErrorMessagesService {
    private labelMap = new Map();
    private errorMap = new Map();
    private errorMessages: string[] = [];

    constructor() {
        this.initErrorMessages();
        this.initLabels();
    }

    private initLabels() {
        this.labelMap.set("street", "Gade");
        this.labelMap.set("zipCode", "Postnr");
        this.labelMap.set("city", "By");
        this.labelMap.set("firstName", "Fornavn");
        this.labelMap.set("lastName", "Efternavn");
        this.labelMap.set("username", "Brugernavn");
        this.labelMap.set("mail", "E-mail");
        this.labelMap.set("mobilePhone", "Mobil");
        this.labelMap.set("password", "Kodeord");
        this.labelMap.set("newPassword", "Nyt kodeord");
        this.labelMap.set("newPasswordRepeat", "Gentag nyt kodeord");
    }

    private initErrorMessages() {
        this.errorMap.set("required", "Skal udfyldes");
        this.errorMap.set("minlength", "Skal være på mindst [NUMBER] tegn");
        this.errorMap.set("maxlength", "Må på mere end [NUMBER] tegn");
        this.errorMap.set("passwordnotequal", "Kodeord er ikke ens");
        this.errorMap.set("^[0-9]*$", "Skal være et nummer");
        this.errorMap.set("^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$", "Er ikke en valid e-mail adresse");
    }

    private getError(errorName: string, controlName: string, error: any): string {
        let errorMessage = this.errorMap.get(errorName);

        if (errorName === "minlength" || errorName === "maxlength") {
            errorMessage = errorMessage.replace("[NUMBER]", error.requiredLength);
        }

        return this.labelMap.get(controlName) + ": " + errorMessage;
    }


    private controlErrors(controlName: string, control: AbstractControl): string {

        if (control.valid) {
            return null;
        }
        for (const errorName in control.errors) {
            if (control.errors.hasOwnProperty(errorName)) {
                let err = errorName.toLowerCase();

                const ctrl = control.getError(errorName);
                if (errorName === "pattern") {
                    err = ctrl.requiredPattern;
                }

                return this.getError(err, controlName, ctrl);
            }
        }
    }


    private controls(formGroup: FormGroup): void {
        for (const controlName in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(controlName)) {
                const ctrl = formGroup.get(controlName);
                let message = null;
                if (ctrl instanceof FormGroup) {
                    this.controls(ctrl);
                } else {
                    message = this.controlErrors(controlName, ctrl);
                }
                if (message) {
                    this.errorMessages.push(message);
                }
            }
        }
    }

    getErrorMessages(formGroup: FormGroup): string[] {
        this.errorMessages = [];
        this.controls(formGroup);

        return this.errorMessages;
    }
}
