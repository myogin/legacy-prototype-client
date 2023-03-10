import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit(): void {}

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'right');
  }
}
