import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfile } from '../../interfaces/UserProfile/user-profile';
import { env } from '@env/env';
import { BaseInputComponent } from "@shared/ui/base-input/base-input.component";
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from '@shared/services/notification/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type Country = { code: string; name: string; dialCode: number; flag: string };

@Component({
  selector: 'app-update-profile',
  imports: [CommonModule, ReactiveFormsModule, BaseInputComponent, TranslateModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  // Create Variables

  userData = signal<UserProfile | null>(null)
  error = signal<string | null>(null)

  // Call Services
  private readonly _updateProfileService = inject(UpdateProfileService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _notfiy = inject(NotificationService);
  private readonly _destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this._updateProfileService.getUserProfile()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.userData.set(res);
        console.log(this.userData());
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

  // Create Form To Store Data
  updateProfileForm: FormGroup = this._formBuilder.group({
    firstName: [null, [Validators.minLength(2)]],
    lastName: [null, [Validators.minLength(2)]],
    email: [null, [Validators.email]],
    phone: [null, [Validators.pattern(env.PhoneRG)]],
    gender: [null, [Validators.pattern(/^(male|female)$/)]]
  });

  // Send data to api
  updateProfileSubmit() {
    if (this.updateProfileForm.invalid) {
      this.updateProfileForm.markAllAsTouched();
      return;
    }
    const { gender, ...payload} = this.updateProfileForm.getRawValue();
    this._updateProfileService.updateProfile(payload)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        console.log(res);
        this._notfiy.success('Your profile has been updated.');
      },
      error: (err) => {
        console.log(err);
        this._notfiy.error('Something went wrong.')
      }
    })
  }

  onAvatarSelected(e: Event) {
    // const input = e.target as HTMLInputElement;
    // const file = input.files?.[0];
    // this.avatarError.set(null);

    // if (!file) return;
    // const extOk = /image\/(png|jpeg|gif)/.test(file.type);
    // if (!extOk) { this.avatarError.set('Only .jpg, .png or .gif are allowed.'); input.value = ''; return; }
    // if (file.size > this.MAX_SIZE) { this.avatarError.set('File is larger than 5MB.'); input.value = ''; return; }

    // if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    // this.objectUrl = URL.createObjectURL(file);
  }

  confirmDelete() {
    const ok = window.confirm('Are you sure you want to delete your account?');
    if (ok) {
      console.log('Delete account…');
    }
  }

}
