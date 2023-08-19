import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  form: any | FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });
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

    //if(this.form.valid){
      this.accountService.login(this.form.value).subscribe({
        next: (response:any) => {
          this.sharedService.showModification(true,response.value.title,response.value.message)
          this.router.navigateByUrl("/account/login")
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
    //}
  }
}
