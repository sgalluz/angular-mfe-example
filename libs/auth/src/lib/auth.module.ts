import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AuthModule {}

export * from './interceptors';
export * from './models';
export * from './services';
export * from './providers';