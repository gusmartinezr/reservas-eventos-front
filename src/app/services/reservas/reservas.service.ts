import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas`);
  }

  createReserva(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas`, data);
  }
  deleteReserva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reservas/${id}`);
  }
}
