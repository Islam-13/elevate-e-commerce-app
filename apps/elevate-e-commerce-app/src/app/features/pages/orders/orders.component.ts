import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { OrderDTO } from './interfaces/orders.interface';
import { OrderService } from './services/order.service';
import { LoaderComponent } from '@shared/ui/loader/loader.component';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: OrderDTO[] = [] as OrderDTO[];
  private destroy$ = new Subject<void>();
  loading: boolean = false;
  private readonly OrderService = inject(OrderService);
  expandedOrders: Set<string> = new Set();
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.loading = true;
    this.OrderService.getUserOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading = false;
          //  console.log('API Response:', res);
          this.orders = res.orders;
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }
  toggleOrder(orderId: string) {
    if (this.expandedOrders.has(orderId)) {
      this.expandedOrders.delete(orderId);
    } else {
      this.expandedOrders.add(orderId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
