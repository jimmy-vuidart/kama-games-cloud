import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Hardware } from '@kilsi-world/shared';
import { Observable } from 'rxjs';
import { KamaWorldService } from '../../shared/services/kama-world.service';

@Component({
  selector: 'app-home',
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatSelect,
    AsyncPipe,
    MatOption,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  kamaWorldService = inject(KamaWorldService);

  hardware$: Observable<Hardware[]> = this.kamaWorldService.getPCs();

  selectedPC?: Hardware;

  powerOn() {
    if (this.selectedPC) {
      this.kamaWorldService.wakeUpPC(this.selectedPC.id).subscribe();
    }
  }
}
