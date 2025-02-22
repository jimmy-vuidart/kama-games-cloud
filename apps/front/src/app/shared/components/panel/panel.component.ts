import { Component, Input } from '@angular/core';

@Component({
  selector: 'panel',
  imports: [],
  templateUrl: './panel.component.html',
})
export class PanelComponent {
  @Input()
  title: string = '';

  @Input()
  loading: boolean = false;
}
