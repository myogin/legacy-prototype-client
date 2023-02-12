import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private user: RoleService, private http: HttpClient) {
    console.log(user);
  }

  ngOnInit(): void {}

  testRequest(): void {
    const req = this.http.get<any>('http://localhost:8000/api/v1');
    req.subscribe((res) => {
      console.log(res);
    });
  }
}
