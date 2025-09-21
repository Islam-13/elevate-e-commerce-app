import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-heading',
  imports: [],
  templateUrl: './feature-heading.component.html',
  styleUrl: './feature-heading.component.css',
})
export class FeatureHeadingComponent {
  headText = input.required<string>();
  btnText = input.required<string>();
}
