import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbTokenService } from '@nebular/auth';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  setting: boolean = false;
  userRole: string | any = '';
  constructor(
    private nbTokenService: NbTokenService,
    private router: Router,
    private role: RoleService
  ) {}

  ngOnInit(): void {
    this.userRole = this.role.userRole;
  }

  settingOpen() {
    this.setting = !this.setting;
  }

  logout(): void {
    console.log('logout');
    this.nbTokenService.clear().subscribe((res) => {
      this.router.navigate(['/auth']);
    });
  }
}
