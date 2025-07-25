import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { env } from '@env/env';
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { AuthApiService } from 'auth-apis';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';
import { equalValues } from '@shared/utils/validateRePassword';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';

@Component({
  selector: 'app-update-password',
  imports: [
    TranslateModule,
    BaseInputComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    RouterLink,
    Message,
    CtrlErrComponent,
  ],
  templateUrl: './updatePassword.component.html',
  styleUrl: './updatePassword.component.css',
})
export class UpdatePasswordComponent implements OnInit {
  resetForm!: FormGroup;

  isSubmitting = signal<boolean>(false);
  errorMsg = signal<string>('');

  private readonly _authApi = inject(AuthApiService);
  private readonly _toast = inject(MessageService);
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

  showToast() {
    this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password has been reset successfully',
      life: 4000,
    });
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
            this.showToast();

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
