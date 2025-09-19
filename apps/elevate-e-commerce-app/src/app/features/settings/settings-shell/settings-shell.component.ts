import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSidebarComponent } from "../components/settings-sidebar/settings-sidebar.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-shell',
  imports: [CommonModule, SettingsSidebarComponent, RouterModule, TranslateModule],
  templateUrl: './settings-shell.component.html',
  styleUrl: './settings-shell.component.css',
})
export class SettingsShellComponent {}
