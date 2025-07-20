import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { timer } from 'rxjs';
import { env } from '@env/env';
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrMsgComponent } from '../../components/err-msg/err-msg.component';
import { CtrlErrorComponent } from '../../components/ctrl-error/ctrl-error.component';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { AuthApiService } from 'auth-apis';
import { ToastService } from '@shared/services/toast/toast.service';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';
import { equalValues } from '@shared/utils/validateRePassword';

@Component({
  selector: 'app-update-password',
  imports: [
    TranslateModule,
    BaseInputComponent,
    ReactiveFormsModule,
    ErrMsgComponent,
    CtrlErrorComponent,
    SubmitBtnComponent,
    RouterLink,
  ],
  templateUrl: './updatePassword.component.html',
  styleUrl: './updatePassword.component.css',
})
export class UpdatePasswordComponent implements OnInit {
  resetForm!: FormGroup;

  isSubmitting = signal<boolean>(false);
  errorMsg = signal<string>('');

  private readonly _authApi = inject(AuthApiService);
  private readonly _toast = inject(ToastService);
  private readonly _router = inject(Router);
  private readonly _localStorage = inject(LocalStorageService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetForm = new FormGroup(
      {
        email: new FormControl(`${sessionStorage.getItem('forgetEmail')}`),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(env.passwordRG),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [
          (control) => equalValues(control, 'newPassword', 'rePassword'),
        ],
      }
    );
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.errorMsg.set('');

      const subscription = this._authApi
        .resetPassword(this.resetForm.value)
        .subscribe({
          next: (res) => {
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('success');
            this._toast.message.set('Password has been reset successfully!');

            this._localStorage.set('userToken', res.token);
            sessionStorage.removeItem('forgetEmail');

            this._router.navigate(['/']);
          },
          error: (err) => {
            this.isSubmitting.set(false);
            this.errorMsg.set(err.message);
          },
          complete: () => {
            this.isSubmitting.set(false);
            this.resetForm.reset();
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
