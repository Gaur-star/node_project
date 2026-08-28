import {
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  email = '';
  code = '';
  newPassword = '';

  error = '';
  message = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route.queryParams.subscribe(
      params => {
        this.email =
          params['email'] || '';
      }
    );
  }

  submit() {

    this.auth.resetPassword(
      this.email,
      this.code,
      this.newPassword
    ).subscribe({

      next: response => {

        this.message =
          response.message;

        setTimeout(() => {
          this.router.navigate([
            '/login'
          ]);
        }, 1000);

      },

      error: error => {

        this.error =
          error.error?.message ||
          'Password reset failed';

      }

    });
  }
}