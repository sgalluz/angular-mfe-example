export class AuthProfile {
    user: string;
    jwt?: string;
    permissions?: string[] = [];

    static builder(user: string): AuthProfileBuilder {
        return new AuthProfileBuilder(user);
    }

    constructor(user: string) {
        this.user = user;
    }
}

export class AuthProfileBuilder {

    private _authProfile: AuthProfile;

    constructor(user: string) {
        this._authProfile = new AuthProfile(user);
    }

    user(user: string): AuthProfileBuilder {
        this._authProfile.user = user;
        return this;
    }

    jwt(jwt: string): AuthProfileBuilder {
        this._authProfile.jwt = jwt;
        return this;
    }

    permissions(permissions: string[]): AuthProfileBuilder {
        this._authProfile.permissions = permissions;
        return this;
    }

    build() {
        return this._authProfile;
    }
}
