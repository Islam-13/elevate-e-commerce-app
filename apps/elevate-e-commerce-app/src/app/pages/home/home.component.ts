import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialGiftsComponent } from "../components/special-gifts/special-gifts.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, SpecialGiftsComponent,TrustedByComponent],

import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';


  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
