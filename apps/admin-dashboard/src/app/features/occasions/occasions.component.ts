import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { FeatureHeadingComponent } from '../components/feature-heading/feature-heading.component';
import { ActionBtnsComponent } from '../components/action-btns/action-btns.component';
import { OccasionsService } from '../../shared/services/occasions/occasions.service';
import { Occasion } from '../../shared/types/occasions';

@Component({
  selector: 'app-occasions',
  imports: [
    FeatureHeadingComponent,
    FormsModule,
    TableModule,
    ActionBtnsComponent,
  ],
  templateUrl: './occasions.component.html',
  styleUrl: './occasions.component.css',
})
export class OccasionsComponent implements OnInit {
  occasions = signal<Occasion[]>([]);
  isOpen = signal<boolean>(false);
  openId = signal<string>('');
  searchValue = signal<string>('');
  isLoading = signal<boolean>(false);

  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.getAllOccasions();
  }

  getAllOccasions() {
    this.isLoading.set(true);

    const subscription = this._occasionsService.getAllOccasions().subscribe({
      next: (data) => {
        this.occasions.set(data);
      },
      error: (err) => {
        this._toast.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      },
      complete: () => this.isLoading.set(false),
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  deleteOccasion(id: string) {
    this.isLoading.set(true);

    const subscription = this._occasionsService.deleteOccasion(id).subscribe({
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
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe);
  }

  changeId(val: string) {
    this.openId.set(val);
  }

  toggleIsOpen(event: boolean) {
    this.isOpen.set(event);
  }
}
