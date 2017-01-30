import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  providers: [UserService]
})
export class SplashComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }
  submitForm(username: string){
    var newUser: User = new User(username);
    var userKey = this.userService.signIn(newUser);
    this.router.navigate(['show-list', userKey]);
  }
}
