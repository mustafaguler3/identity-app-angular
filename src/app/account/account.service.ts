import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(model: Register) {
    return this.http.post(this.baseUrl+"account/register",model)
  }
}
