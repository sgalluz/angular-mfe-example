import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AUTH_STRATEGY, AuthStrategy } from '../providers/auth-strategy.provider';
import { AuthData } from '../models/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authData?: AuthData;

  constructor(
    private readonly _http: HttpClient,
    @Inject(AUTH_STRATEGY) private _auth: AuthStrategy<any>) {}

  login = (user: string, password: string): Observable<boolean> =>
    this._http.post<AuthData>('/api/auth/token', { user, password })
      .pipe(
        switchMap(this._updateAuthData),
        catchError((error) => { throw error })
      );

  isAuthenticated$ = (): Observable<boolean> =>
    this._auth.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );

  refresh = (): Observable<boolean> =>
    this._http.get<AuthData>('/api/auth/token/refresh')
      .pipe(
        switchMap(this._updateAuthData),
        catchError((error) => { throw error })
      );

  logout = () => {
    this._auth.doLogoutUser();
    // TODO perform http call to a dedicated API
    // and destroy auth profile in session
    this.authData = undefined;
  };

  private _updateAuthData = (authData: AuthData) => {
    this._auth.doLoginUser(authData);
    this.authData = authData;
    return of(true);
  };
}
