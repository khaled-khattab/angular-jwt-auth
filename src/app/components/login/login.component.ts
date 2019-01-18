import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../Services/user.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }

  public error = null;

  constructor(
    private User: UserService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  onSubmit() {
    return this.User.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
