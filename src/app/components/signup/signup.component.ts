import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public errors = [];

  constructor(
    private User: UserService,
    private Token: TokenService,
    private router: Router
  ) { }

  onSubmit() {
    this.User.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.errors = error.error;
  }

  ngOnInit() {
  }

}
