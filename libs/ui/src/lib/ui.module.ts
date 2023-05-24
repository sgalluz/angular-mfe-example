import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiInputsModule } from './input/module';
import { UiToastModule } from './toast/module';

@NgModule({
  imports: [
    CommonModule,
    UiInputsModule,
    UiToastModule
  ],
  exports: [
    UiInputsModule,
    UiToastModule
  ]
})
export class UiModule { }

export * from './input/module';
export * from './toast/module';
