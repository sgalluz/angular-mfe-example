import { ValidationErrors } from "@angular/forms";

interface ValidationFormatter {
    setNext(handler: ValidationFormatter): ValidationFormatter;
    format(errors: ValidationErrors | null): string | undefined;
}

abstract class AbstractValidationFormatter implements ValidationFormatter {
    private nextHandler: ValidationFormatter | undefined;

    public setNext(handler: ValidationFormatter): ValidationFormatter {
        this.nextHandler = handler;
        return handler;
    }

    public format(errors: ValidationErrors | null): string | undefined {
        return this.nextHandler?.format(errors);
    }
}

class RequiredFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['required']) {
            return 'Field is required';
        }
        return super.format(errors);
    }
}

class MinLengthFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['minlength']) {
            const { requiredLength } = errors['minlength'];
            return `Field must have at least ${requiredLength} chars`;
        }
        return super.format(errors);
    }
}

class MaxLengthFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['maxlength']) {
            const { requiredLength } = errors['maxlength'];
            return `Field cannot have more than ${requiredLength} chars`;
        }
        return super.format(errors);
    }
}

class MinFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['min']) {
            const { min } = errors['min'];
            return `Field must be greater or equal than ${min}`;
        }
        return super.format(errors);
    }
}

class MaxFormatter extends AbstractValidationFormatter {
    public override format(errors: ValidationErrors | null): string | undefined {
        if (errors?.['max']) {
            const { requiredLength } = errors['max'];
            return `Field must be lower or equal than ${requiredLength}`;
        }
        return super.format(errors);
    }
}

const errorFormatters = new RequiredFormatter();

errorFormatters
    .setNext(new MinLengthFormatter())
    .setNext(new MaxLengthFormatter())
    .setNext(new MinFormatter())
    .setNext(new MaxFormatter());

export default errorFormatters;