import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CardComponent } from './components/card/card.component';
import { ImageLinkComponent } from './components/image-link/image-link.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ProfileBadgeComponent } from './components/profile-badge/profile-badge.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { UiInputsModule, UiToastModule } from '@angular-mfe-example/ui';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AUTH_STRATEGY, JwtTokenStrategy, TokenInterceptor, authStrategyProvider } from '@angular-mfe-example/auth';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactsComponent,
    CardComponent,
    ImageLinkComponent,
    NavbarComponent,
    ProfileBadgeComponent,
    LoginComponent,
    AppWrapperComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
    FontAwesomeModule,
    UiInputsModule,
    UiToastModule
  ],
  providers: [
    // FIXME get strategy from configuration
    {
      provide: AUTH_STRATEGY,
      useFactory: () => new JwtTokenStrategy()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
}
