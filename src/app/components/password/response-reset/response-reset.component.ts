import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../Services/user.service";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public errors = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    reset_token: null
  }

  constructor(private route: ActivatedRoute, private User: UserService, private router: Router) {
    route.queryParams.subscribe(params => this.form.reset_token = params['token']);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.User.resetPassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl('login');
  }

  handleError(error) {
    this.errors = error.error;
  }

}
