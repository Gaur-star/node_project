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
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './verify-code.component.html'
})
export class VerifyCodeComponent {

  email = '';
  code = '';

  error = '';
  message = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route.queryParams.subscribe(
      params => {
        this.email = params['email'] || '';
      }
    );
  }

  verify() {

    this.error = '';

    this.auth.verifyCode(
      this.email,
      this.code
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
          'Verification failed';
      }

    });
  }

  resend() {

    this.auth.resendCode(
      this.email
    ).subscribe({

      next: response => {
        this.message =
          response.message;
      },

      error: error => {
        this.error =
          error.error?.message ||
          'Unable to resend code';
      }

    });
  }
}