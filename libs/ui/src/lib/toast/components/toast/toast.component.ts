import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastSeverity } from '../../models/toast.model';
import { BehaviorSubject, Observable, ReplaySubject, concatMap, delay, filter, interval, map, of, take, takeUntil, tap } from 'rxjs';
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
  
  private timerDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _timerEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private timeout = 0;

  ngOnInit(): void {
    interval(this.INTERVAL_MS)
      .pipe(
        takeUntil(this.timerDestroyed$),
        filter(() => this._timerEnabled.value),
        tap(() => this.timeout += this.INTERVAL_MS),
        tap(() => this.percentage = 100 - (this.timeout / this.duration) * 100),
        filter(() => this.timeout >= this.duration),
        concatMap(this.onDispose)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.timerDestroyed$.complete();
  }

  onClose = () => this.onDispose().subscribe();

  onMouseOver = () => this._timerEnabled.next(false);

  onMouseLeave = () => this._timerEnabled.next(true);

  private onDispose = (): Observable<boolean> =>
    of(this.percentage)
      .pipe(
        take(1),
        tap(() => this.timerDestroyed$.next(true)),
        tap(() => this.visible = false),
        delay(this.DISPOSE_TIMEOUT),
        tap(() => this.dispose.emit()),
        map(() => !this.visible)
      );
}