import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError, iif, switchMap, throwError } from "rxjs";
import { AuthenticationService } from "../services";
import { AUTH_STRATEGY, AuthStrategy } from "../providers";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    tokenRefresh = false;

    constructor(private readonly _authenticator: AuthenticationService,
                @Inject(AUTH_STRATEGY) private readonly authStrategy: AuthStrategy<any>,
                private readonly _router: Router) {}

    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> =>
        next.handle(this.enrichRequestWithToken(req)).pipe(
            catchError((error: HttpErrorResponse) =>
                iif(
                    () => this.isAuthTokenRequest(req) || !this.isUnauthorized(error),
                    throwError(() => error),
                    this.handleUnauthorized(req, next)
                )
            )
        );

    private handleUnauthorized = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        // TODO buffer all pending requests
        if (this.tokenRefresh) {
            return next.handle(this.enrichRequestWithToken(request));
        }

        this.tokenRefresh = true;
        return this._authenticator.refresh()
            .pipe(
                catchError(error => {
                    this.redirectToLogin();
                    return throwError(() => error);
                }),
                switchMap(() => {
                    this.tokenRefresh = false;
                    return next.handle(this.enrichRequestWithToken(request));
                })
            );
    }

    private enrichRequestWithToken = (req: HttpRequest<any>) =>
        req.clone({
            setHeaders: { Authorization: `Bearer ${this.authStrategy.getAuthToken()}` }
        });

    private redirectToLogin = () => this._router.navigate(['login']).then();

    private isAuthTokenRequest = (request: HttpRequest<any>): boolean =>
        request.url?.endsWith('/auth/token') || request.url?.endsWith('/auth/token/refresh');

    private isUnauthorized = (error: HttpErrorResponse): boolean => error.status === 401
}
