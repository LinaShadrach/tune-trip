import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';
import { LastFMService } from '../last-fm.service';
import { Observable } from 'rxjs/Observable';
import { GeocodingService } from '../geocoding.service';
import { Marker } from '../marker.model';

import { SongKickService } from '../song-kick.service';

import { User } from '../user.model';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [UserService, LastFMService, SongKickService, GeocodingService]
})
export class ShowListComponent implements OnInit {
  lat=45.5231;
  lng=-122.6765;
  zoom: number = 13;
  userToDisplay;
  userId: string;
  currentUsername;
  topTracks;
  artistList;
  artists;

  done=false;
  selectedArtist=null;
  mapDone=false;
  newMarker: Marker;
  newMarker2;
  markers: Marker[]=[];


  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private lastFMService: LastFMService, private songKickService: SongKickService, private geocodingService: GeocodingService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
    });
    this.userToDisplay = this.userService.getUserById(this.userId);
    this.currentUsername=this.userService.setUsername(this.userId);
    this.artistList=[];
    this.searchOnInit();
  }
// seaches for hits swpwnsing on client's ip address; triggered on init
  searchOnInit(){
    this.markers=[];
    // api  call to get from lastfm the users top tracks
    this.topTracks = this.lastFMService.getTopTracks(this.currentUsername).subscribe(data=>{
      // for each of the user's top tracks, make an api call to lastfm to get similar tracks
      for(var i=0; i<data.json().toptracks.track.length; i++){
        this.lastFMService.getSimilarTracks(data.json().toptracks.track[i]).subscribe(response=>{
          this.getArtistsInit(response);
          if(i=data.json().toptracks.track.length-1){
            this.done=true;
          }
        });
      };
    });
  }
 // receives input from searchOnInit; uses information to get shows in user's current location
  getArtistsInit(response){
    var currentTrack;
    // for each of the similar tracks, get the artist and make an api call to songKick to see if they are playing in that area
    for(var i=0; i<response.json().similartracks.track.length; i++){
        // api call to songKick to check if artist is playing in area
          currentTrack=this.songKickService.getArtists(response.json().similartracks.track[i]).subscribe(result=>{
              this.artistList.push(result.json());
              // check to make sure the event exists
              if(result.json().resultsPage.results.event){
                // create a marker with the lat and long of the venue
                var newMarker = new Marker(result.json().resultsPage.results.event[0].venue.lat, result.json().resultsPage.results.event[0].venue.lng, result.json().resultsPage.results.event[0].venue.displayName);
                this.markers.push(newMarker);
              }
        });
    }
  }
// searches for hits with location entered by user; triggered by search button
  searchWithLocation(location){
    this.markers=[];
    this.artistList=[];
    this.selectedArtist=null;
    this.done=false;
    this.topTracks = this.lastFMService.getTopTracks(this.currentUsername).subscribe(tracksData=>{
      for(var i=0; i<tracksData.json().toptracks.track.length; i++){
        this.lastFMService.getSimilarTracks(tracksData.json().toptracks.track[i]).subscribe(similarTrackData=>{
          this.geocodingService.getLatLng(location).subscribe(locationData=>{
            this.getArtists(similarTrackData, locationData.json().results[0].geometry.location.lat, locationData.json().results[0].geometry.location.lng);
          });
          if(i=tracksData.json().toptracks.track.length-1){
            this.done=true;
          }
        });
      };
    });
  }
  getArtists(response, lat, lng){
    var currentTrack;
    for(var i=0; i<response.json().similartracks.track.length; i++){
      currentTrack=this.songKickService.getArtistsWithLocation(response.json().similartracks.track[i], lat, lng).subscribe(result=>{
        if(result.json().resultsPage.results.event){
          this.artistList.push(result.json());
          // create a marker with the lat and long of the venue
          var newMarker = new Marker(result.json().resultsPage.results.event[0].venue.lat, result.json().resultsPage.results.event[0].venue.lng, result.json().resultsPage.results.event[0].venue.displayName);
          this.markers.push(newMarker);
        }
      });
    }
  }
  showDetail(artist){
    this.selectedArtist = artist;
  }
}
