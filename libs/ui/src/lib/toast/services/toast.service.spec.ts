import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastSeverity } from '../models/toast.model';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when is added new toast', () => {
    beforeEach(() => jest.spyOn((service as any), 'showToast'));

    it('should update toast subject with "success" severity', () => {
      const severity = 'success';
      const expected = mockToast(severity);
      const { title, message } = expected;

      service.success(title, message);

      expect((service as any).showToast).toHaveBeenCalledWith(severity, title, message);
    });

    it('should update toast subject with "info" severity', () => {
      const severity = 'info';
      const expected = mockToast(severity);
      const { title, message } = expected;

      service.info(title, message);

      expect((service as any).showToast).toHaveBeenCalledWith(severity, title, message);
    });

    it('should update toast subject with "warning" severity', () => {
      const severity = 'warning';
      const expected = mockToast(severity);
      const { title, message } = expected;

      service.warning(title, message);

      expect((service as any).showToast).toHaveBeenCalledWith(severity, title, message);
    });

    it('should update toast subject with "error" severity', () => {
      const severity = 'error';
      const expected = mockToast(severity);
      const { title, message } = expected;

      service.error(title, message);

      expect((service as any).showToast).toHaveBeenCalledWith(severity, title, message);
    });
  });

  const mockToast = (severity: ToastSeverity) => ({
    title: 'a title',
    message: 'a message',
    severity
  });
});
