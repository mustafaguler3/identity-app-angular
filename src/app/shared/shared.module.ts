import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessageComponent } from './components/errors/validation-message/validation-message.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NotificationComponent } from './components/modals/notification/notification.component'
import { ModalModule } from "ngx-bootstrap/modal"

@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessageComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
