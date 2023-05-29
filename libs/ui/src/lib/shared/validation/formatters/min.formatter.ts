import { ValidationErrors } from "@angular/forms";
import { AbstractValidationFormatter } from "./abstract.formatter";

export class MinFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['min']) {
            const { min } = errors['min'];
            return `Field must be greater or equal than ${min}`;
        }
        return super.format(errors);
    }
}