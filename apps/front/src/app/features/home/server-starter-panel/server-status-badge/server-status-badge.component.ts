import { Component, input } from '@angular/core';
import { BadgeComponent, Status } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'server-status-badge',
  imports: [
    BadgeComponent,
  ],
  templateUrl: './server-status-badge.component.html',
  styleUrl: './server-status-badge.component.scss',
})
export class ServerStatusBadgeComponent {
  status = input.required<Status>();
  protected readonly Status = Status;
}
