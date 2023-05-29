import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('when initialize component', () => {
    beforeEach(() => {
      jest.spyOn((component as any), 'onDispose').mockReturnValue(of(true));
      jest.useFakeTimers();
    });

    afterEach(() => jest.useRealTimers());

    it('should call onDispose method after 3500ms', () => {
      fixture.detectChanges();
      jest.advanceTimersByTime(3500);

      expect((component as any).onDispose).toHaveBeenCalledTimes(1);
    });

    it('should not call onDispose method if timer is not enabled', () => {
      (component as any)._timerEnabled.next(false);

      fixture.detectChanges();
      jest.advanceTimersByTime(3500);

      expect((component as any).onDispose).not.toHaveBeenCalled();
    });
  });

  describe('when click on close button', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.spyOn(component.dispose, 'emit').mockImplementationOnce(() => true);
    });

    it('should emit an event for disposing toast', () => {
      component.onClose();
      jest.advanceTimersByTime(500);

      expect((component as any).visible).toBeFalsy();
      expect(component.dispose.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('on mouse over', () => {
    it('should update the subject with value false', () => {
      jest.spyOn((component as any)._timerEnabled, 'next');

      component.onMouseOver();

      expect((component as any)._timerEnabled.next).toHaveBeenCalledWith(false);
      expect((component as any)._timerEnabled.value).toEqual(false);
    });
  });

  describe('on mouse leave', () => {
    it('should update the subject with value true', () => {
      jest.spyOn((component as any)._timerEnabled, 'next');

      component.onMouseLeave();

      expect((component as any)._timerEnabled.next).toHaveBeenCalledWith(true);
      expect((component as any)._timerEnabled.value).toEqual(true);
    });
  });
});
