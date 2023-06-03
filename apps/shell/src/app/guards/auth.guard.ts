import { AuthenticationService } from "@angular-mfe-example/auth";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, map, tap } from "rxjs";

export const authGuard: CanActivateFn =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const router = inject(Router);
    return inject(AuthenticationService)
      .isAuthenticated$()
      .pipe(
        catchError(() => router.navigate(['login']).then()),
        tap((value) => !value && router.navigate(['login']).then()),
        map(value => !!value)
    );
  }