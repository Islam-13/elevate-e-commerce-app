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
import { Dialog } from 'primeng/dialog';
import { Message } from 'primeng/message';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { UiButtonComponent } from 'libs/ui-button/src/lib/ui-button/ui-button.component';
import { OccasionsService } from '../../shared/services/occasions/occasions.service';
import { Occasion } from '../../shared/types/occasions';

@Component({
  selector: 'app-add-update-occasion',
  imports: [ReactiveFormsModule, Message, Dialog, UiButtonComponent],
  templateUrl: './add-update-occasion.component.html',
  styleUrl: './add-update-occasion.component.css',
})
export class AddUpdateOccasionComponent implements OnInit {
  id = input<string>();
  isSubmitting = signal<boolean>(false);
  occasionToEdit = signal<Occasion>({
    _id: '',
    name: '',
    slug: '',
    image: '',
    createdAt: '',
    updatedAt: '',
    productsCount: 0,
    isSuperAdmin: true,
  });

  visible = signal<boolean>(false);

  form!: FormGroup;
  formImage = viewChild<ElementRef>('formImage');

  private readonly _occasionsService = inject(OccasionsService);
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
    const subscription = this._occasionsService.getOccasionById(id).subscribe({
      next: (res) => {
        this.occasionToEdit.set(res);
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

  addOccasion() {
    this.isSubmitting.set(true);

    const subscription = this._occasionsService
      .addOccasion(this.form.value)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Occasion created successfully',
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

  updateOccasion() {
    this.isSubmitting.set(true);

    const subscription = this._occasionsService
      .updateOccasion(this.id()!, this.form.value)
      .subscribe({
        next: () => {
          this._toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Occasion updated successfully',
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
        this.updateOccasion();
      } else this.addOccasion();
    }
  }
}
