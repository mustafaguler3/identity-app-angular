import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/models/account/user';
import { ConfirmEmail } from 'src/app/models/account/confirmEmail';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit{

  success = true;

  constructor(private accountService:AccountService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private sharedService:SharedService){}

  resendEmailConfirmationLink(){
    
  }

  ngOnInit(): void {
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user:User | null) => {
          if(user) {
            this.router.navigateByUrl("/")
          }else {
            this.activatedRoute.queryParamMap.subscribe({
              next: (params:any) => {
                const confirmEmail: ConfirmEmail = {
                  token: params.get("token"),
                  email: params.get("email")
                }

                this.accountService.confirmEmail(confirmEmail).subscribe({
                  next: (response:any)=> {
                    this.sharedService.showModification(true,response.value.title,response.value.message);
                  },
                  error : error => {
                    this.success = false;
                    this.sharedService.showModification(false,"failed",error.error)
                  }
                });
              }
            })
          }
        }
      })
  }

  resendEmailConfirmationLink(){
    this.router.navigateByUrl("account/send-email/resend-email-confirmation-link");
  }


}
