import { AuthenticationService } from "@angular-mfe-example/auth";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logoutGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    inject(AuthenticationService).logout();
    inject(Router).navigate(['login']).then();
    return true;
};