import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-sidebar',
  imports: [CommonModule, RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css',
})
export class SettingsSidebarComponent {}
