import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiButtonComponent } from './../../../../../../../ui-button/src/lib/ui-button/ui-button.component';
import { UserImageComponent } from '../business/user-image/user-image.component';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, UiButtonComponent, UserImageComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  ngOnInit(): void {}
}
