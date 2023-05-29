import { ValidationErrors } from '@angular/forms';
import errorFormatters from './validation.formatter';

describe('ValidationFormatters', () => {
  describe('when format validation errors', () => {
    it('should return undefined when no error occurs', () => {
        const errors: ValidationErrors = {};
  
        const actual = errorFormatters.format(errors);
  
        expect(actual).not.toBeDefined();
      });

    it('should return label for required error', () => {
      const errors: ValidationErrors = {
        required: true
      };

      const actual = errorFormatters.format(errors);

      expect(actual).toBe('Field is required');
    });

    it('should return label for min length error', () => {
      const requiredLength = 5;
      const errors: ValidationErrors = {
        minlength: { requiredLength }
      };

      const actual = errorFormatters.format(errors);

      expect(actual).toBe(`Field must have at least ${requiredLength} chars`);
    });

    it('should return label for max length error', () => {
      const requiredLength = 5;
      const errors: ValidationErrors = {
        maxlength: { requiredLength }
      };
  
      const actual = errorFormatters.format(errors);

      expect(actual).toBe(`Field cannot have more than ${requiredLength} chars`);
    });

    it('should return label for min value error', () => {
      const min = 5;
      const errors: ValidationErrors = {
        min: { min }
      };

      const actual = errorFormatters.format(errors);

      expect(actual).toBe(`Field must be greater or equal than ${min}`);
    });

      it('should return label for max length error', () => {
      const max = 5;
      const errors: ValidationErrors = {
        max: { max }
      };

      const actual = errorFormatters.format(errors);

      expect(actual).toBe(`Field must be lower or equal than ${max}`);
    });
  });
});