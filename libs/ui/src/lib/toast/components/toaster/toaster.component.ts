import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toast } from '../../models/toast.model';
import { ToastService } from '../../module';
import { ReplaySubject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'ui-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit, OnDestroy {

  toasts: Toast[] = [];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$
      .pipe(
        takeUntil(this.destroyed$),
        map(({ severity, title, message }) => ({ severity, title, message }))
      )
      .subscribe((toast: Toast) => this.toasts.push(toast));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onDisposeToast = (index: number) => this.toasts.splice(index, 1);

}
