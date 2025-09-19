import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { Store } from '@ngrx/store';
import { SessionActions } from '../../../../store/auth-session/session.actions';

@Component({
  selector: 'app-settings-sidebar',
  imports: [CommonModule, RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css',
})
export class SettingsSidebarComponent {
  // Call services
  private readonly _updateProfileService = inject(UpdateProfileService)
  private readonly _notify = inject(NotificationService)
  private readonly _router = inject(Router)
  private readonly store = inject(Store)

  logout() {
    this._updateProfileService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.store.dispatch(SessionActions.clear())
        this._router.navigate(['/'])
        this._notify.success('You have been signed out successfully')
      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
  }
}
