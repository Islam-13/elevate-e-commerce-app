import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { VerifyCodeComponent } from '../verifyCode/verifyCode.component';
import { UpdatePasswordComponent } from '../updatePassword/updatePassword.component';

@Component({
  selector: 'app-forget-password-steps',
  imports: [
    NgTemplateOutlet,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    UpdatePasswordComponent,
  ],
  templateUrl: './forget-password-steps.component.html',
  styleUrl: './forget-password-steps.component.css',
})
export class ForgetPasswordStepsComponent implements OnInit {
  emailStep = viewChild.required<TemplateRef<any>>('forgetPassword');
  otpStep = viewChild.required<TemplateRef<any>>('verifyCode');
  newPaswordStep = viewChild.required<TemplateRef<any>>('updatePassword');

  currentStep!: TemplateRef<any>;

  ngOnInit() {
    this.currentStep = this.emailStep();
  }

  onEmail() {
    this.currentStep = this.otpStep();
  }

  onCode() {
    this.currentStep = this.newPaswordStep();
  }
}
