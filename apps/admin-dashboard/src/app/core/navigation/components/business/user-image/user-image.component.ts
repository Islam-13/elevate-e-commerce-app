import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserDataService } from 'apps/admin-dashboard/src/app/shared/services/user-data.service';
import { User } from 'apps/admin-dashboard/src/app/shared/types/getLoggedUserData.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-image',
  imports: [MenuModule],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css',
})
export class UserImageComponent implements OnInit, OnDestroy {
  isLargeScreen = input.required<boolean>();
  items: MenuItem[] | undefined;
  private readonly _userData = inject(UserDataService);
  userData?: User;
  private destroy$ = new Subject<void>();
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
          error: (err) => {
            //console.log(err.error.error);
            //  this._toastService.showError(err.error.error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // Completes the subject
  }
}
