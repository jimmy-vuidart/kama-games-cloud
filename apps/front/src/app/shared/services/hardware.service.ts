import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hardware } from '@kama-games-cloud/shared';
import { catchError, delay, filter, interval, map, Observable, of, retry, switchMap, take, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Status } from '../components/badge/badge.component';

@Injectable({
  providedIn: 'root',
})
export class HardwareService {
  apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/hardware`;
  }

  fetch(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.apiUrl}`);
  }

  wakeUp(hardware: Hardware) {
    return this.http.get<void>(`${this.apiUrl}/wake/${hardware.id}`);
  }

  checkHealth(hardware: Hardware) {
    return this.http.get<{ up: boolean }>(`${this.apiUrl}/health/${hardware.id}`)
      .pipe(
        map(data => data.up ? Status.SUCCESS : Status.DANGER),
        catchError(err => of(Status.DANGER)),
      );
  }

  longCheckHealth(hardware: Hardware) {
    let attempts = 0;
    return this.checkHealth(hardware).pipe(
      switchMap(status => {
        if (status === Status.SUCCESS) {
          return of(status);
        } else {
          return timer(1000).pipe(map(() => {
            throw new Error('No health success');
          }));
        }
      }),
      retry(10),
      catchError(err => of(Status.DANGER)),
    );
  }
}
