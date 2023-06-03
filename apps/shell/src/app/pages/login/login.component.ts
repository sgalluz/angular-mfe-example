import { AuthenticationService } from '@angular-mfe-example/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@angular-mfe-example/ui';
import { catchError } from 'rxjs';

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
              private readonly _formBuilder: FormBuilder,
              private readonly _toaster: ToastService) {

    this.loginForm = this._formBuilder.group({
      user: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      rememberMe: new FormControl<boolean>(false, [Validators.required])
    });
  }

  onLogin = (): void => {
    const { user, password } = this.loginForm.controls;
    this._authenticator.login(user?.value, password?.value)
      .pipe(
        catchError(this.authenticationFailed)
      )
      .subscribe(() => this._router.navigate(['home']).then());
  }

  private authenticationFailed = (error: any): Promise<boolean> => {
    console.error(error);
    this._toaster.error('Login failed', 'It seems that you\'re not authorized to log in...\nIf not, please retry!');
    this.loginForm.controls['password'].setValue('');
    return Promise.resolve(false);
  }
}
