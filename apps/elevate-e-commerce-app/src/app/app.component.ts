import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from '@shared/services/toast/toast.service';
import { ToastComponent } from '@shared/ui/toast/toast.component';

@Component({
  imports: [RouterOutlet, ToastComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Rose | e-commerce';

  _toast = inject(ToastService);
}
