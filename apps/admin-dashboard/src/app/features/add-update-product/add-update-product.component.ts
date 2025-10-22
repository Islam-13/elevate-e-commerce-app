import { Component, DestroyRef, ElementRef, inject, Input, input, signal, ViewChild, viewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UiButtonComponent } from '../../../../../../libs/ui-button/src/lib/ui-button/ui-button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../shared/services/products/products.service';
import { Product } from '../../shared/types/products';
import { FileUploadModule } from 'primeng/fileupload';
import { Toast } from "primeng/toast";
import { Button, ButtonDirective, ButtonModule } from "primeng/button";
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { Category } from '../../shared/types/categories';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute } from '@angular/router';
import { FormErrorComponent } from "../../shared/components/form-error/form-error.component";
import { NgClass } from '@angular/common';
import { OccasionsService } from '../../shared/services/occasions/occasions.service';
import { Occasion } from '../../shared/types/occasions';
import { Dialog, DialogModule } from "primeng/dialog";
import { Carousel } from 'primeng/carousel';



@Component({
  selector: 'app-add-update-product',
  imports: [ReactiveFormsModule, UiButtonComponent, Message, FileUploadModule, Toast, Button, DropdownModule, FormErrorComponent, NgClass, Dialog, Carousel, ButtonDirective,DialogModule, ButtonModule],
  templateUrl: './add-update-product.component.html',
  styleUrl: './add-update-product.component.css',
   
})
export class AddUpdateProductComponent {
  // @Input() productId: string | null = null;
  id = input<string>();
  isEditMode=false;
  productId!: string;
  
  isSubmitting = signal<boolean>(false);
form!: FormGroup;
formImage = viewChild<ElementRef>('formImage');
product!:Product
selectedCoverName = '';
selectedGalleryNames = '';
isLoading = signal<boolean>(false);
categories = signal<Category[]>([]);
occasions = signal<Occasion[]>([]);

visibleCover = signal<boolean>(false);;
visibleGallery = signal<boolean>(false);;
responsiveOptions: any[] | undefined;

productToEdit = signal<Product>({
rateAvg: 0,
rateCount: 0,
  _id: '',
  title: '',
  slug: '',
  description: '',
  imgCover: '',
  images: [],
  price: 0,
  priceAfterDiscount: 0,
  quantity: 0,
  category: '',
  occasion: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  isSuperAdmin: true,
  sold: 0,
  id: '',
  discount:0,
  });

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);
 private readonly _fb = inject(FormBuilder);
  private readonly _route = inject(ActivatedRoute);


ngOnInit(): void {
    this.initForm();
    this.form.get('price')?.valueChanges.subscribe(() => this.updateAfterDiscount());
  this.form.get('discount')?.valueChanges.subscribe(() => this.updateAfterDiscount());
  this.getAllCategories();
  this.getAllOccasions();
     if (this.id()) {
      this.getProduct(this.id()!);
    }

   this._route.paramMap.subscribe(params => {
  const id = params.get('id');
  if (id) {
    this.isEditMode = true;
    this.productId = id;
    this.loadProductData(id);
  }
  this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  
});
 
  }
  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      discount: new FormControl('', [Validators.max(100),Validators.min(1)]),
      priceAfterDiscount: new FormControl([{ value: null, disabled: true }]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      imgCover: new FormControl(null, [Validators.required]),
      productGallery: new FormControl([null], [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      occasion: new FormControl(null, [Validators.required]),
      
      
   
    });

  
  }
   loadProductData(id: string) {
    this._ProductsService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.form.patchValue({
          title: product.title,
          description: product.description,
          price: product.price,
          discount: product.discount,
          priceAfterDiscount: product.priceAfterDiscount,
          quantity:product.quantity,
          imgCover: product.imgCover,
          productGallery: product.images,
          category: product.category,
          occasion: product.occasion
        });

      },
      error: (err) => {
        this._toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product data',
        });
      }
    });
  }

onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
     this.updateProduct()
    } else {
      if (this.id()) {
        this.updateProduct();
      } else this.addProduct();
    }
  }

updateAfterDiscount() {
  const price = this.form.get('price')?.value || 0;
  const discount = this.form.get('discount')?.value || 0;
  const afterDiscount = price - (price * discount / 100);
  this.form.get('priceAfterDiscount')?.setValue(afterDiscount, { emitEvent: false });
}

onCoverChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const file = input.files[0];
    this.form.get('imgCover')?.setValue(file);
    this.selectedCoverName = file.name;
  }
}

onGalleryChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const files = Array.from(input.files);
    this.form.get('productGallery')?.setValue(files);
    this.selectedGalleryNames = files.map(f => f.name).join(', ');
  }
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
onCategoryChange(event: any) {
   const value: string = event.value; 
  this.form.get('category')?.setValue(value);
  this.form.get('category')?.markAsTouched();
  this.form.get('category')?.markAsDirty();

  console.log('selected category id =', value);
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

onOccasionChange(event: any) {
   const value: string = event.value; 
  this.form.get('occasion')?.setValue(value);
  this.form.get('occasion')?.markAsTouched();
  this.form.get('occasion')?.markAsDirty();

  console.log('selected occasion id =', value);
}


  

  getProduct(id: string) {
    const subscription = this._ProductsService.getProductById(id).subscribe({
      next: (res) => {
        this.productToEdit.set(res);
        this.form.patchValue({ title: res.title });
      },
      error: () => {
        console.log('err');
      },
      complete: () => {
        console.log('done');
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  addProduct() {
    this.isSubmitting.set(true);
//  const data = this.form.getRawValue();
    const subscription = this._ProductsService
      .addProduct(this.form.value)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product created successfully',
          });
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this._toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
        },
        complete: () => {
          this.form.reset();
          this.isSubmitting.set(false);
        },
      });
    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updateProduct() {
    this.isSubmitting.set(true);

    const subscription = this._ProductsService
      .updateProduct(this.id()!, this.form.value)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated successfully',
          });
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this._toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
        },
        complete: () => {
          this.form.reset();
          this.isSubmitting.set(false);
        },
      });
    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  showCoverDialog() {
  this.visibleCover.set(true);
}

showGalleryDialog() {
    this.visibleGallery.set(true);

}


  // ViewChild للـ carousel
  @ViewChild('galleryCarousel', { static: false }) galleryCarousel?: Carousel;

  // صفحة/مؤشر الكاروسيل الحالي (نفس الاسم اللي ربطناه في [(page)])
  currentCarouselPage = 0;

  // trackBy لتحسين أداء ngFor
  trackByIndex(index: number, item: any) {
    return index;
  }

  // Getter لمؤشر الصورة الفعلية (تستطيع تعديلها لو تحب أن الدوت يمثل صفحة بدل صورة)
  get currentImageIndex(): number {
    return this.currentCarouselPage ?? 0;
  }

  // التنقل لدوت محدد
  goToIndex(i: number) {
    this.currentCarouselPage = i;
    // لو حابب تزحف فعليًا في الكاروسيل (إذا كان p-carousel يحتاج استدعاء method)، يمكنك استخدام:
    // this.galleryCarousel?.scrollTo(i);
  }

  // next / prev (لا تغيرت منطق البيانات، مجرد تحكم عرضي)
  nextImage() {
    const images = (this.productToEdit && this.productToEdit().images) || [];
    if (!images.length) return;
    const max = images.length - 1;
    this.currentCarouselPage = this.currentCarouselPage >= max ? 0 : this.currentCarouselPage + 1;
  }

  prevImage() {
    const images = (this.productToEdit && this.productToEdit().images) || [];
    if (!images.length) return;
    const max = images.length - 1;
    this.currentCarouselPage = this.currentCarouselPage <= 0 ? max : this.currentCarouselPage - 1;
  }
  // مؤشر الصفحة (page index) الذي نربطه بخاصية [page]


// (اختياري) دالة مقصودة لمعالجة حدث onPage إن أردت عمل شيء إضافي
onCarouselPage(event: { page: number }) {
  // لو حبيت تعمل تحكم إضافي أو تسجيل
  this.currentCarouselPage = event.page;
  // console.log('carousel page changed to', event.page);
}

}




