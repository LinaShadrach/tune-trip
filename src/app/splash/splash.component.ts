import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { User } from '../user.model';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  providers: [FirebaseService]
})
export class SplashComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }
  submitForm(username: string){
    var newUser: User = new User(username);
    this.firebaseService.signIn(newUser);
  }
}
