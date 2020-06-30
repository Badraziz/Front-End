import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private AddUserURL = 'http://localhost:8080/Users/AddUser';
  private GetUserByIdURL = 'http://localhost:8080/Users/GetUser/';

  constructor(private http: HttpClient) {
  }

  addUser(user): Observable<User> {
    return this.http.post<User>(this.AddUserURL, user);
  }

  getUserByID(userID: number): Observable<User> {
    return this.http.get<User>(this.GetUserByIdURL + userID);
  }
}
