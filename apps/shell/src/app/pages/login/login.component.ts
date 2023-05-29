import { AuthenticationService } from '@angular-mfe-example/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@angular-mfe-example/ui';

@Component({
  selector: 'shell-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private readonly _authenticator: AuthenticationService,
              private readonly _router: Router,
              private readonly _toaster: ToastService) {

    this.loginForm = new FormGroup({
      user: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      rememberMe: new FormControl<boolean>(false, [Validators.required])
    });
  }

  onLogin = (): Promise<boolean> => {
    const { user, password } = this.loginForm.controls;
    if (this._authenticator.authenticate(user?.value, password?.value)) {
      return this._router.navigate(['home']).then();
    }    
    return this.authenticationFailed();
  }

  private authenticationFailed = (): Promise<boolean> => {
    this._toaster.error('Login failed', 'It seems that you\'re not authorized to log in...\nIf not, please retry!');
    this.loginForm.controls['password'].setValue('');
    return Promise.resolve(false);
  }
}
