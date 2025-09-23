import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-update-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.css',
})
export class AddUpdateCategoryComponent implements OnInit {
  id = input<string>();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(),
      image: new FormControl(),
    });
  }

  onSubmit() {
    console.log('submit form');
    console.log(this.form.value);
  }
}
