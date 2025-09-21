import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { TableModule } from 'primeng/table';
import { FeatureHeadingComponent } from '../components/feature-heading/feature-heading.component';
import { Category } from '../../shared/types/categories';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { ActionBtnsComponent } from '../components/action-btns/action-btns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [FeatureHeadingComponent, ActionBtnsComponent, TableModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories = signal<Category[]>([]);
  openId = signal<string>('');
  loading = signal<boolean>(false);
  globalFilter = '';
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    const subscription = this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
        console.log('test');
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  changeId(val: string) {
    this.openId.set(val);
  }
}
