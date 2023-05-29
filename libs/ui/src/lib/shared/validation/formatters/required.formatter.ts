import { ValidationErrors } from "@angular/forms";
import { AbstractValidationFormatter } from "./abstract.formatter";

export class RequiredFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['required']) {
            return 'Field is required';
        }
        return super.format(errors);
    }
}