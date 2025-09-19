import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AddressesService } from '@shared/services/addresses/addresses.service';
import { Addresses } from '@shared/interfaces/addresses';
import { CheckOutStep1Component } from '../components/check0ut-step1/checkOut-step1.component';
import { CheckOutStep2Component } from '../components/check0ut-step2/checkOut-step2.component';
import { Store } from '@ngrx/store';
import { ProgressComponent } from '@shared/ui/progress/progress.component';

@Component({
  selector: 'app-check-out',
  imports: [
    ButtonModule,
    InputTextModule,
    CheckOutStep1Component,
    CheckOutStep2Component,
    ProgressComponent,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  visible = false;
  addresses = signal<Addresses[]>([]);
  currentStep = signal<number>(1);

  private readonly _addresses = inject(AddressesService);
  private readonly _destroyRef = inject(DestroyRef);
  private _store = inject(Store);

  ngOnInit(): void {
    this.getAddresses();

    const subscription = this._store.select('checkout').subscribe({
      next: ({ currentStep }) => this.currentStep.set(currentStep),
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  getAddresses() {
    const subscription = this._addresses.getAddresses().subscribe({
      next: (res) => {
        this.addresses.set(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('done');
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updateAddresses(address: Addresses[]) {
    this.addresses.set(address);
  }

  showDialog() {
    this.visible = true;
  }
}
