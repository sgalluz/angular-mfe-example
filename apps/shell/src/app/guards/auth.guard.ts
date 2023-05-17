import { AuthenticationService } from "@angular-mfe-example/auth";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authenticator = inject(AuthenticationService);
    const isAuthenticated = authenticator.isAuthenticated();
    if (!isAuthenticated) {
        // track last requested route...
        return inject(Router).navigate(['login']).then();
    }
    return isAuthenticated;
};