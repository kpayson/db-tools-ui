import { NgModule } from '@angular/core';
import { AuthInterceptor, AuthModule, LogLevel, OpenIdConfiguration, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const httpLoaderFactory = (configService: ConfigService) => {
  // const config$ = httpClient.get<any>(CONF_FILE_PATH).pipe(
    const config$ = configService.getConfig$().pipe(
    map((conf: any) => {
      console.log('conf: %O', conf);
      const authConfig: OpenIdConfiguration = {
        authority: conf.authority,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: conf.clientId,
        scope: conf.scopes || 'openid profile offline_access email groups',
        responseType: conf.responseType || 'code',
        // TODO - fix refresh token usage
        // silentRenew: true,
        // useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: conf.renewTimeBeforeTokenExpiresInSeconds || 30,
        logLevel: LogLevel.Debug,
        forbiddenRoute: conf.forbiddenRoute || '/access-denied',
        unauthorizedRoute: conf.unauthorizedRoute || '/?error=Unauthorized',
        secureRoutes: conf.secureRoutes || [],
      };
      return authConfig;
    })
  );

  return new StsConfigHttpLoader(config$);
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: httpLoaderFactory,
        deps: [ConfigService],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // ...
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}