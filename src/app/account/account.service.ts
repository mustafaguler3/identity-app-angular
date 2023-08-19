import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Register } from '../models/register';
import { Login } from '../models/login';
import { User } from '../models/user';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(model: Login){
    return this.http.post<User>(this.baseUrl+"account/login",model).pipe(
      map((user:User) => {
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  register(model: Register) {
    return this.http.post(this.baseUrl+"account/register",model)
  }

  private setUser(user:User){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.userSource.next(user)

    this.user$.subscribe({
      next: response => {
        console.log(response)
      }
    })
  }
}
