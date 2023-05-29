import { ValidationErrors } from "@angular/forms";
import { AbstractValidationFormatter } from "./abstract.formatter";

export class MaxLengthFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['maxlength']) {
            const { requiredLength } = errors['maxlength'];
            return `Field cannot have more than ${requiredLength} chars`;
        }
        return super.format(errors);
    }
}