import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';
import { LastFMService } from '../last-fm.service';

import { User } from '../user.model';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [UserService, LastFMService]
})
export class ShowListComponent implements OnInit {

  userToDisplay;
  userId: string;
  currentUsername;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private lastFMService: LastFMService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
    });
    this.userToDisplay = this.userService.getUserById(this.userId);
    this.currentUsername=this.userService.setUsername(this.userId);
    console.log(this.currentUsername);
  }
  search(){
    var artistList= this.lastFMService.getSimilarArtists(this.currentUsername);
    console.log(this.currentUsername);

  }

}
