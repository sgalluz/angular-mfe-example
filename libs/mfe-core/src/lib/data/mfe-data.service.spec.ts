import { TestBed } from '@angular/core/testing';

import { MfeDataService } from './mfe-data.service';

describe('MfeDataService', () => {

  let service: MfeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfeDataService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  describe('when get sharedData', () => {
    it('should return an empty map', () => {
      const sharedData = service.getSharedMap();

      expect(sharedData).toBeDefined();
      expect(sharedData.keys().size).toEqual(0);
      expect(sharedData.all().size).toEqual(0);
    });
  });
});
