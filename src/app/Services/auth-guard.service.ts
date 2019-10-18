import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.user.pipe(
      map(
        (userConfirm => {
          if (userConfirm)
            return true;

          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        })
      )
    )
  }
}