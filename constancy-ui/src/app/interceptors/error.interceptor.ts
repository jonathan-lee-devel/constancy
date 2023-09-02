import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, EMPTY, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ModalService} from '../services/modal/modal.service';
import {LoadingService} from '../services/loading/loading.service';
import {RoutePaths} from '../app-routing.module';
import {HttpStatus} from '../common/enums/HttpStatus';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth/auth.service';
import {RouterInfoService} from '../services/router-info/router-info.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private authService: AuthService,
              private modalService: ModalService,
              private loadingService: LoadingService,
              private routerInfoService: RouterInfoService,
  ) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request)
        .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<HttpEvent<unknown>> {
    this.loadingService.onAllLoadingFinished();
    if (error.status === 0) {
      window.location.href = environment.API_URL;
    }

    if (error.url?.endsWith('/oauth2/authorization/keycloak')) {
      if (!(!this.routerInfoService.getPreviousUrl() && this.router.url === '/')) { // If the user was not logged in
        this.authService.onSuccessfulLogout();
      }
      return EMPTY; // Do nothing if the user is a first-time user viewing the landing page
    }

    if (error.status === HttpStatus.BAD_REQUEST) {
      if (error.error.status) {
        let message: string;
        switch (error.error.status) {
          case 'INVALID_TOKEN':
            message = 'An invalid token has been provided';
            break;
          case 'EMAIL_VERIFICATION_EXPIRED':
            message = 'E-mail verification has expired, you will need to resubmit your request';
            break;
          default:
            message = 'An unknown error has occurred';
        }
        this.modalService.showDefaultModal('Request Error', message);
      } else {
        this.modalService.showDefaultModal('Request Error', JSON.stringify(error.error.errors[0].msg));
      }
    }

    if (error.status === HttpStatus.UNAUTHORIZED) {
      this.authService.onSuccessfulLogout();
      this.modalService.showDefaultModal('Authentication Error', 'Invalid Login Credentials');
      this.router.navigate([`/${RoutePaths.LANDING_PAGE}`]).catch((reason) => window.alert(reason));
    }

    if (error.status === HttpStatus.FORBIDDEN) {
      this.modalService.showDefaultModal('Authorization Error', 'Access to that resource or action is denied');
    }

    if (error.status === HttpStatus.NOT_FOUND) {
      this.router.navigate([`/${RoutePaths.ERROR_NOT_FOUND}`]).catch((reason) => window.alert(reason));
    }

    if (error.status === HttpStatus.CONFLICT) {
      this.modalService.showDefaultModal('Request Conflict', 'That entity already exists, cannot perform request');
    }

    if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.router.navigate([`/${RoutePaths.SERVER_ERROR}`]).catch((reason) => window.alert(reason));
    }

    throw error;
  }
}
