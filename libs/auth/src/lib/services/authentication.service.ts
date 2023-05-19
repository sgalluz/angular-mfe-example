import { Injectable } from '@angular/core';
import { AuthProfile } from '../models/auth-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authProfile?: AuthProfile;

  authenticate = (user: string, password: string) => {
    if ('chewie' !== user || 'chewie' !== password) {
      console.error(`Unable to authenticate user "${user}"...`);
      return false;
    }

    // TODO perform http call to a dedicated API
    this.authProfile = AuthProfile.builder(user)
      .jwt('aaaaaaaa')
      .permissions(['wasd'])
      .build();
    return true;
  }

  isAuthenticated = () => !!this.authProfile?.jwt && !!this.authProfile.permissions?.length;

  logout = () => {
    // TODO perform http call to a dedicated API
    // and destroy auth profile in session
    this.authProfile = undefined;
  }

}
