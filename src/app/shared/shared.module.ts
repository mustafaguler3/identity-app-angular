import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessageComponent } from './components/errors/validation-message/validation-message.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
