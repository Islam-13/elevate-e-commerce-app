import { Component } from '@angular/core';
import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  imports: [TranslateModule, PrimaryBtnComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {}
