import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { Addresses } from '@shared/interfaces/addresses';
import {
  nextStep,
  selectAddress,
} from '../../../store/checkout/checkout.actions';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddressesService } from '@shared/services/addresses/addresses.service';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import {
  editAddress,
  reset,
} from '../../../store/new-address/new-address.actions';
import { AddEditAddressComponent } from '../add-edit-address/add-edit-address.component';
import { selectNewAddress } from '../../../store/new-address/new-address.selector';

@Component({
  selector: 'app-check-out-step1',
  imports: [
    Dialog,
    FormsModule,
    ConfirmDialogModule,
    Message,
    InputTextModule,
    TextareaModule,
    AddEditAddressComponent,
  ],
  templateUrl: './checkOut-step1.component.html',
  styleUrl: './checkOut-step1.component.css',
})
export class CheckOutStep1Component implements OnInit {
  visible = false;
  addressModal = false;

  editFlag = false;

  selectedAddress = signal<string>('');
  addresses = input.required<Addresses[]>();
  addressesChange = output<Addresses[]>();

  city = signal<string>('');
  street = signal<string>('');
  phone = signal<string>('');

  private _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _confirm = inject(ConfirmationService);
  private readonly _addresses = inject(AddressesService);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    const subscription = this._store.select('checkout').subscribe({
      next: ({ selectedAddress }) => this.selectedAddress.set(selectedAddress),
    });

    const subscription2 = this._store.select(selectNewAddress).subscribe({
      next: ({ editSession }) => (this.editFlag = editSession),
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
    });
  }

  showDialog() {
    this.visible = true;
  }

  showNewAddressDialog(edit?: Addresses) {
    if (edit) {
      this._store.dispatch(editAddress(edit));
    } else this._store.dispatch(reset());

    this.visible = false;
    this.addressModal = true;
  }

  closeNewAddressDialog() {
    this.addressModal = false;
  }

  onNext() {
    this._store.dispatch(selectAddress({ value: this.selectedAddress() }));
    this._store.dispatch(nextStep());
  }

  deleteAddress(id: string) {
    const subscription = this._addresses.deleteAddress(id).subscribe({
      next: (res) => {
        this.addressesChange.emit(res);

        this._toast.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Address has deleted successfully',
          life: 4000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  confirm2(event: Event, id: string) {
    this._confirm.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this address?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this._confirm.close();
        this.deleteAddress(id);
      },
      reject: () => {
        this._confirm.close();
        this._toast.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
