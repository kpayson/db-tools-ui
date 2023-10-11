import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';

// https://labshare-auth-dev-0.app.cloud.gov/_api/auth/user/selfService/groups
const GROUPS_URL = '/user/selfService/groups';
// https://labshare-auth-dev-0.app.cloud.gov/_api/auth/admin/tenants
const TENANTS_URL = '/admin/tenants';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  config: any | undefined = undefined;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
  ) { }

  async getConfig(): Promise<any> {
    if (!this.config) {
      this.config = await this.configService.getConfig();
    }
    return this.config;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Failed to retrieve data.')
    );
  }

  getUserData$(url: string): Observable<any> {
    let userData$ = this.httpClient
      .get(url)
      .pipe(catchError(this.handleError));
    return userData$;
  }

  async getGroups(): Promise<any> {
    let conf = await this.getConfig();
    return new Promise((resolve) => {
      this.getUserData$(conf.apiBaseUrl + "/auth" + GROUPS_URL).subscribe((data) => {
        console.log('getGroups ()): %O', data);
        resolve(data);
      });
    });
  }

  async getTenants(): Promise<any> {
    let conf = await this.getConfig();
    return new Promise((resolve) => {
      this.getUserData$(conf.apiBaseUrl + TENANTS_URL).subscribe((data) => {
        console.log('getTenants(): %O', data);
        resolve(data);
      });
    });
  }

}