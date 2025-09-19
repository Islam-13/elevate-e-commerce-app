import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { prevStep } from '../../../store/checkout/checkout.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-out-step2',
  imports: [FormsModule],
  templateUrl: './checkOut-step2.component.html',
  styleUrl: './checkOut-step2.component.css',
})
export class CheckOutStep2Component {
  selectedMethod = signal<string>('');

  private _store = inject(Store);

  onBack() {
    this._store.dispatch(prevStep());
  }
}
