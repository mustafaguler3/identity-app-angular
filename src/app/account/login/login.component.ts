import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/account/login';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  form: any | FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | any;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });


    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user:User | null) => {
        if(user){
          this.router.navigateByUrl("/")
        }else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (param:any) => {
              if(param) {
                this.returnUrl = param.get("returnUrl")
              }
            }
          })
        }
      }
    })
  }

  ngOnInit(): void 
  {
  }

  get fc(){
    return this.form.controls
  }

  login(){
    this.submitted = true;
    this.errorMessages = [];

    if(this.form.valid){
      this.accountService.login(this.form.value).subscribe({
        next: (response:any) => {
          if(this.returnUrl){
            this.router.navigateByUrl(this.returnUrl)
          }else {
            this.router.navigateByUrl("/")
          }
          //this.sharedService.showModification(true,response.value.title,response.value.message)
          
        },
        error: (error:any)=> {
          console.log(error);
          if(error.error.errors){
            this.errorMessages = error.error.errors;
          }else {
            this.errorMessages.push(error.error)
          }
          
        }
      }
      )
    }
  }
}
