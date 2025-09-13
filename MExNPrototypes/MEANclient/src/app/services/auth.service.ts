import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  tokens?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  user: User | null = null;

  constructor() {
    this.loadUserFromToken();
  }

  private loadUserFromToken() {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem(this.tokenKey);
    }

    if (token) {
      this.user = jwtDecode<User>(token);
    }
  }

  login(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
    this.loadUserFromToken();
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
    this.user = null;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  isBeneficiary(): boolean {
    return this.user?.role === 'beneficiary';
  }

  isMember(): boolean {
    return this.user?.role === 'member';
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }
}
