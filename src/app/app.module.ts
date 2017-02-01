import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
// import { AgmCoreModule } from 'angular2-google-maps/core';

import { googleMapAPIKey} from './api-keys';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { ShowListComponent } from './show-list/show-list.component';
import { AboutComponent } from './about/about.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';

import { masterFirebaseConfig } from './api-keys';




export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};




@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    ShowListComponent,
    AboutComponent,
    ShowDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    // AgmCoreModule.forRoot({
    //   apiKey: googleMapAPIKey
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
