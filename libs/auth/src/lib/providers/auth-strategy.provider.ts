import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { JwtTokenStrategy } from "./jwt-token-strategy";
import { User } from "../models";

export interface AuthStrategy<T> {
  doLoginUser(data: T): void;
  doLogoutUser(): void;
  getCurrentUser(): Observable<User | undefined>;
  getAuthToken(): string | null;
}
  
export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>('AuthStrategy');
  
// can be extended based on the different desired authentication methods
export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  useFactory: () => new JwtTokenStrategy()
};