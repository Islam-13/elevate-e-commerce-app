import { UiButtonComponent } from '../../../../../../../../libs/ui-button/src/lib/ui-button/ui-button.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserImageComponent } from '../business/user-image/user-image.component';
import { BreadCrumbComponent } from '../ui/bread-crumb.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    UiButtonComponent,
    UserImageComponent,
    BreadCrumbComponent,
  ],
  templateUrl: './adminLayout.component.html',
  styleUrl: './adminLayout.component.css',
})
export class AdminLayoutComponent {}
