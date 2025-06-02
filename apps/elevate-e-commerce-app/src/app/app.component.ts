import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from '@shared/ui/footer/footer.component';



@Component({
  imports: [HomeComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
