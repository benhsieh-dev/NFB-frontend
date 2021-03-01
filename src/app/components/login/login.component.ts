import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any; // OktaSignIn error

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

    ngOnInit() {
      this.oktaSignin.remove(); // this.oktaSignIn error

      this.oktaSignin.renderEl({ // this.oktaSignIn error
        el: '#okta-sign-in-widget'},
        (response: { status: string; }) => {
          if (response.status === 'SUCCESS') { // 'success' error
            this.oktaAuthService.signInWithRedirect();
          }
        },
        (error: any) => {
          throw error;
        }
      );
    }

  }


