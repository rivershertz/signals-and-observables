import { Component } from '@angular/core';
import { SignalComponent } from './signal/signal.component';

@Component({
  selector: 'app-root',
  imports: [SignalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signals-and-observables';
}
