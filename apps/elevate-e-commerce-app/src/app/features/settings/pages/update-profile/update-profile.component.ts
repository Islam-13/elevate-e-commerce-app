import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';
import { UserProfile } from '../../interfaces/UserProfile/user-profile';
import { env } from '@env/env';
import { BaseInputComponent } from "@shared/ui/base-input/base-input.component";
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '@shared/services/notification/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';
import { UserSessionService } from '@shared/services/user-session/user-session.service';
import { catchError, concat, finalize, map, of, switchMap, throwError } from 'rxjs';


@Component({
  selector: 'app-update-profile',
  imports: [CommonModule, ReactiveFormsModule, BaseInputComponent, TranslateModule, ConfirmDialog, ToastModule, ButtonModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
  providers: [ConfirmationService, MessageService]
})
export class UpdateProfileComponent implements OnInit {
  // Create Variables
  accountInfo = signal<UserProfile | null>(null)
  error = signal<string | null>(null)
  isSubmitting = signal<boolean>(false)
  avatarFile: File | null = null;


  // Call Services
  private readonly _updateProfileService = inject(UpdateProfileService);
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _userSessionService = inject(UserSessionService);
  private readonly _notfiy = inject(NotificationService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  

  // Create Form To Store Data
  updateProfileForm: FormGroup = this._formBuilder.group({
    firstName: [null, [Validators.minLength(2)]],
    lastName: [null, [Validators.minLength(2)]],
    email: [null, [Validators.email]],
    phone: [null, [Validators.pattern(env.PhoneRG)]],
    gender: [{value: null, disabled: true}, [Validators.pattern(/^(male|female)$/)]]
  });
  

  // Load user data on component initialization
  ngOnInit(): void {
    this.getLoggedUserData();
  }


  // Show confirmation dialog before deleting account 
  confirmDialog() {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete your account?This action cannot be undone.`,
      icon: 'fa-solid fa-trash !text-black  dark:!text-white',
      rejectButtonProps: {
        label: 'No, not doing it',
        styleClass: '!bg-white !px-2 !text-black !border !w-full !border-gray-300 hover:!bg-gray-100'
      },
      acceptButtonProps: {
        label: 'Yes, delete',
        styleClass: '!bg-red-500  !px-8 !text-white !border-0 hover:!bg-red-600'
      },
      accept: () => {
        this.deleteMyAccount()
      },
      reject: () => {
        this._notfiy.info('Account deletion cancelled')
      }
    });
  }


  // Fetch logged-in user profile and update form
  getLoggedUserData(): void {
    this._updateProfileService.getUserProfile()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.accountInfo.set(res);
        this.updateProfileForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          phone: res.phone,
          gender: res.gender,
        })
      },
      error: (err) => {
        this.error.set('Errorr')
      }
    })
  }


  // Send data to api
  updateProfileSubmit(): void {

    this.isSubmitting.set(true);

    const formValue = this.updateProfileForm.getRawValue();
    const originalData = this.accountInfo();

    const hasDataChanges = originalData && (
      formValue.firstName !== originalData.firstName ||
      formValue.lastName !== originalData.lastName ||
      formValue.email !== originalData.email ||
      formValue.phone !== originalData.phone
    );

    const hasAvatarChanges = !!this.avatarFile;

    if (!hasDataChanges && !hasAvatarChanges) {
      this._notfiy.info('No Data Changes.');
      this.isSubmitting.set(false);
      return;
    }

    const updateProfile$ = hasDataChanges
      ? this._updateProfileService.updateProfile({
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          phone: formValue.phone,
        }).pipe(
          map((res) => {
            this.accountInfo.set(res);
            this._notfiy.success('Profile updated successfully.');
            return res;
          }),
          catchError((err) => {
            this._notfiy.error('Failed to update profile: ' + (err.error?.message || 'Unknown error'));
            return throwError(() => err);
          })
        )
      : of(null);

    const uploadAvatar$ = hasAvatarChanges && this.avatarFile
      ? this._updateProfileService.uploadAvatar(this.avatarFile).pipe(
          map((res) => {
            if (originalData) {
              this._notfiy.success('Avatar updated successfully.');
            }
            this.avatarFile = null;
            return res;
          }),
          catchError((err) => {
            let errorMessage = 'Failed to upload avatar.';
            if (err.status === 404) {
              errorMessage = 'Upload endpoint not found. Please check the API configuration.';
            } else if (err.status === 401 || err.status === 403) {
              errorMessage = 'Authentication failed. Please log in again.';
            } else {
              errorMessage = err.error?.message || 'Unknown error occurred.';
            }
            this._notfiy.error(errorMessage);
            console.error('Avatar upload error:', err);
            return throwError(() => err);
          })
        )
      : of(null);

    concat(updateProfile$, uploadAvatar$)
      .pipe(
        finalize(() => this.isSubmitting.set(false)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (result) => {
          if ((hasDataChanges && result !== null) || (hasAvatarChanges && result !== null)) {
            this.updateProfileForm.markAsPristine();
          }
        },
        error: (err) => {
          console.error('General error:', err);
        },
        complete: () => {
          console.log('Profile update process completed.');
        }
      });
  }


  onAvatarSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) { this.avatarFile = null; return; }

    const allowed = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowed.includes(file.type)) {
      this._notfiy.error('Invalid image type.');
      input.value = '';
      return;
    }

    this.avatarFile = file;

    const info = this.accountInfo();
    const preview = URL.createObjectURL(file);
    if (info) this.accountInfo.set({ ...info, photo: preview });
  }



  // Deletes the current user account
  deleteMyAccount() {
    this._updateProfileService.deleteAccount()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        console.log(res);
        this._notfiy.success('Your account has been deleted successfully')
        this._localStorageService.remove('userToken')
        this._userSessionService.clearSession()
        this._router.navigate(['/'])
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
