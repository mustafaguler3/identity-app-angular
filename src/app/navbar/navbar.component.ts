import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  collapse = true;

  constructor(public accountService:AccountService){}

  toggleCollapsed(){
    this.collapse = !this.collapse
  }

  logout(){
    this.accountService.logout()
  }
}
