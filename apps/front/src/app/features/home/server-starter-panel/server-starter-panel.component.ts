import { Component, inject } from '@angular/core';
import { Hardware } from '@kilsi-world/shared';
import { map, Observable, switchMap } from 'rxjs';
import { BadgeComponent, Status } from '../../../shared/components/badge/badge.component';
import { PanelComponent } from '../../../shared/components/panel/panel.component';
import { KamaWorldService } from '../../../shared/services/kama-world.service';

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
  kamaWorldService = inject(KamaWorldService);

  hardware$: Observable<Hardware[]> = this.kamaWorldService.getPCs();
  defaultHardware$: Observable<Hardware> = this.hardware$.pipe(map((hardware: Hardware[]) => hardware[0]));

  protected readonly Status = Status;

  startServer() {

    this.defaultHardware$.pipe(
      switchMap((hardware: Hardware) => this.kamaWorldService.wakeUpPC(hardware.id)),
    ).subscribe();
  }
}
