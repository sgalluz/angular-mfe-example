import { AuthenticationService } from '@angular-mfe-example/auth';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'shell-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private readonly authenticator: AuthenticationService, private readonly router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      rememberMe: new FormControl<boolean>(false, [Validators.required])
    });
  }

  onLogin = (): void => {
    const { user, password } = this.loginForm.controls;
    const authenticated = this.authenticator.authenticate(user?.value, password?.value);
    if (authenticated) {
      this.router.navigate(['home']).then();
    } else {
      // FIXME show error!
    }
    this.loginForm.controls['password'].setValue('');
  }
}
