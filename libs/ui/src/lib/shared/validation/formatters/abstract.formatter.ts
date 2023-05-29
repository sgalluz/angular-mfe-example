import { ValidationErrors } from "@angular/forms";

interface ValidationFormatter {
    setNext(handler: ValidationFormatter): ValidationFormatter;
    format(errors: ValidationErrors | null): string | undefined;
}

export abstract class AbstractValidationFormatter implements ValidationFormatter {
    private nextHandler: ValidationFormatter | undefined;

    public setNext(handler: ValidationFormatter): ValidationFormatter {
        this.nextHandler = handler;
        return handler;
    }

    public format(errors: ValidationErrors | null): string | undefined {
        return this.nextHandler?.format(errors);
    }
}
