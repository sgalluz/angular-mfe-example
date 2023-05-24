import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast, ToastSeverity } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private _toast = new Subject<Toast>();
  toast$: Observable<Toast> = this._toast.asObservable();

  success = (title: string, message: string) => this.showToast('success', title, message);

  info = (title: string, message: string) => this.showToast('info', title, message);

  warning = (title: string, message: string) => this.showToast('warning', title, message);

  error = (title: string, message: string) => this.showToast('error', title, message);

  private showToast = (severity: ToastSeverity, title: string, message: string) =>
    this._toast.next({ severity, title, message });
}