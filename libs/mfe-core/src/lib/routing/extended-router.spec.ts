import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ExtendedRouter } from './extended-router';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('ExtendedRouter', () => {

  let service: ExtendedRouter;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });

    service = TestBed.inject(ExtendedRouter);
    router = TestBed.inject(Router);
  });

  it('should be created', () => expect(service).toBeTruthy());

  describe('when is called asMicroFrontend() method with no value', () => {
    it('should update value of "_basePath" BehaviorSubject with root value', () => {
      jest.spyOn((service as any)._basePath, 'next');

      service.asMicroFrontend();

      expect((service as any)._basePath.value).toEqual('/');
      expect((service as any)._basePath.next).toHaveBeenCalled();
    });
  });

  describe('when is called navigateTo() method', () => {
    it.skip('should prepend "_basePath" value to child path', () => {
      (service as any)._basePath.next('test-base');
      jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
      jest.spyOn(router, 'parseUrl');

      service.navigateTo('test-child');

      expect(router.parseUrl).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should handle URL as UrlTree instance correctly', () => {
      (service as any)._basePath.next('/');
      jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
      jest.spyOn(router, 'parseUrl');

      const urlTree = new UrlTree();
      urlTree.root = {
        segments: [
          { path: '/', parameters: {} },
          { path: 'test-child', parameters: {} }
        ]
      } as UrlSegmentGroup;

      service.navigateTo(of(urlTree));

      expect(router.navigateByUrl).toHaveBeenCalled();
    });
  });

  describe('when called buildUrlTree()', () => {
    it('should return a stream of UrlTree', () => {
      (service as any)._basePath.next('base-path');

      const actual = service.buildUrlTree('test');

      expect(actual).toBeInstanceOf(Observable<UrlTree>);
    });

    it('should return an instance of UrlTree', () => {
      (service as any)._basePath.next('/');

      const actual = service.buildUrlTree('test');

      expect(actual).toBeInstanceOf(UrlTree);
    });
  });
});
