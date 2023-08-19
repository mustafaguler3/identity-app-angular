import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Register } from '../models/register';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(model: Login){
    return this.http.post(this.baseUrl+"account/login",model);
  }

  register(model: Register) {
    return this.http.post(this.baseUrl+"account/register",model)
  }
}
