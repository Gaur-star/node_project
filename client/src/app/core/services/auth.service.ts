import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api =
    `${environment.apiUrl}/auth`;

  private accessToken =
    signal<string | null>(null);

  user =
    signal<User | null>(null);

  constructor(
    private http: HttpClient
  ) {}

  getToken(): string | null {
    return this.accessToken();
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post(
      `${this.api}/register`,
      {
        name,
        email,
        password
      }
    );
  }

  verifyCode(
    email: string,
    code: string
  ): Observable<any> {

    return this.http.post(
      `${this.api}/verify-code`,
      {
        email,
        code
      }
    );
  }

  resendCode(
    email: string
  ): Observable<any> {

    return this.http.post(
      `${this.api}/resend-code`,
      {
        email
      }
    );
  }

  login(
    email: string,
    password: string
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.api}/login`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.accessToken.set(
          response.accessToken
        );

        this.user.set(
          response.user
        );
      })
    );
  }

  refresh(): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.api}/refresh`,
      {},
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.accessToken.set(
          response.accessToken
        );

        this.user.set(
          response.user
        );
      })
    );
  }

  logout(): Observable<any> {

    return this.http.post(
      `${this.api}/logout`,
      {},
      {
        withCredentials: true
      }
    ).pipe(
      tap(() => {
        this.accessToken.set(null);
        this.user.set(null);
      })
    );
  }

  getMe(): Observable<any> {

    return this.http.get(
      `${this.api}/me`
    ).pipe(
      tap((response: any) => {
        this.user.set(response.user);
      })
    );
  }

  forgotPassword(
    email: string
  ): Observable<any> {

    return this.http.post(
      `${this.api}/forgot-password`,
      {
        email
      }
    );
  }

  resetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Observable<any> {

    return this.http.post(
      `${this.api}/reset-password`,
      {
        email,
        code,
        newPassword
      }
    );
  }
}