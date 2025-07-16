import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateMangerService } from '@shared/services/translate/translate.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  _lang = inject(TranslateMangerService);
}
