import { Component, inject, input, resource } from '@angular/core';
import { Hardware } from '@kilsi-world/shared/hardware';
import { first, firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { BadgeComponent, Status } from '../../../shared/components/badge/badge.component';
import { PanelComponent } from '../../../shared/components/panel/panel.component';
import { HardwareService } from '../../../shared/services/hardware.service';

@Component({
  selector: 'server-starter-panel',
  imports: [
    PanelComponent,
    BadgeComponent,
  ],
  templateUrl: './server-starter-panel.component.html',
  styleUrl: './server-starter-panel.component.scss',
})
export class ServerStarterPanelComponent {
  hardwareService = inject(HardwareService);

  hardware = input.required<Hardware>();

  status = resource({
    request: () => ({ hardware: this.hardware() }),
    loader: ({ request }) => firstValueFrom(this.hardwareService.checkHealth(request.hardware)),
    defaultValue: Status.LOADING,
  });

  protected readonly Status = Status;

  startServer() {
    // this.defaultHardware$.pipe(
    //   switchMap((hardware: Hardware) => this.kamaWorldService.wakeUp(hardware.id)),
    // ).subscribe();
  }
}
