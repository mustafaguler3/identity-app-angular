import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../account/account.service';
import { SharedService } from './shared.service';
import { Observable, map } from 'rxjs';
import { User } from '../models/account/user';

export class AuthorizationGuard implements CanActivate{

  constructor(private accountService:AccountService,
              private sharedService:SharedService,
              private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user:User | any) => {
        if(user){
          return true;
        }else {
          this.sharedService.showModification(false,"Restricred Area","Leave from here");
          this.router.navigate(["account/login"],{queryParams:{returnUrl: state.url}});

          return false;
        }
      })
    )
  }
}
