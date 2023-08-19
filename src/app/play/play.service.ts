import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http:HttpClient) { }

  getPlayers(){
    return this.http.get(environment.apiUrl+"play/get-players")
  }
}
