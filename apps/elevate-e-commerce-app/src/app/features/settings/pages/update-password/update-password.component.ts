import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';
import { env } from '@env/env';
import { equalValues } from '@shared/utils/validateRePassword';
import { BaseInputComponent } from "@shared/ui/base-input/base-input.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-password',
  imports: [CommonModule, ReactiveFormsModule, BaseInputComponent, TranslateModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent {
  //Call services
  private readonly _updateProfileService = inject(UpdateProfileService);
  private readonly fb = inject(FormBuilder)

  changePasswordForm: FormGroup = this.fb.group({
    password: [null, [Validators.required, Validators.pattern(env.passwordRG)]],
    newPassword: [null, [Validators.required, Validators.pattern(env.passwordRG)]],
    reNewPassword: [null, [Validators.required,]],
  },{
    validators: [equalValues('newPassword', 'reNewPassword')],
  })

  changePasswordSubmit(): void {

  }

}
