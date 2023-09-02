import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from '../../dtos/auth/UserDto';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {RoutePaths} from '../../app-routing.module';
import {ModalService} from '../modal/modal.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth service used to authenticate users.
 * @author jonathanlee <jonathan.lee.devel@gmail.com>
 */
export class AuthService {
  public static readonly DEFAULT_USER: UserDto = {
    id: 'user@mail.com',
    firstName: 'Anonymous',
    lastName: 'Anonymous',
  };
  private static readonly USER_DATA_KEY: string = 'userInfo';
  private static readonly LOGOUT_REDIRECT_KEY: string = 'logoutRedirect';

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() userInfo: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  /**
   * Standard constructor
   * @param {Router} router used to route accordingly
   * @param {ProfileService} profileService used to obtain user data on Google sign-in
   * @param {ModalService} modalService used to display messages to the user
   */
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private modalService: ModalService,
  ) {
  }

  public getCurrentUserInfo(): UserDto {
    const userData = sessionStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      return JSON.parse(userData);
    }

    return (userData) ? JSON.parse(userData) : AuthService.DEFAULT_USER;
  }

  /**
   * Used to determine if a user is authenticated.
   * @return {Observable} boolean indicating if user is authenticated
   */
  public isAuthenticated(): boolean {
    const userData = sessionStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData) {
        return true;
      }
    }
    return false;
  }

  /**
   * Allow for subscription to isLoggedIn event emitter.
   * @return {Observable<boolean>} observable for isLoggedIn event emitter
   */
  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
  }

  /**
   * Sets user info to a JSON-stringified version of parameter passed.
   * @param {UserDto} userInfo user info to be set
   */
  setUserInfo(userInfo: UserDto): void {
    sessionStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  /**
   * Deletes user info from local storage.
   */
  deleteUserInfo(): void {
    sessionStorage.removeItem(AuthService.USER_DATA_KEY);
  }

  doLogin(): void {
    sessionStorage.setItem(AuthService.LOGOUT_REDIRECT_KEY, String(false));
    window.location.href = environment.GATEWAY_API_RAW_URL;
  }

  /**
   * Logs out from backend.
   */
  doLogout(): void {
    this.deleteUserInfo();
    this.isLoggedIn.next(false);
    this.userInfo.next(AuthService.DEFAULT_USER);
    sessionStorage.setItem(AuthService.LOGOUT_REDIRECT_KEY, String(true));
    window.location.href = `${environment.GATEWAY_API_RAW_URL}/logout`;
  }

  onSuccessfulLogout() {
    this.deleteUserInfo();
    this.isLoggedIn.next(false);
    this.userInfo.next(AuthService.DEFAULT_USER);
    sessionStorage.setItem(AuthService.LOGOUT_REDIRECT_KEY, String(false));
    window.location.href = `${environment.GATEWAY_API_RAW_URL}/`;
  }

  checkKeycloakLoginStatus() {
    this.profileService.getUserInfo().subscribe((userInfo) => {
      if (sessionStorage.getItem(AuthService.LOGOUT_REDIRECT_KEY) === String(true)) {
        this.modalService.showDefaultModal('Security Warning', 'You were redirected to the logout page but are still logged in');
      }
      this.onSuccessfulLogin(userInfo);
    });
  }

  private onSuccessfulLogin(userInfo: UserDto, reRoute?: boolean) {
    this.setUserInfo(userInfo);
    this.isLoggedIn.next(true);
    this.userInfo.next(userInfo);
    if (reRoute) {
      this.router.navigate([`/${RoutePaths.DASHBOARD}`]).catch((reason) => window.alert(reason));
    }
  }

  onSuccessfulKeycloakLogin() {
    this.profileService.getUserInfo().subscribe((userInfo) => {
      this.onSuccessfulLogin(userInfo, true);
    });
  }
}
