import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:7011/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.auth.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services`, { headers: this.getHeaders() });
  }

  purchaseService(serviceId: string, userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/service-purchase`, { serviceId, userId }, { headers: this.getHeaders() });
  }

  getServicePurchases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/service-purchases`, { headers: this.getHeaders() });
  }

  approvePurchase(id: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/service-purchase/${id}`, { status }, { headers: this.getHeaders() });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }
}
