import { Chart, registerables } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { Component, DestroyRef, OnDestroy, OnInit, PLATFORM_ID, computed, inject, signal, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OverviewsService } from '../../services/overviews/overviews.service';
import { Subscription } from 'rxjs';
import { Ordersandrevenue } from '../../interfaces/ordersandrevenue/ordersandrevenue';
import { ChartConfiguration } from 'chart.js';
import { RevenueMode } from '../../interfaces/analytics/analytics';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-orders-and-revenue',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './OrdersAndRevenue.component.html',
  styleUrls: ['./OrdersAndRevenue.component.css'],
})
export class OrdersAndRevenueComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly _overviewsService = inject(OverviewsService);
  private platformId = inject(PLATFORM_ID);
  private analytics = inject(AnalyticsService);
  private destroyRef = inject(DestroyRef);

  private subscription: Subscription = new Subscription();
  orders = signal<Ordersandrevenue | null>(null);
  statuses = computed(() => this.orders()?.statistics?.ordersByStatus ?? []);
  chartColors = signal<string[]>([]);
  private chart: Chart<'doughnut'> | null = null;

  monthlyLabels: string[] = [];
  monthlyValues: number[] = [];
  dailyLabels: string[] = [];
  dailyValues: number[] = [];
  mode: RevenueMode = 'monthly';
  options: any;
  data: any;

  ngOnInit(): void {
    this.getOrdersAndRevenue();
    this.getRevenue();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateChart(), 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  getOrdersAndRevenue(): void {
    const sub = this._overviewsService.getOrdersAndRevenue().subscribe({
      next: (res: Ordersandrevenue) => {
        this.orders.set(res);
        setTimeout(() => this.updateChart(), 0);
      },
      error: (err) => console.error('Error fetching orders and revenue:', err),
    });
    this.subscription.add(sub);
  }

  private updateChart(): void {
    const canvas = document.getElementById('ordersChart') as HTMLCanvasElement | null;
    if (!canvas) return;
    const rawStatuses = this.statuses();

    if (!rawStatuses || rawStatuses.length === 0) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.chartColors.set([]);
      return;
    }

    const allColors = this.generateColors(rawStatuses.length);
    this.chartColors.set(allColors);
    const chartItems = rawStatuses.filter(s => s.count != null && Number(s.count) > 0);
    const labels = chartItems.map(s => (s._id ?? 'Unknown').toString());
    const counts = chartItems.map(s => Number(s.count ?? 0));
    const sliceColors = this.generateColors(chartItems.length);

    if (counts.length === 0) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      return;
    }

    if (this.chart) {
      this.chart.data.labels = labels as any;
      this.chart.data.datasets[0].data = counts as any;
      (this.chart.data.datasets[0] as any).backgroundColor = sliceColors;
      this.chart.update();
    } else {
      const config: ChartConfiguration<'doughnut'> = {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor: sliceColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '50%',
        plugins: {
  tooltip: { enabled: false },
  legend: { display: false },
  datalabels: {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 8,
    align: 'center',
    anchor: 'center',
    offset: -10,
    clip: false,
    font: { weight: 'bold', size: 12 },
    formatter: (value: number, context) => {
  const dataset = context.chart.data.datasets[0].data as number[];
  const total = dataset.reduce((sum, val) => sum + Number(val), 0);
  const percent = total ? (Number(value) / total) * 100 : 0;

  if (percent === 0) return '';
  return percent < 1 ? `${percent.toFixed(2)}%` : `${percent.toFixed(1)}%`;
},
  },
},
        },
      };
      this.chart = new Chart(canvas, config);
    }
  }

  getPercentage(count: number): string {
    const arr = this.statuses().filter(s => s.count != null && Number(s.count) > 0);
    const total = arr.reduce((s, it) => s + Number(it.count ?? 0), 0);
    if (!total) return '0%';
    const percent = (Number(count) / total) * 100;
    return percent.toFixed(1) + '%';
  }

  private generateColors(n: number): string[] {
    const palette = ['#00BC7D', '#2B7FFF', '#DC2626'];
    return Array.from({ length: n }, (_, i) => palette[i % palette.length]);
  }

  getRevenue() {
    this.analytics.getRevenue()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (rev) => {
          this.monthlyLabels = rev.monthlyLabels;
          this.monthlyValues = rev.monthlyValues;
          this.dailyLabels = rev.dailyLabels;
          this.dailyValues = rev.dailyValues;
          this.applyMode(this.mode);
        },
        error: (err) => console.log(err),
      });
  }

  showMonthly() { this.applyMode('monthly'); }
  showDaily() { this.applyMode('daily'); }
  applyMode(mode: RevenueMode) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.mode = mode;
    const labels = mode === 'monthly' ? this.monthlyLabels : this.dailyLabels;
    const values = mode === 'monthly' ? this.monthlyValues : this.dailyValues;
    const dataset = {
      label: mode === 'monthly' ? 'Monthly' : 'Daily',
      data: values,
      borderColor: '#7f1d1d',
      borderWidth: 2,
      tension: 0.35,
      pointRadius: 3,
      pointBackgroundColor: '#7f1d1d',
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#7f1d1d',
      fill: 'origin',
      backgroundColor: (ctx: any) => {
        const { chart } = ctx;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return 'rgba(127,29,29,0.15)';
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, 'rgba(166, 37, 42, 0.50)');
        g.addColorStop(1, 'rgba(248, 177, 239, 0.00)');
        return g;
      }
    };

    this.data = { labels, datasets: [dataset] };

    this.options = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (ctx: any) => `${ctx.parsed.y} EGP`,
          },
        },
        datalabels: { display: false },
      },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,0.06)' } },
        y: { beginAtZero: true, min: 0 },
      },
      elements: { line: { capBezierPoints: true } },
      interaction: { intersect: false, mode: 'index' },
    };
  }
}
