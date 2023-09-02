import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {ServerErrorComponent} from './components/pages/error/server-error/server-error.component';
import {ManageAccountComponent} from './components/pages/manage-account/manage-account.component';
import {ErrorNotFoundComponent} from './components/pages/error/error-not-found/error-not-found.component';
import {
  KeycloakLoginSuccessComponent,
} from './components/pages/keycloak-login-success/keycloak-login-success.component';

export enum RoutePaths {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  /* ERROR ROUTES */
  SERVER_ERROR = 'error/server-error',
  ERROR_NOT_FOUND = 'error/not-found',
  /* LOGIN/LOGOUT ROUTES */
  KEYCLOAK_LOGIN_SUCCESS = 'keycloak-login-success',
  /* DASHBOARD ROUTES */
  DASHBOARD = 'dashboard',
  /* ACCOUNT ROUTES */
  ACCOUNT_MANAGE = 'account/manage',
}

const routes: Routes = [
  /* ANONYMOUS ROUTES */
  {path: RoutePaths.LANDING_PAGE, component: LandingPageComponent},
  /* ERROR ROUTES */
  {path: RoutePaths.SERVER_ERROR, component: ServerErrorComponent},
  {path: RoutePaths.ERROR_NOT_FOUND, component: ErrorNotFoundComponent},
  /* LOGIN/LOGOUT ROUTES */
  {path: RoutePaths.KEYCLOAK_LOGIN_SUCCESS, component: KeycloakLoginSuccessComponent},
  /* DASHBOARD ROUTES */
  {path: RoutePaths.DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard]},
  /* ACCOUNT ROUTES */
  {path: RoutePaths.ACCOUNT_MANAGE, component: ManageAccountComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Default generated app routing module.
 */
export class AppRoutingModule { }
