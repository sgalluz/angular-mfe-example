import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { DefaultValueAccessorDirective } from '../../../shared/directives/default-value-accessor.directive';
import { ReplaySubject, filter, map, takeUntil, tap } from 'rxjs';
import errorFormatters from '../../../shared/formatters/validation.formatter';
import { injectNgControl } from '../../../shared/injection/ng-control';

type InputType = 'text' | 'password';

@Component({
  selector: 'ui-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  hostDirectives: [DefaultValueAccessorDirective]
})
export class InputTextComponent implements OnInit, OnDestroy {

  @Input() type: InputType = 'text';
  @Input() name: string = uuid();
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required = false;

  ngControl: NgControl | null;
  validationError?: string;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() {
    this.ngControl = injectNgControl();
  }

  ngOnInit(): void {
    this.ngControl?.control?.valueChanges?.pipe(
      takeUntil(this.destroyed$),
      map(() => this.ngControl?.control),
      filter(control => !!control?.dirty),
      map(control => control?.invalid ? control?.errors : null),
      tap(errors => this.validationError = errorFormatters.format(errors))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
