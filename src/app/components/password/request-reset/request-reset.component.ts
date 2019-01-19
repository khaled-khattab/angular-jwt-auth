import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../Services/user.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  }
  constructor(private User: UserService, private notify: SnotifyService) { }

  ngOnInit() {
  }
  onSubmit() {
    return this.User.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }
  handleResponse(res) {
    console.log(res);
    this.form.email = null;
  }

}
