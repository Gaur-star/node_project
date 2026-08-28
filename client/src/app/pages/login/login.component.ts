import {
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    this.error = '';
    this.loading = true;

    this.auth.login(
      this.email,
      this.password
    ).subscribe({

      next: () => {
        this.router.navigate([
          '/dashboard'
        ]);
      },

      error: error => {

        this.error =
          error.error?.message ||
          'Login failed';

        this.loading = false;
      },

      complete: () => {
        this.loading = false;
      }

    });
  }
}