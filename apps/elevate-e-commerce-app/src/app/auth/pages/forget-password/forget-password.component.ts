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
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { CtrlErrorComponent } from '../../components/ctrl-error/ctrl-error.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { AuthApiService } from 'auth-apis';
import { timer } from 'rxjs';
import { ToastService } from '@shared/services/toast/toast.service';
import { ErrMsgComponent } from '../../components/err-msg/err-msg.component';

@Component({
  selector: 'app-forget-password',
  imports: [
    BaseInputComponent,
    RouterLink,
    TranslateModule,
    CtrlErrorComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    ErrMsgComponent,
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
  private readonly _toast = inject(ToastService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('success');
            this._toast.message.set('Code sent successfully!');

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
