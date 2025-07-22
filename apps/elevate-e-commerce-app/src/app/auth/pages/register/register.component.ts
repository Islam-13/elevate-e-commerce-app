import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { env } from '@env/env';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '@shared/services/toast/toast.service';
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { equalValues } from '@shared/utils/validateRePassword';
import { AuthApiService } from 'auth-apis';
import { timer } from 'rxjs';
import { CtrlErrorComponent } from '../../components/ctrl-error/ctrl-error.component';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { ErrMsgComponent } from '../../components/err-msg/err-msg.component';

@Component({
  selector: 'app-register',
  imports: [
    BaseInputComponent,
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    CtrlErrorComponent,
    SubmitBtnComponent,
    ErrMsgComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  isSubmitting = signal<boolean>(false);
  errorMsg = signal<string>('');

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        gender: new FormControl<'male' | 'female'>('male', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(env.passwordRG),
        ]),
        rePassword: new FormControl('', [Validators.required]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(env.PhoneRG),
        ]),
      },
      {
        validators: [
          (control) => equalValues(control, 'password', 'rePassword'),
        ],
      }
    );
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.errorMsg = signal<string>('');

      const subscription = this._authApi
        .register(this.registerForm.value)
        .subscribe({
          next: () => {
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('success');
            this._toast.message.set('Account registered successfully!');

            this._router.navigate(['/auth/login']);
          },
          error: (err) => {
            this.isSubmitting.set(false);
            this.errorMsg.set(err.message);
          },
          complete: () => {
            this.registerForm.reset();
            this.isSubmitting.set(false);
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
