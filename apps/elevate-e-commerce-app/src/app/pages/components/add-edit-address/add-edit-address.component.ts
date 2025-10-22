import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { Store } from '@ngrx/store';
import * as Actions from '../../../store/address/address.actions';

import { env } from '@env/env';
import { AddressesService } from '@shared/services/addresses/addresses.service';
import { ProgressComponent } from '@shared/ui/progress/progress.component';
import { CreateAddresses, Position, State } from '@shared/interfaces/addresses';
import { MapComponent } from '../map/map.component';
import { selectNewAddress } from '../../../store/address/address.selector';
import { CtrlErrComponent } from '../../../features/auth/components/ctrl-err/ctrl-err.component';
import { SubmitBtnComponent } from '@shared/ui/submit-btn/submit-btn.component';

@Component({
  selector: 'app-add-edit-address',
  imports: [
    ReactiveFormsModule,
    ProgressComponent,
    CtrlErrComponent,
    SubmitBtnComponent,
    MapComponent,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './add-edit-address.component.html',
  styleUrl: './add-edit-address.component.css',
})
export class AddEditAddressComponent implements OnInit {
  address = signal<State>({
    addresses: [],
    city: '',
    currentStep: 1,
    editSession: false,
    lat: 0,
    long: 0,
    phone: '',
    street: '',
    username: '',
    editAddressId: '',
  });
  editId = '';
  isSubmitting = signal<boolean>(false);

  closeModal = output();

  form!: FormGroup;

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _addressesServ = inject(AddressesService);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.initForm();

    const subscription = this._store.select(selectNewAddress).subscribe({
      next: (state) => {
        this.address.set(state);
        if (state.editSession) {
          this.form.patchValue({
            city: state.city,
            street: state.street,
            phone: state.phone,
          });
        } else {
          this.form.patchValue({
            city: '',
            street: '',
            phone: '',
          });
        }
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  initForm() {
    this.form = new FormGroup({
      city: new FormControl(this.address()?.city, [
        Validators.required,
        Validators.minLength(3),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(env.PhoneRG),
      ]),
    });
  }

  onPrevStep() {
    this._store.dispatch(Actions.prevStep());
  }

  onNextStep() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this._store.dispatch(Actions.addAddress(this.form.value));
      this._store.dispatch(Actions.nextStep());
    }
  }

  getLocation(location: Position) {
    this._store.dispatch(Actions.getLocation(location));
    return location;
  }

  addNewAddressApi(payload: CreateAddresses) {
    const subscription = this._addressesServ.addAddress(payload).subscribe({
      next: () => {
        this._toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Address created successfully',
          life: 4000,
        });

        this._store.dispatch(Actions.reset());

        this.isSubmitting.set(false);

        this.closeModal.emit();
      },
      error: (err) => {
        console.log(err);
        this._toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err}`,
          life: 4000,
        });

        this.isSubmitting.set(false);
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  editAddressApi(payload: CreateAddresses, id: string) {
    const subscription = this._addressesServ
      .updateAddress(payload, id)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Address updated successfully',
            life: 4000,
          });

          this._store.dispatch(Actions.reset());

          this.isSubmitting.set(false);

          this.closeModal.emit();
        },
        error: (err) => {
          console.log(err);
          this._toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err}`,
            life: 4000,
          });

          this.isSubmitting.set(false);
        },
      });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmitForm() {
    const formData = {
      street: this.address().street,
      phone: this.address().phone,
      city: this.address().city,
      lat: this.address().lat.toString(),
      long: this.address().long.toString(),
      username: 'test',
    };

    if (formData.lat == '0' || formData.long == '0') {
      this._toast.add({
        severity: 'error',
        summary: 'Location is missing',
        detail: 'Please select your location',
        life: 4000,
      });
      return;
    }

    this.isSubmitting.set(true);

    if (this.address().editSession) {
      this.editAddressApi(formData, this.address().editAddressId);
    } else this.addNewAddressApi(formData);
  }
}
