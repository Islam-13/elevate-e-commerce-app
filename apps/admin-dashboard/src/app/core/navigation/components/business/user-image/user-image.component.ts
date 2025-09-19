import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-image',
  imports: [CommonModule, MenuModule],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css',
})
export class UserImageComponent implements OnInit {
  isLargeScreen = input.required<boolean>();
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
