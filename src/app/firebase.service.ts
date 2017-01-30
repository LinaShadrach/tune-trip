import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
userList: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
    this.userList = af.database.list('users');
   }

  signIn(user) {
    this.userList.push(user);
  }
}
