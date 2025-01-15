import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hardware } from '@kilsi-world/shared';

@Injectable({
  providedIn: 'root',
})
export class KamaWorldService {
  apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/hardware`;
  }


  getPCs(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.apiUrl}`);
  }

  wakeUpPC(id: string) {
    return this.http.get<void>(`${this.apiUrl}/wake/${id}`);
  }
}
