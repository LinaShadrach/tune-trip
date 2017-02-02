import { Injectable } from '@angular/core';
import {  songKickKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SongKickService {
  constructor(private http: Http) { }
  getArtists(response){
    if(response.artist.name){
      return this.http.get("http://api.songkick.com/api/3.0/events.json?artist_name="+ response.artist.name +"&location=sk:12283&apikey=" + songKickKey);
    }
    else{
      return undefined;
    }
  }
  getArtistsWithLocation(response, lat, lng){
    if(response.artist.name){
      return this.http.get("http://api.songkick.com/api/3.0/events.json?artist_name="+ response.artist.name +"&location=geo:"+lat+","+lng+"&apikey=" + songKickKey);
    }
    else{
      return undefined;
    }
  }
}


// map(data=>data.json().resultsPage.totalEntries)
// response.json().similartracks.track.length
// .subscribe(data=>{console.log(data);});
// http://api.songkick.com/api/3.0/events.json?artist_name=beyonce&location=sk:12283&apikey=RQSBZ1uRiMsqxnLs

// Response
// _body
// :
// "{"resultsPage":{"status":"ok","results":{},"perPage":50,"page":1,"totalEntries":0}}"
// headers
// :
// Headers
// ok
// :
// true
// status
// :
// 200
// statusText
// :
// "OK"
// type
// :
// 2
// url
// :
// "http://api.songkick.com/api/3.0/events.json?artist_name=G-Eazy&location=sk:12283&apikey=RQSBZ1uRiMsqxnLs&format=json"
// __proto__
// :
// Body
