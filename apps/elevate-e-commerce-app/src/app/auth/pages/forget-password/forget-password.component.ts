import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { AuthApiService } from 'auth-apis';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';

@Component({
  selector: 'app-forget-password',
  imports: [
    BaseInputComponent,
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    SubmitBtnComponent,
    Message,
    CtrlErrComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;

  isSubmitting = signal<boolean>(false);
  errorMsg = signal<string>('');

  steps = output();

  private readonly _authApi = inject(AuthApiService);
  private readonly _toast = inject(MessageService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  showToast() {
    this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Code sent successfully',
      life: 4000,
    });
  }

  submit() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.errorMsg = signal<string>('');

      const subscription = this._authApi
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: () => {
            this.showToast();

            this.steps.emit();

            sessionStorage.setItem(
              'forgetEmail',
              this.forgetPasswordForm.value.email
            );
          },
          error: (err) => {
            this.isSubmitting.set(false);
            this.errorMsg.set(err.message);
          },
          complete: () => {
            this.forgetPasswordForm.reset();
            this.isSubmitting.set(false);
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
