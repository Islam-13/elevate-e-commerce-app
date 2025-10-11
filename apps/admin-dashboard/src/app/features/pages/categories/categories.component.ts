import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';

import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FeatureHeadingComponent } from '../../components/feature-heading/feature-heading.component';
import { ActionBtnsComponent } from '../../components/action-btns/action-btns.component';
import { Category } from '../../../shared/types/categories';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [
    FeatureHeadingComponent,
    ActionBtnsComponent,
    TableModule,
    FormsModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories = signal<Category[]>([]);
  openId = signal<string>('');
  searchValue = signal<string>('');
  isLoading = signal<boolean>(false);

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading.set(true);
    const subscription = this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
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

  changeId(val: string) {
    this.openId.set(val);
  }
}
