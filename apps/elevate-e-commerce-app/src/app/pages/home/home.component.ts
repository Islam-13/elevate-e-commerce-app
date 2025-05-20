import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TrustedByComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
