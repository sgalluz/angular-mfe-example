import { NgModule } from '@angular/core';
import { MfeDataService } from './data';

@NgModule({
  imports: [],
})
export class MfeCoreModule {
  constructor(_: MfeDataService) {
    // Force creating a singleton instance of MfeDataService during module creation
  }
}

export * from './config';
export * from './data';
export * from './events';
export * from './routing';
export * from './mfe-module';
