import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenKey = 'authToken';
  private tokenSubject = new BehaviorSubject<string | null>(
    this.getTokenFromLocalStorage()
  );

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.tokenSubject
      .asObservable()
      .pipe(map((token) => token !== null));
  }

  login(data: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  logout(): void {
    this.removeToken();
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
