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
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {

    this.error = '';
    this.loading = true;

    this.auth.register(
      this.name,
      this.email,
      this.password
    ).subscribe({

      next: () => {

        this.router.navigate(
          ['/verify-code'],
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
          'Registration failed';

        this.loading = false;
      },

      complete: () => {
        this.loading = false;
      }

    });
  }
}