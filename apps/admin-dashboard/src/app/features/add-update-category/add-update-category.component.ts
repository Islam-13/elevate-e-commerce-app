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
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UiButtonComponent } from 'libs/ui-button/src/lib/ui-button/ui-button.component';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-add-update-category',
  imports: [ReactiveFormsModule, UiButtonComponent, Message],
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.css',
})
export class AddUpdateCategoryComponent implements OnInit {
  id = input<string>();
  isSubmitting = signal<boolean>(false);

  form!: FormGroup;
  formImage = viewChild<ElementRef>('formImage');

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
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

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
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
  }
}
