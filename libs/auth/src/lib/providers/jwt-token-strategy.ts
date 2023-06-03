import { Observable, of } from "rxjs";
import { AuthStrategy } from "./auth-strategy.provider";
import { JwtToken, User } from "../models";

export class JwtTokenStrategy implements AuthStrategy<JwtToken> {

  private readonly JWT_TOKEN = 'ng_mfe_tkn';

  doLoginUser = (token: JwtToken): void => localStorage.setItem(this.JWT_TOKEN, token.jwtToken);

  doLogoutUser = (): void => localStorage.removeItem(this.JWT_TOKEN);

  getCurrentUser = (): Observable<User | undefined> => {
    const token = this.getAuthToken();
    if (!token) {
      return of(undefined);
    }
    const encodedPayload = token.split('.')[1];
    const payload = window.atob(encodedPayload);
    return of(JSON.parse(payload));
  }

  getAuthToken = () => localStorage.getItem(this.JWT_TOKEN);
}