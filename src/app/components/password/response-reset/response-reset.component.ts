import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../Services/user.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    reset_token: null
  }

  constructor(
    private route: ActivatedRoute,
    private User: UserService,
    private router: Router,
    private Notify: SnotifyService
  ) {
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
    let _router = this.router;
    this.Notify.confirm('Done! now login with the new password', {
      buttons: [
        {
          text: 'Okay',
          action: toaster => {
            this.Notify.remove(toaster.id)
          _router.navigateByUrl('login');
          }
        }
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
