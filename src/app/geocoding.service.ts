import { Injectable } from '@angular/core';
import { geoCodeKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodingService {

  constructor(private http: Http) { }
  getLatLng(location){
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key="+geoCodeKey);
  }
}
