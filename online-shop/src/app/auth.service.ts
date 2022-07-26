import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRoles } from './login/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user: User | null = null;
  redirectUrl: string | null = null;

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.url}/login`, { username, password })
      .pipe(tap((user) => (this.user = user)));
  }

  logout(): void {
    this.user = null;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  hasRole(role: UserRoles): boolean {
    return this.user?.roles.includes(role) ?? false;
  }
}
