import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';
import { LastFMService } from '../last-fm.service';
import { Observable } from 'rxjs/Observable';

import { SongKickService } from '../song-kick.service';

import { User } from '../user.model';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [UserService, LastFMService, SongKickService]
})
export class ShowListComponent implements OnInit {

  userToDisplay;
  userId: string;
  currentUsername;
  topTracks;
  artistList;
  artists;
  showResults = false;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private lastFMService: LastFMService, private songKickService: SongKickService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
    });
    this.userToDisplay = this.userService.getUserById(this.userId);
    this.currentUsername=this.userService.setUsername(this.userId);
  }
  search(){
    this.showResults=true;
    var ko;
    var currentTrack;
    var similarTrack;
    this.topTracks = this.lastFMService.getTopTracks(this.currentUsername).subscribe(data=>{
      for(var i=0; i<data.json().toptracks.track.length; i++){
        this.lastFMService.getSimilarTracks(data.json().toptracks.track[i]).subscribe(response=>{
          for(var i=0; i<response.json().similartracks.track.length; i++){
            if(this.artistList!=undefined){
                currentTrack=this.songKickService.getArtists(response.json().similartracks.track[i]);
                this.artistList.push(currentTrack);
            }
            else {
              currentTrack=this.songKickService.getArtists(response.json().similartracks.track[i]);
              this.artistList=[currentTrack];
            }
          }
          console.log("in if"+ this.artistList);
        });
      };
    });
  }
}

// if(similarTrack != undefined){
//   if(this.artistList!=undefined){
//     this.artistList.push(similarTrack);
//   }
//   else {
//     this.artistList=[similarTrack];
//   }
// }

// if(this.artistList!=undefined){
//   this.artistList.push(currentTrack);
// }
// else{
//   this.artistList=[currentTrack];
// }

// .subscribe(result=>{
//   if(result!=undefined){
//     if(result.json().resultsPage.totalEntries>0){
//       console.log(result.json().resultsPage);
//       if(this.artistList!=undefined){
//         this.artistList.push(result);
//       }
//       else{
//         this.artistList=[result];
//       }
//     }
//   }
// });
