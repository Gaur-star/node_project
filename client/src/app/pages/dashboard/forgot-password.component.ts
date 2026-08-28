import {
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  email = '';

  message = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {

    this.auth.forgotPassword(
      this.email
    ).subscribe({

      next: response => {

        this.message =
          response.message;

        this.router.navigate(
          ['/reset-password'],
          {
            queryParams: {
              email: this.email
            }
          }
        );
      },

      error: error => {

        this.error =
          error.error?.message ||
          'Request failed';

      }

    });
  }
}