import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.service.login();
  }
}
