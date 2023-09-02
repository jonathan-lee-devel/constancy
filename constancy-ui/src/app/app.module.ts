import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {CookieService} from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {NgOptimizedImage} from '@angular/common';
import {CookiesNoticeModalComponent} from './components/modals/cookies-notice-modal/cookies-notice-modal.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {DefaultModalComponent} from './components/modals/default-modal/default-modal.component';
import {ServerErrorComponent} from './components/pages/error/server-error/server-error.component';
import {PopupModalComponent} from './components/modals/popup-modal/popup-modal.component';
import {ManageAccountComponent} from './components/pages/manage-account/manage-account.component';
import {ErrorNotFoundComponent} from './components/pages/error/error-not-found/error-not-found.component';
import {KeycloakLoginSuccessComponent} from './components/pages/keycloak-login-success/keycloak-login-success.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    DashboardComponent,
    CookiesNoticeModalComponent,
    DefaultModalComponent,
    LoadingSpinnerComponent,
    ServerErrorComponent,
    PopupModalComponent,
    ManageAccountComponent,
    ErrorNotFoundComponent,
    KeycloakLoginSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    CookieService,
  ],
})
/**
 * Default generated app module.
 */
export class AppModule { }
