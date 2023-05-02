import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { MfeConfig } from './mfe-config.model';

export const MfeContextConfigService = new InjectionToken<MfeConfig>('MfeContextConfig');

@Injectable()
export class MfeConfigService {

  private static _config: MfeConfig;

  constructor(@Optional() @Inject(MfeContextConfigService) private config: MfeConfig) {
    MfeConfigService._config = config;
  }

  get uuid() {
    return MfeConfigService._config?.uuid;
  }

  get routePath() {
    return MfeConfigService._config?.routePath;
  }

  isMfeModule = (): boolean => !!MfeConfigService._config;

}
