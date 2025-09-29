import { Component, inject, OnDestroy, OnInit, AfterViewInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OverviewsService } from '../../services/overviews/overviews.service';
import { Ordersandrevenue } from '../../interfaces/ordersandrevenue/ordersandrevenue';

import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-orders-and-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './OrdersAndRevenue.component.html',
  styleUrls: ['./OrdersAndRevenue.component.css'],
})
export class OrdersAndRevenueComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _overviewsService = inject(OverviewsService);
  private subscription: Subscription = new Subscription();
  orders = signal<Ordersandrevenue | null>(null);

  statuses = computed(() => this.orders()?.statistics?.ordersByStatus ?? []);
  chartColors = signal<string[]>([]);
  private chart: Chart<'doughnut'> | null = null;

  constructor() {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.getOrdersAndRevenue();
  }

  ngAfterViewInit(): void {
    this.updateChart();
  }

  getOrdersAndRevenue(): void {
    const sub = this._overviewsService.getOrdersAndRevenue().subscribe({
      next: (res: Ordersandrevenue) => {
        this.orders.set(res);
        setTimeout(() => this.updateChart(), 0);
      },
      error: (err) => {
        console.error('Error fetching orders and revenue:', err);
      },
    });
    this.subscription.add(sub);
  }

  private updateChart(): void {
    const canvas = document.getElementById('ordersChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const dataArray = this.statuses();
    if (!dataArray.length) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.chartColors.set([]);
      return;
    }

    const labels = dataArray.map((o) => (o._id ?? 'Unknown').toString());
    const counts = dataArray.map((o) => Number(o.count ?? 0));
    const backgroundColor = this.generateColors(counts.length);
    this.chartColors.set(backgroundColor);

    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = counts;
      this.chart.data.datasets[0].backgroundColor = backgroundColor;
      this.chart.update();
    } else {
      const config: ChartConfiguration<'doughnut'> = {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '50%',
          events: [],
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
            datalabels: {
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: 999,
              padding: 10,
              align: 'center',
              anchor: 'center',
              offset: -10,
              clip: false,
              font: { weight: 'bold', size: 15 },
              formatter: (value: number, context) => {
                const dataset = context.chart.data.datasets[0].data as number[];
                const total = dataset.reduce((sum, val) => sum + Number(val), 0);
                const percentage = total ? Math.round((Number(value) / total) * 100) : 0;
                return`${percentage}%`;
              },
            },
          },
        },
      };

      this.chart = new Chart(canvas, config);
    }
  }

  getPercentage(count: number): string {
    const arr = this.statuses();
    const total = arr.reduce((s, it) => s + Number(it.count ?? 0), 0);
    if (!total) return '0%';
    return Math.round((Number(count) / total) * 100) + '%';
  }

  private generateColors(n: number): string[] {
    const palette = ['#00BC7D', '#2B7FFF', '#DC2626',];
    return Array.from({ length: n }, (_, i) => palette[i % palette.length]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
