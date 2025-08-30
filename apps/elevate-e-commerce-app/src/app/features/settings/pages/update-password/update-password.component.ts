import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';
import { env } from '@env/env';
import { equalValues } from '@shared/utils/validateRePassword';
import { BaseInputComponent } from "@shared/ui/base-input/base-input.component";
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '@shared/services/notification/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  imports: [CommonModule, ReactiveFormsModule, BaseInputComponent, TranslateModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent {
  // Call services
  isSubmitting = signal<boolean>(false)

  // Call services
  private readonly _updateProfileService = inject(UpdateProfileService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef)
  private readonly _fb = inject(FormBuilder)

  // Create Form To Store Data
  changePasswordForm: FormGroup = this._fb.group({
    password: [null, [Validators.required, Validators.pattern(env.passwordRG)]],
    newPassword: [null, [Validators.required, Validators.pattern(env.passwordRG)]],
    reNewPassword: [null, [Validators.required,]],
  },{
    validators: [equalValues('newPassword', 'reNewPassword')],
  })


  // Send Data To Api
  changePasswordSubmit(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true)
    const {reNewPassword, ...payload} = this.changePasswordForm.getRawValue();
    this._updateProfileService.changePassword(payload)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.isSubmitting.set(false)
        console.log(res);
        this._localStorageService.set('userToken', res.token)
        this._notificationService.success('Your password hes been updated')
        this._router.navigateByUrl('/settings/profile')
      },
      error: (err) => {
        this.isSubmitting.set(false)
        console.log(err);
        this._notificationService.error('Something went wrong')
      }
    })
  }

}
