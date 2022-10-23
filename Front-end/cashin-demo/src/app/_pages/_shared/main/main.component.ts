import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService : LoginService
  ) { }

  ngOnInit(): void {
  }

  get routerObject(): Router {
    return this.router
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

  getUserAccess(): any {
    return this.loginService.userAccess;
  }

}
