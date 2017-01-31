import { Injectable } from '@angular/core';
import {  songKickKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SongKickService {

  constructor(private http: Http) { }
  printTracks(response){
    for(var i=0; i<response.json().similartracks.track.length; i++){
      console.log("for "+response.json().similartracks.track[i].artist.name);
    }
  }

}
