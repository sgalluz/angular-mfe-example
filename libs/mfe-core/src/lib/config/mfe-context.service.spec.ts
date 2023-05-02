import { TestBed } from '@angular/core/testing';
import { MfeContextConfigService, MfeConfigService } from './mfe-context.service';

describe('MfeConfigService', () => {

  let service: MfeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MfeConfigService,
        {
          provide: MfeContextConfigService,
          useValue: { uuid: 'test', routePath: 'test/' }
        }
      ]
    });

    service = TestBed.inject(MfeConfigService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  describe('when asking for a config', () => {
    it('should return UUID', () => expect(service.uuid).toEqual('test'));

    it('should return route path', () => expect(service.routePath).toEqual('test/'));

    it('should return "isMfeModule" flag set to true', () => expect(service.isMfeModule()).toBeTruthy());
  })
});
