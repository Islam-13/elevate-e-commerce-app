import { UiButtonComponent } from './../../../../../../../../libs/ui-button/src/lib/ui-button/ui-button.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { UserImageComponent } from '../business/user-image/user-image.component';
import { BreadCrumbComponent } from "../ui/bread-crumb.component";
 

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, UiButtonComponent, UserImageComponent, BreadCrumbComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  ngOnInit(): void {}
}
