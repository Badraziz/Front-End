import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private LoginURL = 'http://localhost:8080/Users/Login';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`));

    return this.http.get<any>(this.LoginURL, { headers })
      .pipe(map(user => {
        // login successful if there's a user in the response
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata = btoa(`${email}:${password}`);
          localStorage.setItem('currentUser', JSON.stringify(user));
          user = JSON.parse(localStorage.getItem('currentUser'));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return true;
    }
  }

  getUserID(): number {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.userID;
      console.log(currentUser.userID);
    }
  }

}




// BASE_PATH: 'http://localhost:8080'
// USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
//
// public username: String;
// public password: String;
//
// constructor(private http: HttpClient) {
//
// }
//
// authenticationService(username: String, password: String) {
//   return this.http.get(`http://localhost:8080/api/v1/basicauth`,
//     { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
//     this.username = username;
//     this.password = password;
//     this.registerSuccessfulLogin(username, password);
//   }));
// }
//
// createBasicAuthToken(username: String, password: String) {
//   return 'Basic ' + window.btoa(username + ":" + password)
// }
//
// registerSuccessfulLogin(username, password) {
//   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
// }
//
// logout() {
//   sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
//   this.username = null;
//   this.password = null;
// }
//
// isUserLoggedIn() {
//   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
//   if (user === null) return false
//   return true
// }
//
// getLoggedInUserName() {
//   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
//   if (user === null) return ''
//   return user
// }
// }
