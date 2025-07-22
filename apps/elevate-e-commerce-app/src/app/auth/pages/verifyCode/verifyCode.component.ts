import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { env } from '@env/env';
import { AuthApiService } from 'auth-apis';
import { ToastService } from '@shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { ErrMsgComponent } from '../../components/err-msg/err-msg.component';

@Component({
  selector: 'app-verify-code',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    SubmitBtnComponent,
    ErrMsgComponent,
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
  private readonly _toast = inject(ToastService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormArray([
        new FormControl('', [
          Validators.maxLength(1),
          Validators.pattern(env.otpRG),
        ]),
        new FormControl('', [
          Validators.maxLength(1),
          Validators.pattern(env.otpRG),
        ]),
        new FormControl('', [
          Validators.maxLength(1),
          Validators.pattern(env.otpRG),
        ]),
        new FormControl('', [
          Validators.maxLength(1),
          Validators.pattern(env.otpRG),
        ]),
        new FormControl('', [
          Validators.maxLength(1),
          Validators.pattern(env.otpRG),
        ]),
        new FormControl('', [
          Validators.maxLength(1),
          Validators.pattern(env.otpRG),
        ]),
      ]),
    });
  }

  onOtpInput(e: any, i: number) {
    const value = e.target.value;

    if (!env.otpRG.test(value) && value !== '') {
      e.target.value = '';
      return;
    }

    if (value && i < 5) {
      const nextInput = e.target.parentElement.nextElementSibling.children[0];

      nextInput?.focus();
    }
  }

  onKeyDown(e: any, i: number) {
    if (e.key === 'Backspace' && !e.target.value && i > 0) {
      const prevInput =
        e.target.parentElement.previousElementSibling.children[0];

      prevInput?.focus();
    }

    if (e.key === 'ArrowLeft' && i > 0) {
      const prevInput =
        e.target.parentElement.previousElementSibling.children[0];
      prevInput?.focus();
    }

    if (e.key === 'ArrowRight' && i < 5) {
      const nextInput = e.target.parentElement.nextElementSibling.children[0];
      nextInput?.focus();
    }
  }

  onSubmit() {
    const payload = { resetCode: this.verifyCodeForm.value.resetCode.join('') };
    console.log(payload);

    if (this.verifyCodeForm.invalid) {
      this.verifyCodeForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.errorMsg.set('');

      const subscription = this._authApi.verifyCode(payload).subscribe({
        next: () => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.type.set('success');
          this._toast.message.set('Code verified successfully!');

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
