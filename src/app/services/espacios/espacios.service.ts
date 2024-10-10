import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspaciosService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getEspacios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/espacios`);
  }

  createEspacio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/espacios`, data);
  }
  deleteEspacio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/espacios/${id}`);
  }
}
