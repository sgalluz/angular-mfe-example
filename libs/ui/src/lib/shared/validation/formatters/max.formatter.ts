import { ValidationErrors } from "@angular/forms";
import { AbstractValidationFormatter } from "./abstract.formatter";

export class MaxFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['max']) {
            const { max } = errors['max'];
            return `Field must be lower or equal than ${max}`;
        }
        return super.format(errors);
    }
}