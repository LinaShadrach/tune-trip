import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [UserService]
})
export class ShowListComponent implements OnInit {

  userToDisplay;
  userId: string;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
    });
    this.userToDisplay = this.userService.getUserById(this.userId);
    console.log(this.userToDisplay);
  }

}
