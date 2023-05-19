import { AuthenticationService } from "@angular-mfe-example/auth";
import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { logoutGuard } from "./logout.guard";

describe('LogoutGuard', () => {

    let authenticator: AuthenticationService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: {
                        logout: jest.fn
                    }
                }
            ]
        });

        router = TestBed.inject(Router);
        authenticator = TestBed.inject(AuthenticationService);
    });

    describe('when logoutGuard is called', () => {
        const route: ActivatedRouteSnapshot = { } as ActivatedRouteSnapshot;
        const state: RouterStateSnapshot = { } as RouterStateSnapshot;

        it('should destroy user session and redirect to login page', () => {
            jest.spyOn(authenticator, 'logout');
            jest.spyOn(router, 'navigate').mockResolvedValue(true);

            const actual = TestBed.runInInjectionContext(() => logoutGuard(route, state));

            expect(actual).toBeTruthy();
            expect(authenticator.logout).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['login']);
        });
    });
});