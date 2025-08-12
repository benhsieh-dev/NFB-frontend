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
      features: {
        registration: true
      }, 
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

  loginDemoUser() {
    // Auto-fill demo credentials and submit the form
    setTimeout(() => {
      const usernameField = document.querySelector('[name="username"]') as HTMLInputElement;
      const passwordField = document.querySelector('[name="password"]') as HTMLInputElement;
      const submitButton = document.querySelector('[type="submit"]') as HTMLButtonElement;
      
      if (usernameField && passwordField && submitButton) {
        // Fill in the demo credentials
        usernameField.value = 'bqh5026@gmail.com';
        passwordField.value = 'OktaTesting123';
        
        // Trigger input events to ensure Okta widget recognizes the values
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Auto-submit the form after a brief delay
        setTimeout(() => {
          submitButton.click();
        }, 100);
      } else {
        alert('Login form not ready. Please wait a moment and try again.');
      }
    }, 500);
  }

  }


