import { UiButtonComponent } from './../../../../../../../../libs/ui-button/src/lib/ui-button/ui-button.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserImageComponent } from '../business/user-image/user-image.component';
import { BreadCrumbComponent } from "../ui/bread-crumb.component";
import { DashboardComponent } from "../ui/dashboard/dashboard.component";

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, UiButtonComponent, UserImageComponent, BreadCrumbComponent, DashboardComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {}
