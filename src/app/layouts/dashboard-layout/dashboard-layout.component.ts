import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbTokenService } from '@nebular/auth';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  setting: boolean = false;
  constructor(private nbTokenService: NbTokenService, private router: Router) {}

  ngOnInit(): void {}

  settingOpen() {
    this.setting = !this.setting;
  }

  logout(): void {
    console.log('logout');

    // this.authService.logout('email').subscribe((res) => {
    //   res.isSuccess() && this.router.navigate(['/auth']);
    // });

    this.nbTokenService.clear().subscribe((res) => {
      this.router.navigate(['/auth']);
    });
  }
}
