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
import { TranslateModule } from '@ngx-translate/core';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { env } from '@env/env';
import { AuthApiService } from 'auth-apis';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { InputOtpModule } from 'primeng/inputotp';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';

@Component({
  selector: 'app-verify-code',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    SubmitBtnComponent,
    Message,
    InputOtpModule,
    CtrlErrComponent,
  ],
  templateUrl: './verifyCode.component.html',
  styleUrl: './verifyCode.component.css',
})
export class VerifyCodeComponent implements OnInit {
  verifyCodeForm!: FormGroup;

  otpDigits = new Array(6);

  isSubmitting = signal<boolean>(false);
  errorMsg = signal<string>('');

  steps = output();

  private readonly _authApi = inject(AuthApiService);
  private readonly _toast = inject(MessageService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.pattern(env.otpRG),
      ]),
    });
  }

  showToast() {
    this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Code verified successfully',
      life: 4000,
    });
  }

  onSubmit() {
    if (this.verifyCodeForm.invalid) {
      this.verifyCodeForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.errorMsg.set('');

      const subscription = this._authApi
        .verifyCode(this.verifyCodeForm.value)
        .subscribe({
          next: () => {
            this.showToast();

            this.steps.emit();
          },
          error: (err) => {
            this.isSubmitting.set(false);
            this.errorMsg.set(err.message);
          },
          complete: () => {
            this.verifyCodeForm.reset();
            this.isSubmitting.set(false);
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
