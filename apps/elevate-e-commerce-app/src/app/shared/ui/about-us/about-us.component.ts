import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, PrimaryBtnComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {}
