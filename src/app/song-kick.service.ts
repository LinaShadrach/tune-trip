import { Injectable } from '@angular/core';
import {  songKickKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SongKickService {
  constructor(private http: Http) { }
  private handleError(err:any)
  {
    console.log("SongKick does not have a record of an artist we suggested for you! " + err.json().resultsPage.error.message);
    if(err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }
  getArtists(response){
    return this.http.get("http://api.songkick.com/api/3.0/events.json?artist_name="+ response.artist.name +"&location=sk:12283&apikey=" + songKickKey).catch(this.handleError);

  }
  getArtistsWithLocation(response, lat, lng){
    return this.http.get("http://api.songkick.com/api/3.0/events.json?artist_name="+ response.artist.name +"&location=geo:"+lat+","+lng+"&apikey=" + songKickKey).catch(this.handleError);
  }
}
