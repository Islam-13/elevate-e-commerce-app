import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewsService } from '../../services/overviews/overviews.service';
import { Subscription } from 'rxjs';
import { Statistics, Overall } from '../../interfaces/getallstatistics/getallstatistics';
import { Statistic } from '../../interfaces/getcategorystatistics/getcategorystatistics';

@Component({
  selector: 'app-status-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './StatusOverview.component.html',
  styleUrls: ['./StatusOverview.component.css'],
})
export class StatusOverviewComponent implements OnInit, OnDestroy {

  private readonly _overviewsService = inject(OverviewsService);
  private subscription: Subscription = new Subscription();

  overall = signal<Overall | null>(null);
  category = signal<Statistic[]>([]);

  getAllStatistics(): void {
    const sub = this._overviewsService.getAllStatistics().subscribe({
      next: (res: Statistics) => {
        this.overall.set(res.overall);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.subscription.add(sub);
  }

  getCategoryStatistics(): void {
    const sub = this._overviewsService.getCategoryStatistics().subscribe({
      next: (res) => {
        this.category.set(res);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
    this.subscription.add(sub);
  }
formatNumber(num: number | undefined | null): string {
  if (num == null) return '0';

  if (num >= 1_000_000) {
    return Math.round(num / 1_000).toLocaleString() + ' EGP';
  }

  if (num >= 1_000) {
    return Math.round(num / 1_000).toLocaleString() + ' EGP';
  }

  return num.toLocaleString() + ' EGP';
}

  ngOnInit(): void {
    this.getAllStatistics();
    this.getCategoryStatistics();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
