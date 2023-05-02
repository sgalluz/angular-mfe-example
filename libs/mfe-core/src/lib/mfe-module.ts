import { MfeConfig, MfeConfigService, MfeContextConfigService } from "./config";
import { ExtendedRouter } from "./routing";

export const MFE_MODULE_PROVIDERS = [
    MfeConfigService,
    { provide: MfeContextConfigService, useFactory: () => MfeModule.config }
]

export class MfeModule {

    static config: MfeConfig;
  
    static mfeModule(mfeConfig: MfeConfig): MfeModule {
      this.config = { ...mfeConfig };
      return this;
    }
  
    constructor(router: ExtendedRouter, mfeConfig: MfeConfigService) {
      if (mfeConfig.isMfeModule()) {
        router.asMicroFrontend(mfeConfig.routePath);
      }
    }
}