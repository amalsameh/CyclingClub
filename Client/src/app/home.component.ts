import { Component, OnInit } from '@angular/core';
import { Auth } from './auth.service';
import {UserService} from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  template: `
    <div *ngIf="auth.authenticated() && auth.userProfile">
    <h4>You are logged in</h4>
    <div class="row">
      <div class="col-md-6">
        <h3>Profile</h3>
        <img [src]="auth.userProfile.picture" alt="" class="profile-img">
        <p><strong>Name: </strong> {{auth.userProfile.name}}</p>
        <p><strong>Email: </strong> {{auth.userProfile.email}}</p>
        <p><strong>Nickname: </strong> {{auth.userProfile.nickname}}</p>
        <p><strong>Created At: </strong> {{auth.userProfile.created_at}}</p>
        <p><strong>Updated At: </strong> {{auth.userProfile.updated_at}}</p>
      </div>
    </div>
  </div>
  <h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
  `
})

export class HomeComponent {
  profile;

  constructor(private router: Router, private auth: Auth) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    //this.profile._id = this.profile.user_id;
   // this.profile.token = localStorage.getItem('id_token');

  }
};
