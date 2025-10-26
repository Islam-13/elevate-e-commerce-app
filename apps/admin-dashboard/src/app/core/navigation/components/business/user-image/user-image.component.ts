import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserDataService } from 'apps/admin-dashboard/src/app/shared/services/user-data.service';
import { User } from 'apps/admin-dashboard/src/app/shared/types/getLoggedUserData.interface';
import { Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-image',
  imports: [MenuModule, RouterModule],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css',
})
export class UserImageComponent implements OnInit, OnDestroy {
  isLargeScreen = input.required<boolean>();
  items: MenuItem[] | undefined;
  userData?: User;
  private destroy$ = new Subject<void>();
  
  private readonly _userData = inject(UserDataService);

  ngOnInit(): void {
    this.items = [
      {
        items: [
          {
            label: 'Account',
            icon: 'pi pi-refresh',
            routerLink: ['/settings'],
            styleClass: 'text-black ',
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

    this.getUserData();
  }
  logout() {}

  getUserData() {
    {
      this._userData
        .getLoggedUserData()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.userData = res;
            this.userData = res;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // Completes the subject
  }
}
