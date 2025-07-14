import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';
import { PrimaryBtnComponent } from '@shared/ui/primary-btn/primary-btn.component';

@Component({
  selector: 'app-login',
  imports: [
    BaseInputComponent,
    RouterLink,
    TranslateModule,
    PrimaryBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
