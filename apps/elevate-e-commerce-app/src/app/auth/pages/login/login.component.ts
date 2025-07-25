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
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { AuthApiService } from 'auth-apis';
import { SubmitBtnComponent } from '../../components/submit-btn/submit-btn.component';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { PasswordModule } from 'primeng/password';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';

@Component({
  selector: 'app-login',
  imports: [
    BaseInputComponent,
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    SubmitBtnComponent,
    MessageModule,
    PasswordModule,
    CtrlErrComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isSubmitting = signal<boolean>(false);
  errorMsg = signal<string>('');

  private readonly _authApi = inject(AuthApiService);
  private readonly _router = inject(Router);
  private readonly _localStorage = inject(LocalStorageService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordRG),
      ]),
    });
  }

  showToast() {
    this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logged in successfully',
      life: 4000,
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.errorMsg.set('');

      const subscription = this._authApi.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.showToast();

          this._localStorage.set('userToken', res.token);

          this._router.navigate(['/']);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMsg.set(err.message);
        },
        complete: () => {
          this.loginForm.reset();
          this.isSubmitting.set(false);
        },
      });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
