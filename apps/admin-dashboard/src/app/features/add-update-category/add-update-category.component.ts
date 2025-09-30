import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { Dialog } from 'primeng/dialog';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { UiButtonComponent } from 'libs/ui-button/src/lib/ui-button/ui-button.component';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { Category } from '../../shared/types/categories';

@Component({
  selector: 'app-add-update-category',
  imports: [ReactiveFormsModule, UiButtonComponent, Message, Dialog],
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.css',
})
export class AddUpdateCategoryComponent implements OnInit {
  id = input<string>();
  isSubmitting = signal<boolean>(false);

  categoryToEdit = signal<Category>({
    _id: '',
    name: '',
    slug: '',
    image: '',
    createdAt: '',
    updatedAt: '',
    productsCount: 0,
  });

  visible = signal<boolean>(false);


  form!: FormGroup;
  formImage = viewChild<ElementRef>('formImage');

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.initForm();

    if (this.id()) {
      this.getCategory(this.id()!);
    }
  }

  showDialog() {
    this.visible.set(true);
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.form.get('image')?.setValue(input.files[0]);
    }
  }


  getCategory(id: string) {
    const subscription = this._categoriesService.getCategoryById(id).subscribe({
      next: (res) => {
        this.categoryToEdit.set(res);
        this.form.patchValue({ name: res.name });
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

  addCategory() {
    this.isSubmitting.set(true);

    const subscription = this._categoriesService
      .addCategory(this.form.value)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category created successfully',
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

  updateCategory() {
    this.isSubmitting.set(true);

    const subscription = this._categoriesService
      .updateCategory(this.id()!, this.form.value)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category updated successfully',
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


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      if (this.id()) {
        this.updateCategory();
      } else this.addCategory();
    }
  }
}
