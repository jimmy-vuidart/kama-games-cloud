import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hardware } from '@kilsi-world/shared/hardware';
import { map, Observable } from 'rxjs';
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
    return this.http.get<{ up: boolean }>(`http://${hardware.controlTowerAddress}/health`)
      .pipe(map(data => data.up ? Status.SUCCESS : Status.DANGER));
  }
}
