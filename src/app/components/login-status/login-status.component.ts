import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      console.log(`User authentication status: ${this.isAuthenticated}`);
      console.log(`Username: ${this.userFullName}`);
      this.getUserDetails();
    });
    
    // Also check current authentication status
    this.oktaAuthService.isAuthenticated().then((isAuth) => {
      this.isAuthenticated = isAuth;
      console.log(`Initial auth check: ${this.isAuthenticated}`);
      if (isAuth) {
        this.getUserDetails();
      }
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then((res) => {
        this.userFullName = res.name;

        const theEmail = res.email; 

        this.storage.setItem('userEmail', JSON.stringify(theEmail)); 
        console.log(res);
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }
}
