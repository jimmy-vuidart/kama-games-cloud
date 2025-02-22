import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HardwareService } from '../../shared/services/hardware.service';
import { ServerStarterPanelComponent } from './server-starter-panel/server-starter-panel.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    FormsModule,
    ServerStarterPanelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  hardwareService = inject(HardwareService);

  hardware$ = this.hardwareService.fetch();

}
