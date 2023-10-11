import { Injectable } from '@angular/core';
import {
  AuthenticatedResult,
  OidcSecurityService,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData: any;
  public get userData(): any {
    return this._userData;
  }

  private _userName: string = '';
  public get userName(): string {
    return this._userName;
  }

  private _isAuthenticated: boolean = false;
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  constructor(public oidcSecurityService: OidcSecurityService) {
    console.debug('AuthService STARTING');
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData }) => {
        this._isAuthenticated = isAuthenticated;
        this._userData = userData;
        this._userName = userData?.name || userData?.email || '';
        console.debug('AppComponent - authenticated: ', isAuthenticated);
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  getAccessToken(): Observable<string> {
    return this.oidcSecurityService.getAccessToken();
  }

  refreshSession() {
    this.oidcSecurityService
      .forceRefreshSession()
      .subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService
      .revokeRefreshToken()
      .subscribe((result) => console.log('clear session: %O', result));
  }

  revokeAccessToken() {
    this.oidcSecurityService
      .revokeAccessToken()
      .subscribe((result) => console.log(result));
  }

  isAuthenticated$(): Observable<AuthenticatedResult> {
    return this.oidcSecurityService.isAuthenticated$;
  }

}