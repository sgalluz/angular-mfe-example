import { NgModule } from '@angular/core';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { CommonModule } from '@angular/common';
import {
    FaIconLibrary,
    FontAwesomeModule,
  } from '@fortawesome/angular-fontawesome';
  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { fab } from '@fortawesome/free-brands-svg-icons';

  @NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        ToastComponent,
        ToasterComponent
    ],
    exports: [
        ToastComponent,
        ToasterComponent
    ]
})
export class UiToastModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab);
      }
}

export * from './components/toast/toast.component';
export * from './components/toaster/toaster.component';
export * from './services/toast.service';