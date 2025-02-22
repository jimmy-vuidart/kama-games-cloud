import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hardware } from '@kilsi-world/shared';
import { Observable } from 'rxjs';
import { BadgeComponent, Status } from '../../shared/components/badge/badge.component';
import { PanelComponent } from '../../shared/components/panel/panel.component';
import { KamaWorldService } from '../../shared/services/kama-world.service';
import { ServerStarterPanelComponent } from './server-starter-panel/server-starter-panel.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    FormsModule,
    PanelComponent,
    BadgeComponent,
    ServerStarterPanelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly Status = Status;

  powerOn() {
  }
}
