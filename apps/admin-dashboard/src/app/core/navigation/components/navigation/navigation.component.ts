import { UiButtonComponent } from './../../../../../../../../libs/ui-button/src/lib/ui-button/ui-button.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserImageComponent } from '../business/user-image/user-image.component';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, UiButtonComponent, UserImageComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {}
