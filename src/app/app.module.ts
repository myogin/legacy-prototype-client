import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbIconModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { JwtInterceptorService } from './core/interceptor/jwt-interceptor.service';

@NgModule({
  declarations: [AppComponent, DashboardLayoutComponent, LoginLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    HttpClientModule,
    NbSidebarModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        // NbDummyAuthStrategy.setup({
        //   name: 'email',
        // }),
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,

            key: 'token',
          },

          baseEndpoint: 'http://localhost:8000/api',
          login: {
            // ...
            endpoint: '/login',
            method: 'post',
          },
          logout: {
            // ...
            endpoint: '/logout',
            method: 'post',
          },
          register: {
            // ...
            endpoint: '/api/auth/register',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email', // strategy id key.
          rememberMe: true, // whether to show or not the `rememberMe` checkbox
          showMessages: {
            // show/not show success/error messages
            success: true,
            error: true,
          },
          redirect: {
            success: '/dashboard',
            failure: null,
          },
        },
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
