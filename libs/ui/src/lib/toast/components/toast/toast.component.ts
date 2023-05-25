import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastSeverity } from '../../models/toast.model';
import { BehaviorSubject, ReplaySubject, Subscription, delay, filter, interval, map, of, takeUntil, tap } from 'rxjs';
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

  private readonly DELAY_TIMEOUT = 3500;
  private readonly DISPOSE_TIMEOUT = 300;
  private readonly INTERVAL_MS = 50;

  @Input() severity!: ToastSeverity;
  @Input() title!: string;
  @Input() message!: string;
  @Input() duration = this.DELAY_TIMEOUT;

  @Output() dispose = new EventEmitter();

  visible = true;
  percentage = 100;
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private timeout = 0;
  private _timerEnabled = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    interval(this.INTERVAL_MS)
      .pipe(
        takeUntil(this.destroyed$),
        filter(() => this._timerEnabled.value),
        map(() => this.timeout += this.INTERVAL_MS),
        tap(() => this.percentage = 100 - (this.timeout / this.duration) * 100),
        filter(() => this.timeout >= this.duration),
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

  onMouseOver = () => this._timerEnabled.next(false);

  onMouseLeave = () => this._timerEnabled.next(true);
}