import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseInputComponent } from '@shared/ui/base-input/base-input.component';

@Component({
  selector: 'app-forget-password',
  imports: [BaseInputComponent, RouterLink, TranslateModule, NgTemplateOutlet],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  emailStep = viewChild.required<TemplateRef<any>>('forgetPassword');
  otpStep = viewChild.required<TemplateRef<any>>('verifyCode');
  newPaswordStep = viewChild.required<TemplateRef<any>>('updatePassword');

  currentStep!: TemplateRef<any>;

  ngOnInit() {
    this.currentStep = this.emailStep();
  }
}
