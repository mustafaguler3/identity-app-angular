import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { SharedService } from '../shared.service';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/account/user';
import jwt_decode from 'jwt-decode';

export class AdminGuard implements CanActivate{

  constructor(private accountService:AccountService,
              private sharedService: SharedService,
              private router: Router){}

  canActivate():Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if(user) {
          const decodedToken: any = jwt_decode(user.jwt);
          if(decodedToken.role.includes('Admin')){
            return true
          }
        }

        this.sharedService.showModification(false,"Admin Area","Leave now!");
        this.router.navigateByUrl("/")
        return false;
      })
    )
  }



}
