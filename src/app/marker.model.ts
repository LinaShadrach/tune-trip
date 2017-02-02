import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';

export class Marker {
  constructor(public latitude: number, public longitude: number, public label?: string, public title?: string){
  }
}
// attempt to alter label dynamically using event listeners
// export const baseAddEventListeners = (<any>SebmGoogleMapMarker.prototype)._addEventListeners;
// (<any>SebmGoogleMapMarker.prototype)._addEventListeners = function() {
//   this._markerManager.createEventObservable('mouseover', this)
//   .subscribe(() => {
//     this.label=this.title;
//     console.log("in"+this.title);
//   });
//   this._markerManager.createEventObservable('mouseout', this)
//   .subscribe(() => {
//     this.label=" ";
//     console.log("out"+this.label);
//   });
//   baseAddEventListeners.call(this);
// }
