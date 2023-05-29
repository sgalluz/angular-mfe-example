import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToasterComponent } from './toaster.component';
import { ToastService } from '../../module';
import { EMPTY, Observable, of } from 'rxjs';
import { Toast } from '../../models/toast.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  let toastService: ToastService;

  const toastServiceMock = {
    toast$: EMPTY as Observable<Toast>
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToasterComponent],
      providers: [{ provide: ToastService, useValue: toastServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('when a new toast is incoming', () => {
    const toast: Toast = {
      severity: 'warning',
      title: 'title',
      message: 'message'
    };

    it('should update toast list with the new element', () => {
      toastService.toast$ = of(toast);

      fixture.detectChanges();

      expect(component.toasts.length).toBe(1);
      expect(component.toasts[0]).toEqual(toast);
    });
  });

  describe('when a toast is disposed', () => {
    beforeEach(() => {
      component.toasts = [{
        severity: 'warning',
        title: 'title',
        message: 'message'
      }];
    });

    it('should update toast list by removing disposed element', () => {
      component.onDisposeToast(0);

      expect(component.toasts.length).toBe(0);
    });
  });
});
