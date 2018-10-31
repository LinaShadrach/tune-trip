import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';
import { LastFMService } from '../last-fm.service';
import { Observable } from 'rxjs/Observable';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { GeocodingService } from '../geocoding.service';
import { Marker } from '../marker.model';
import { Http, Response } from '@angular/http';
import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';

import {map} from "rxjs/operator/map";


// import { baseAddEventListeners } from '../marker.model';

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
  zoom: number = 10;
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
  artistNameList=[];
  artistLinkList=[];
  timerSpeed = 2500;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private lastFMService: LastFMService, private songKickService: SongKickService, private geocodingService: GeocodingService, private http: Http) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
    });
    this.userToDisplay = this.userService.getUserById(this.userId);
    this.currentUsername=this.userService.setUsername(this.userId);
    this.artistList=[];
    this.searchOnInit();
    let timer = TimerObservable.create(this.timerSpeed);
    timer.subscribe(t=>{this.done=true});
  }
  // sets the lat and lng on page init depending on clients ip address
  // decided not to implement; could only retrieve ip address of internet service provider
  // getClientIp (){
  //   this.http.get("http://ipv4.myexternalip.com/json").subscribe(data=>{
  //     this.http.get("http://freegeoip.net/json/"+data.json().ip).subscribe(response=>{
  //
  //       this.lat=(response.json().latitude);
  //       this.lng=(response.json().longitude);
  //       });
  //   });
  // }

// seaches for hits based on client's ip address; triggered on component init
  searchOnInit(){
    this.markers=[];
    this.artistNameList=[];
    // api  call to get from lastfm the users top tracks
    this.lastFMService.getInitSearchResults(this.currentUsername);
    // this.topTracks = this.lastFMService.getTopTracks(this.currentUsername).subscribe(topTracksData=>{
    //   // for each of the user's top tracks, make an api call to lastfm to get similar tracks
    //   for(var i=0; i<topTracksData.json().toptracks.track.length; i++){
    //     this.lastFMService.getSimilarTracks(topTracksData.json().toptracks.track[i]).subscribe(similarTracksData=>{
    //       this.getArtistsInit(similarTracksData);
    //     });
    //   };
    // });
  }
 // receives input from searchOnInit; uses information to get shows in user's current location
  getArtistsInit(similarTracksData){
    var currentTrack;
    // for each of the similar tracks, get the artist and make an api call to songKick to see if they are playing in that area
    for(var i=0; i<similarTracksData.json().similartracks.track.length; i++){
      // api call to songKick to check if artist is playing in area
        if(this.artistNameList.indexOf(similarTracksData.json().similartracks.track[i].artist.name)===-1){
          this.artistNameList.push(similarTracksData.json().similartracks.track[i].artist.name);
          currentTrack=this.songKickService.getArtists(similarTracksData.json().similartracks.track[i]).subscribe(result=>{
            // check to make sure the event exists
            if(result.json().resultsPage.results.event){
              this.artistList.push(result.json());
              // create a marker with the lat and long of the venue
              var newMarker = new Marker(result.json().resultsPage.results.event[0].venue.lat, result.json().resultsPage.results.event[0].venue.lng, " ", result.json().resultsPage.results.event[0].venue.displayName);
              this.markers.push(newMarker);
            }
          },
          errorCatch => {
            // don't print error to console if there is a bad request
          });
        }
    }
  }
// searches for hits with location entered by user; triggered by search button (same logic as above but does not use hardcoded location values)
  searchWithLocation(location){
    this.markers=[];
    this.artistList=[];
    this.selectedArtist=null;
    this.done=false;
    let timer2 = TimerObservable.create(this.timerSpeed);
    timer2.subscribe(t=>{this.done=true});
    this.artistNameList=[];
    this.topTracks = this.lastFMService.getTopTracks(this.currentUsername).subscribe(tracksData=>{
      for(var i=0; i<tracksData.json().toptracks.track.length; i++){
        this.lastFMService.getSimilarTracks(tracksData.json().toptracks.track[i]).subscribe(similarTrackData=>{
          // this.geocodingService.getLatLng(location).subscribe(locationData=>{
          //   this.getArtists(similarTrackData, locationData.json().results[0].geometry.location.lat, locationData.json().results[0].geometry.location.lng);
          //   this.lat = locationData.json().results[0].geometry.location.lat;
          //   this.lng = locationData.json().results[0].geometry.location.lng;
          // });

        });
      };
    });
  }
  getArtists(similarTracksData, lat, lng){
    var currentTrack;
    for(var i=0; i<similarTracksData.json().similartracks.track.length; i++){
      if(this.artistNameList.indexOf(similarTracksData.json().similartracks.track[i].artist.name)===-1){
        this.artistNameList.push(similarTracksData.json().similartracks.track[i].artist.name);
        currentTrack=this.songKickService.getArtistsWithLocation(similarTracksData.json().similartracks.track[i], lat, lng).subscribe(result=>{
          if(result.json().resultsPage.results.event){
            this.artistList.push(result.json());
            // create a marker with the lat and long of the venue
            var newMarker = new Marker(result.json().resultsPage.results.event[0].venue.lat, result.json().resultsPage.results.event[0].venue.lng, " ", result.json().resultsPage.results.event[0].venue.displayName);
            this.markers.push(newMarker);
          }
        },
        errorCatch => {
        });
      }
    }
  }
  showDetail(artist){
    this.selectedArtist = artist;
  }
  mouseOnShow(venueName, i){
    this.markers[i].label = venueName;
  }
  mouseOffShow(i){
    this.markers[i].label= " ";
  }
  markerMouseOver(i){
    this.markers[i].label = this.artistList[i].resultsPage.results.event[i].venue.displayName;
  }
  clickMarker(i){
    this.selectedArtist=this.artistList[i].resultsPage.results.event[0];
  }
}
