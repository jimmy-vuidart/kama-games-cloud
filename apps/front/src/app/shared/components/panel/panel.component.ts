import { Component, input } from '@angular/core';

@Component({
  selector: 'panel',
  imports: [],
  templateUrl: './panel.component.html',
})
export class PanelComponent {
  title = input<string>('');

  loading = input.required<boolean>();
}
