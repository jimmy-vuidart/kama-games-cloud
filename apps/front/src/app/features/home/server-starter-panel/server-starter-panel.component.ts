import { Component, inject, input, resource } from '@angular/core';
import { Hardware } from '@kama-games-cloud/shared';
import { firstValueFrom, tap } from 'rxjs';
import { Status } from '../../../shared/components/badge/badge.component';
import { PanelComponent } from '../../../shared/components/panel/panel.component';
import { HardwareService } from '../../../shared/services/hardware.service';
import { ServerStatusBadgeComponent } from './server-status-badge/server-status-badge.component';

@Component({
  selector: 'server-starter-panel',
  imports: [
    PanelComponent,
    ServerStatusBadgeComponent,
  ],
  templateUrl: './server-starter-panel.component.html',
  styleUrl: './server-starter-panel.component.scss',
})
export class ServerStarterPanelComponent {
  hardwareService = inject(HardwareService);

  hardware = input.required<Hardware>();

  status = resource({
    request: () => ({ hardware: this.hardware() }),
    loader: ({ request }) => firstValueFrom(this.hardwareService.longCheckHealth(request.hardware)),
    defaultValue: Status.LOADING,
  });

  protected readonly Status = Status;

  startServer() {
    this.hardwareService.wakeUp(this.hardware())
      .pipe(
        tap(() => this.status.reload()),
      )
      .subscribe();
  }
}
