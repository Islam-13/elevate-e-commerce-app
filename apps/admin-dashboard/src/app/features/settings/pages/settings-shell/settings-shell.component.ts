import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-settings-shell',
  imports: [CommonModule, RouterModule],
  templateUrl: './settings-shell.component.html',
  styleUrl: './settings-shell.component.css',
})
export class SettingsShellComponent {}
