import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusOverviewComponent } from "../../components/StatusOverview/StatusOverview.component";
import { OrdersAndRevenueComponent } from "../../components/OrdersAndRevenue/OrdersAndRevenue.component";
import { ProductsSummaryComponent } from "../../components/ProductsSummary/ProductsSummary.component";

@Component({
  selector: 'app-overviews',
  imports: [CommonModule, OrdersAndRevenueComponent, ProductsSummaryComponent, StatusOverviewComponent],
  templateUrl: './overviews.component.html',
  styleUrl: './overviews.component.css',
})
export class OverviewsComponent {}
