# Tune-Trip

 This application recommends concerts to users based on their lastFM user information, 1/30/2017

 By [Kevin Finley](http://www.kfinley.com), Eric Raetz, Alex Francois, Lina Shadrach

## Description

This application will use Last.fm API to get your top tracks then use those tracks to get similar artists. After that then the application will use the SongKick API to get your IP address as a default. If a user enters a location it will use Geocoding to get you Longitude and Latitude. With that information we input into SongKick's upcoming http request for concerts.

## Setup/Installation Requirements

Clone the repository and `cd` into your directory:
```
$ npm install
$ bower install
$ np serve
```

## API Configuration
 Make a  new TypeScript file `src/app/api-keys.ts` in that file. You will have to the api keys from [Firebase](https://firebase.google.com/), [LastFM API](http://www.last.fm/api), [Google Geocoding API ](https://developers.google.com/maps/documentation/geocoding/start), [Google Maps](https://developers.google.com/maps/), and for [SongKick's API](http://www.songkick.com/api_key_requests/new) you have to request for an API key. Then enter the following format.
```
export var masterFirebaseConfig = {
    apiKey: "xxxxxxx",
    authDomain: "xxxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxxx.firebaseio.com",
    storageBucket: "xxxxxxxq.appspot.com",
    messagingSenderId: "xxxxxxx"
};

export var lastFMAPIKey = "xxxxxxx";
export var songKickKey = "xxxxxxx";
export var geoCodeKey = "xxxxxxx";
export var googleMapAPIKey = "xxxxxxx";

```

## Known Bugs

If you notice any bugs or problems you can fill out an issue [here](http://www.github.com/kftwotwo/tune-trip/issues) or feel free to submit a pull request.

## Contact details
Here is our emails
```
Kevin Finley: kf.two.two@gmail.com
Lina Shadrach: GitHub username: LinaShadrach
Eric Raetz: ayutoa@runbox.com
Alex Francois: apfrancois86@gmail.com
```
## Contribute

If you wish to contribute create an issue and describe your idea then fork it and submit a pull request!

## Technologies Used
```
HTML
CSS
TypeScript
```
### License

*This is under a MIT License*

Copyright (c) 2017 **_Kevin Finley, Eric Raetz, Alex Francois, Lina Shadrach_**
