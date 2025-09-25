import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bread-crumb',
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css',
})
export class BreadCrumbComponent implements OnInit {
  items!: Observable<MenuItem[]>;
  breadcrumbs = inject(BreadcrumbService);

  constructor() {
    this.items = this.breadcrumbs.breadcrumbs$;
  }
  ngOnInit(): void {}
}
