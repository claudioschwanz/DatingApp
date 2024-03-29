import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from 'os';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + '/account/login', model).pipe(
      map( ( response: any ) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');     
    this.currentUserSource.next(null!);
  }
  register(model: any){
    return this.http.post<User>(this.baseUrl+'/account/register', model).pipe(
      map( (user: User) => {
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }
}
