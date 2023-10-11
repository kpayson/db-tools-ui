import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';

const CONF_FILE_PATH = 'assets/config.json';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {}

  getConfig$(): Observable<any> {
    let config$ = this.httpClient.get<any>(CONF_FILE_PATH).pipe(
      map((conf: any) => {
        return {
          authority: conf.auth.authority,
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: conf.auth.clientId,
          scope:
            conf.auth.scopes || 'openid profile offline_access email groups',
          responseType: conf.auth.responseType || 'code',
          renewTimeBeforeTokenExpiresInSeconds:
            conf.auth.renewTimeBeforeTokenExpiresInSeconds || 30,
          forbiddenRoute: conf.auth.forbiddenRoute || '/access-denied',
          unauthorizedRoute:
            conf.auth.unauthorizedRoute || '/?error=Unauthorized',
          apiBaseUrl: conf.auth.apiBaseUrl,
          tenant: conf.auth.tenant,
          secureRoutes: conf.auth.secureRoutes || [],
        };
      })
    );
    return config$;
  }

  conf: any | undefined = undefined;
  async getConfig(): Promise<any> {
    if (!this.conf) {
      this.conf = firstValueFrom(this.getConfig$());
    }
    return this.conf;
  }

}