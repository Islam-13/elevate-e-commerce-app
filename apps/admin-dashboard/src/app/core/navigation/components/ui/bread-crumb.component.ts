import { RouterLinkActive } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../services/breadcrumb.service';
@Component({
  selector: 'app-bread-crumb',
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css',
})
export class BreadCrumbComponent implements OnInit {
  items: MenuItem[] = [];
  breadcrumbs = inject(BreadcrumbService);

  ngOnInit(): void {
    this.items = this.breadcrumbs.breadcrumbs;
    console.log(this.items);
    
  }
}
