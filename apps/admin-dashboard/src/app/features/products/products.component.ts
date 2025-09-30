import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FeatureHeadingComponent } from '../components/feature-heading/feature-heading.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ActionBtnsComponent } from '../components/action-btns/action-btns.component';
import { Product } from '../../shared/types/products';
import { ProductsService } from '../../shared/services/products/products.service';
import { MessageService } from 'primeng/api';
import { AddUpdateProductComponent } from '../add-update-product/add-update-product.component';


@Component({
  selector: 'app-products',
  imports: [
    FeatureHeadingComponent,
    TableModule,
    FormsModule,
    ActionBtnsComponent,
    AddUpdateProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  searchValue = signal<string>('');
  openId = signal<string>('');
  isLoading = signal<boolean>(false);


    selectedProduct = signal<Product | null>(null);
  isEditMode = signal<boolean>(false);



  private readonly _productsService = inject(ProductsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.getAllProducts();
 

  
  }
  // existing code...

  onEdit(product: Product) {
    this.selectedProduct.set(product);
    this.isEditMode.set(true);
  }

  onCloseForm() {
    this.selectedProduct.set(null);
    this.isEditMode.set(false);
  }

  // called after saved from child
  onSaved() {
    this.onCloseForm();
    this.getAllProducts(); // reload list
  }

  getAllProducts() {
    this.isLoading.set(true);

    const subscription = this._productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data);
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

  deleteProduct(id: string) {
    this.isLoading.set(true);

    const subscription = this._productsService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product deleted successfully',
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
}
