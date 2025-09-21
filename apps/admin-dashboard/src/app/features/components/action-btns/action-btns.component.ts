import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-action-btns',
  imports: [ConfirmDialogModule],
  templateUrl: './action-btns.component.html',
  styleUrl: './action-btns.component.css',
})
export class ActionBtnsComponent {
  isOpen = signal<boolean>(false);
  isDeleting = signal<boolean>(false);

  categoryId = input.required<string>();
  openId = input.required<string>();
  setOpenId = output<string>();

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _confirm = inject(ConfirmationService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  toggleMenu(e: Event) {
    e.stopPropagation();

    if (this.openId() === '' || this.openId() !== this.categoryId()) {
      this.openMenu();
    } else this.closeMenu();
  }

  openMenu() {
    this.isOpen.set(true);
    this.setOpenId.emit(this.categoryId());
  }

  closeMenu() {
    this.isOpen.set(false);
    this.setOpenId.emit('');
  }

  confirm2(event: Event) {
    this._confirm.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this category?',
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

        this.deleteCategory();
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

  deleteCategory() {
    this.isDeleting.set(true);

    const subscription = this._categoriesService
      .deleteCategory(this.categoryId())
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category delated successfully',
          });
        },
        error: (err) => {
          this._toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
        },
        complete: () => {
          this.isDeleting.set(false);
        },
      });

    this._destroyRef.onDestroy(() => subscription.unsubscribe);
  }
}
