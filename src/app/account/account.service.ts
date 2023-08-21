import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Login } from '../models/account/login';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../models/account/confirmEmail';
import { Register } from '../models/account/register';
import { User } from '../models/account/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router:Router) { }


  confirmEmail(model: ConfirmEmail){
    return this.http.put(environment.apiUrl+"account/confirm-email",model);
  }

  login(model: Login){
    return this.http.post<User>(this.baseUrl+"account/login",model).pipe(
      map((user:User) => {
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl("account/login")
  }

  refreshUser(jwt:string | null){
    if(jwt === null){
      this.userSource.next(null);
      return of(undefined)
    }

    let headers = new HttpHeaders();
    headers = headers.set("Authorization","Bearer "+jwt);

    return this.http.get<User>(this.baseUrl+"account/refresh-user-token",{headers:headers}).pipe(
      map((user:User)=>{
        if(user){
          this.setUser(user)
        }
      })
    )
  }

  getJWT(){
    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user: User = JSON.parse(key);

      return user.jwt;
    }else {
      return null;
    }
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
