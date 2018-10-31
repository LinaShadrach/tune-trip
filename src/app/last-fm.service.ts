import { Injectable } from '@angular/core';
import { lastFMAPIKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LastFMService {
  similarTracks=[];
  constructor(private http: Http) { }
  getTopTracks(username){
    console.log(`topTracks ${username}`);
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user="+username+"&api_key="+lastFMAPIKey+"&format=json");
  }
  getSimilarTracks(track){
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist="+ track.artist.name + "&track="+track.name+"&limit=20&api_key="+lastFMAPIKey+"&format=json");
  }
  getInitSearchResults(username){
    let foundSimilarTracks = this.getTopTracks(username).map(topTracksData => {
      console.log(this.findSimilarTracks(topTracksData));
      foundSimilarTracks=this.findSimilarTracks(topTracksData)
      console.log(foundSimilarTracks);
      return foundSimilarTracks;
    })
    console.log(foundSimilarTracks);
    foundSimilarTracks.subscribe(data => {
      console.log(data);
    })
  }
  findSimilarTracks(topTracksData){
    let foundSimilarTracks = [];
    console.log(foundSimilarTracks ===[]);
    for(var i=0; i<topTracksData.json().toptracks.track.length; i++){
      const foundTrack = this.getSimilarTracks(topTracksData.json().toptracks.track[i]).map(similarTracksData => {
        return similarTracksData.json().similartracks.track[0].artist.name;
      })
      foundSimilarTracks.push(foundTrack);
    }
    console.log(foundSimilarTracks);
    return foundSimilarTracks;
  }
}

// .subscribe(data=>{
//   console.log(data.json().similartracks.track[0].name);    })
