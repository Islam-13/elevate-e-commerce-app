import { Component, inject, input, output, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-btns',
  imports: [ConfirmDialogModule, RouterLink],
  templateUrl: './action-btns.component.html',
  styleUrl: './action-btns.component.css',
})
export class ActionBtnsComponent {
  isOpen = input.required<boolean>();
  isDeleting = signal<boolean>(false);

  categoryId = input.required<string>();
  openId = input.required<string>();
  message = input.required<string>();
  editNavigate = input.required<string>();
  setOpenId = output<string>();
  setIsOpen = output<boolean>();
  deleteItem = output();

  private readonly _confirm = inject(ConfirmationService);
  private readonly _toast = inject(MessageService);

  toggleMenu(e: Event) {
    e.stopPropagation();

    if (this.openId() === '' || this.openId() !== this.categoryId()) {
      this.openMenu();
    } else this.closeMenu();
  }

  openMenu() {
    this.setIsOpen.emit(true);
    this.setOpenId.emit(this.categoryId());
  }

  closeMenu() {
    this.setIsOpen.emit(false);
    this.setOpenId.emit('');
  }

  confirm2(event: Event) {
    this._confirm.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete this ${this.message()}?`,
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this._confirm.close();

        this.deleteItem.emit();
      },
      reject: () => {
        this._confirm.close();
        this._toast.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
