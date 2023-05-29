import { ValidationErrors } from "@angular/forms";
import { AbstractValidationFormatter } from "./abstract.formatter";

export class MinLengthFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['minlength']) {
            const { requiredLength } = errors['minlength'];
            return `Field must have at least ${requiredLength} chars`;
        }
        return super.format(errors);
    }
}