import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'identity-app';

  constructor(private accountService:AccountService,
              private sharedService:SharedService){}

  ngOnInit(): void {
      this.refreshToken()
  }

  private refreshToken(){
    const jwt=this.accountService.getJWT();
    if(jwt){
      this.accountService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: err => {
          this.accountService.logout();

          if(err.status === 401){
            this.sharedService.showModification(false,"Account blocked",err.error)
          }
          
        }
      })
    }else {
      this.accountService.refreshUser(null).subscribe();
    }
  }


}
