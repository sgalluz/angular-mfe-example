import { Directive } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DefaultValueAccessorDirective
        }
    ]
  })
export class DefaultValueAccessorDirective implements ControlValueAccessor {

    public value = new FormControl();
  
    writeValue = (value: number): void => this.value.setValue(value);
  
    registerOnChange = (fn: (_: any) => void): void => { /* nothing to do */ }
  
    registerOnTouched = (fn: (_: any) => void): void => { /* nothing to do */ }
  }
  