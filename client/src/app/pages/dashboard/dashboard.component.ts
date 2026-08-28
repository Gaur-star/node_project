import {
  Component
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  logout() {

    this.auth.logout()
      .subscribe(() => {

        this.router.navigate([
          '/login'
        ]);

      });
  }
}