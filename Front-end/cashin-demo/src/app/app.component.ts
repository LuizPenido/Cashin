import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cashin-demo';

  ngOnInit() {
    console.log(localStorage);
  }

  // test functions

  register(name: string, password: string) {
    let users = JSON.parse(localStorage.getItem('cashin-users') || JSON.stringify([]));
    users.push({ username: name, password: password});
    localStorage.setItem('cashin-users', JSON.stringify(users));
  }

  logout() {
    localStorage.removeItem('token');
  }

  show_users() {
    let users = JSON.parse(localStorage.getItem('cashin-users') || '{}');
    console.log(users);
  }

  clear_users() {
    localStorage.removeItem('cashin-users');
  }

  clear_products() {
    localStorage.removeItem('cashin-products');
  }
}

