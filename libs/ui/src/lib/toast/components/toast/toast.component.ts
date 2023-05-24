import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastSeverity } from '../../models/toast.model';
import { ReplaySubject, Subscription, delay, of, takeUntil, tap } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)', opacity: 1 })),
      state('close', style({ transform: 'translateY(-200%)', opacity: 0 })),
      transition('open <=> close', [
        animate('.3s ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() severity!: ToastSeverity;
  @Input() title!: string;
  @Input() message!: string;

  @Output() dispose = new EventEmitter();

  visible = true;

  private readonly DELAY_TIMEOUT = 3500;
  private readonly DISPOSE_TIMEOUT = 300;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnInit(): void {
    of(this.title)
    .pipe(
      takeUntil(this.destroyed$),
      delay(this.DELAY_TIMEOUT),
      tap(this.onClose)
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onClose = () => {
    const subscription: Subscription = of(true)
      .pipe(
        tap(() => this.visible = false),
        delay(this.DISPOSE_TIMEOUT),
        tap(() => this.dispose.emit()),
        tap(() => subscription.unsubscribe())
      )
      .subscribe();
    }
}