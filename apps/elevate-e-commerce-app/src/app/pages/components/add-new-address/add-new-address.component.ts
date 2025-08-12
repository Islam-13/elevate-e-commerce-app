import {
  Component,
  DestroyRef,
  inject,
  input,
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
import { ProgressComponent } from '@shared/ui/progress/progress.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Store } from '@ngrx/store';
import * as Actions from '../../../store/new-address/new-address.actions';
import { MapComponent } from '../map/map.component';
import { env } from '@env/env';
import { CtrlErrComponent } from '../../../auth/components/ctrl-err/ctrl-err.component';
import { Position, State } from '@shared/interfaces/addresses';
import { AddressesService } from '@shared/services/addresses/addresses.service';
import { MessageService } from 'primeng/api';
import { SubmitBtnComponent } from '../../../auth/components/submit-btn/submit-btn.component';

@Component({
  selector: 'app-add-new-address',
  imports: [
    ReactiveFormsModule,
    ProgressComponent,
    InputTextModule,
    TextareaModule,
    MapComponent,
    CtrlErrComponent,
    SubmitBtnComponent,
  ],
  templateUrl: './add-new-address.component.html',
  styleUrl: './add-new-address.component.css',
})
export class AddNewAddressComponent implements OnInit {
  closeModal = output();
  editId = input.required<string>();
  isSubmitting = signal<boolean>(false);
  currentStep = signal<number>(1);
  state = signal<State>({
    city: '',
    lat: 0,
    long: 0,
    currentStep: 1,
    phone: '',
    street: '',
    username: '',
  });

  form!: FormGroup;

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _addressesServ = inject(AddressesService);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    const subscription = this._store.select('newAddress').subscribe({
      next: (s) => {
        this.currentStep.set(s.currentStep);
        this.state.set(s);
      },
    });

    this.initForm();

    if (this.editId()) {
      console.log('test');

      this.form.setValue({
        city: 'test',
        street: 'test',
        phone: '+201007755592',
      });

      // this.form.controls?.['city'].setValue('test');
      // this.form.controls?.['street'].setValue('test');
      // this.form.controls?.['phone'].setValue('+201007755592');
    }

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  initForm() {
    this.form = new FormGroup({
      city: new FormControl(this.state().city, [
        Validators.required,
        Validators.minLength(3),
      ]),
      street: new FormControl(this.state().street, [
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
      this._store.dispatch(Actions.getAddresses(this.form.value));
      this._store.dispatch(Actions.nextStep());
    }
  }

  getLocation(location: Position) {
    this._store.dispatch(Actions.getLocation(location));
    return location;
  }

  submitAddress() {
    const payload = {
      street: this.state().street,
      phone: this.state().phone,
      city: this.state().city,
      lat: this.state().lat.toString(),
      long: this.state().long.toString(),
      username: 'islam',
    };

    if (payload.lat === '0' && payload.long === '0') return;

    this.isSubmitting.set(true);

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
}
