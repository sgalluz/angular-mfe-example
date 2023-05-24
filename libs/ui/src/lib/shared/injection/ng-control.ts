import { inject } from "@angular/core";
import { FormControlDirective, FormControlName, NgControl, NgModel } from "@angular/forms";

export function injectNgControl(): FormControlDirective | FormControlName | NgModel {
    const ngControl = inject(NgControl, { self: true, optional: true });
  
    if (!ngControl) throw new Error('Unable to inject an instance of type NgControl');
    
    const isTemplateOrRxControl =
      ngControl instanceof FormControlDirective ||
      ngControl instanceof FormControlName ||
      ngControl instanceof NgModel;
  
    if (isTemplateOrRxControl) {
      return ngControl;
    }
  
    throw new Error('Error while creating a new instance of NgControl');
  }