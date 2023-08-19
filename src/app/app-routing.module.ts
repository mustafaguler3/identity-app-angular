import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"play",component:PlayComponent},
  // implementing lazy loading by the following format
  {path:"account",loadChildren : () => import('./account/account.module').then(m => m.AccountModule)},
  {path:"not-found",component:NotFoundComponent},
  {path:"**",component:NotFoundComponent,pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
