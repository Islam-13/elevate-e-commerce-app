import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UiButtonComponent } from './../../../../../../../ui-button/src/lib/ui-button/ui-button.component';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, MenuModule, Menu, UiButtonComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-refresh',
            routerLink: '/profile',
            styleClass: 'text-black  ',
          },
          {
            label: 'Logout',
            icon: 'pi pi-upload',
            styleClass: 'text-red  ',

            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
  }

  logout() {}
}
