import { Injectable } from '@angular/core';
import { lastFMAPIKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LastFMService {

  constructor(private http: Http) { }
  getSimilarArtists(username){
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user="+username+"&api_key="+lastFMAPIKey+"&format=json").subscribe(data=>{console.log(data)});
  }
}
