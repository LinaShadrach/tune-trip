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
  topTracks;
  trackList;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private lastFMService: LastFMService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
    });
    this.userToDisplay = this.userService.getUserById(this.userId);
    this.currentUsername=this.userService.setUsername(this.userId);
  }
  search(){
    var currentTrack;
    this.topTracks = this.lastFMService.getSimilarArtists(this.currentUsername).subscribe(data=>{
      for(var i=0; i<data.json().toptracks.track.length; i++){
        currentTrack = this.lastFMService.setTracks(data.json().toptracks.track[i]).subscribe(response=>{
          this.lastFMService.printTracks(response);
        });
      };
    });
  }

}
