import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Call Services
  private readonly toast = inject(MessageService);
  
  success(detail: string, summary = 'Success', life = 3000) {
    this.toast.add({ severity: 'success', summary, detail, life });
  }
  error(detail: string, summary = 'Error', life = 3000) {
    this.toast.add({ severity: 'error', summary, detail, life });
  }

}
