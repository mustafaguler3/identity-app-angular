import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form: any;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private sharedService:SharedService,
              private router:Router){
              }

  ngOnInit(): void {
      this.initializeForm()
  }

  initializeForm(){
    this.form = this.fb.group({
      firstName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email:["",[Validators.required,Validators.pattern("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")]],
      password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]]
    })
  }

  get fc(){
    return this.form.controls
  }

  register(){
    this.submitted = true;
    this.errorMessages = [];

    if(this.form.valid){
      this.accountService.register(this.form.value).subscribe({
        next: (response:any) => {
          this.sharedService.showModification(true,response.value.title,response.value.message)
          this.router.navigateByUrl("/account/login")
        },
        error: error => {
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
