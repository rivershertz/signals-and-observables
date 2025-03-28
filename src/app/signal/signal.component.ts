import { Component } from '@angular/core';
import { signal } from './signal';

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css',
})
export class SignalComponent {
  count = signal(1);
  doubleCount = this.count.track((count) => count * 2);

  ocIncrement() {
    this.count.update((prev) => prev + 1);
  }
}
