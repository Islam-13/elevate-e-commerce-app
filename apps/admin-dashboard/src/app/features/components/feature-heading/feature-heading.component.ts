import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-heading',
  imports: [RouterLink],
  templateUrl: './feature-heading.component.html',
  styleUrl: './feature-heading.component.css',
})
export class FeatureHeadingComponent {
  headText = input.required<string>();
  btnText = input.required<string>();
  addBtnNavigate = input.required<string>();
}
