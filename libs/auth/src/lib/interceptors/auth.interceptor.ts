import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, Subject, buffer, catchError, concatMap, exhaustMap, from, iif, mergeMap, of, switchMap, tap, throwError } from "rxjs";
import { AuthenticationService } from "../services";
import { AUTH_STRATEGY, AuthStrategy } from "../providers";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private requests = new Subject<[HttpRequest<any>, HttpHandler]>();
    private requests$ = this.requests.asObservable();

    private isRefreshingToken = new BehaviorSubject<boolean>(false);

    constructor(private readonly _authenticator: AuthenticationService,
                @Inject(AUTH_STRATEGY) private readonly authStrategy: AuthStrategy<any>,
                private readonly _router: Router) {
        this.requests$
            .pipe(
                buffer(this.isRefreshingToken),
                switchMap(value => from(value)),
                mergeMap(([request, next]) => next.handle(this.enrichRequestWithToken(request)))
            )
            .subscribe();
    }

    intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> =>
        next.handle(this.enrichRequestWithToken(request))
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    iif(
                        () => this.isAuthTokenRequest(request) || !this.isUnauthorized(error),
                        throwError(() => error),
                        this.handleUnauthorized(request, next)
                    )
                )
            );

    private handleUnauthorized = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        return iif(
            () => this.isRefreshingToken.getValue(),
            this.enqueueRequest(request, next),
            this.processRequestQueue(request, next)
        );
    }

    private processRequestQueue = (request: HttpRequest<any>, next: HttpHandler) =>
        of(request).pipe(
            tap(() => this.isRefreshingToken.next(true)),
            exhaustMap(() => this._authenticator.refresh()
                .pipe(
                    catchError(error => {
                        this.redirectToLogin();
                        return throwError(() => error);
                    }),
                    switchMap(() => next.handle(this.enrichRequestWithToken(request))),
                    tap(() => this.isRefreshingToken.next(false))
                )
            )
        );

    // TODO: understand how to wait processing of current enqueuable request
    private enqueueRequest = (request: HttpRequest<any>, next: HttpHandler) =>
        of(request).pipe(
            tap(() => this.requests.next([request, next])),
            concatMap(() => EMPTY)
        );

    private enrichRequestWithToken = (req: HttpRequest<any>) =>
        req.clone({
            setHeaders: { Authorization: `Bearer ${this.authStrategy.getAuthToken()}` }
        });

    private redirectToLogin = () => this._router.navigate(['login']).then();

    private isAuthTokenRequest = (request: HttpRequest<any>): boolean =>
        request.url?.endsWith('/auth/token') || request.url?.endsWith('/auth/token/refresh');

    private isUnauthorized = (error: HttpErrorResponse): boolean => error.status === 401;

}
