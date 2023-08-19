import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form: any | FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private sharedService:SharedService,
              private router:Router){
                this.form = this.fb.group({
                  firstName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
                  lastName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
                  email:["",[Validators.required,Validators.pattern("")]],
                  password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]]
                })

                this.accountService.user$.pipe(take(1)).subscribe({
                  next: (user:User | null) => {
                    if(user){
                      this.router.navigateByUrl("/");
                    }
                  }
                })
                
  }

  ngOnInit(): void {
  }

  initializeForm(){
   
  }

  get fc(){
    return this.form.controls
  }

  register(){
    this.submitted = true;
    this.errorMessages = [];

    //if(this.form.valid){
      this.accountService.register(this.form.value).subscribe({
        next: (response:any) => {
          this.sharedService.showModification(true,response.value.title,response.value.message)
          this.router.navigateByUrl("account/login")
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
    //}
  }


}
