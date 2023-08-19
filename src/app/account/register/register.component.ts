import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form: any;
  submitted = false;
  errorMessage: string[] = [];

  constructor(private accountService: AccountService,
              private fb: FormBuilder){
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
    this.errorMessage = [];

    if(this.form.valid){
      this.accountService.register(this.form.value).subscribe({
        next: response => {
          
        },
        error: error => {
          console.log(error);
        }
      }
      )
    }
  }


}
