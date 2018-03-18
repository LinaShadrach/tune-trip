# Tune-Trip

This application recommends concerts to users based on their LastFM user information. 


## Description

The main purpose of this application is to allow users to find concerts featuring artists that are catered to their likes based off of their [LastFM](http://www.last.fm/) profile. The user is able to search for concerts by city, state, zip code, and longitude and latitude. A list of the concerts and their locations and a map with the locations of the concerts plotted on a grid are shown to the user.

This application was built with Angular CLI and uses the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) and [Google Maps API](https://developers.google.com/maps/), the [LastFM API](http://www.last.fm/api), and the [SongKick API](http://www.songkick.com/api_key_requests/new). When the user searches for concerts, the application uses the LastFM API to get the user's top tracks. It uses the SongKick API to generate a list of concerts featuring bands that are similar to the artists of those top tracks. It uses the Google Geocoding API to process the locations inputted by the user. It usese the Google Maps API to plot the results on a map.

#### Sign-in Page:

![alt-text](https://github.com/LinaShadrach/tune-trip/blob/master/sign-in-page-img.png)

#### Results Page:

![alt-text](https://github.com/LinaShadrach/tune-trip/blob/master/results-page-img.png)

## Setup Requirements

* [Node.js and npm](https://nodejs.org/en/download/) installed. 
* A [Firebase](https://firebase.google.com/) account.
* An API key for [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) and [Google Maps API](https://developers.google.com/maps/), [LastFM API](http://www.last.fm/api), and [SongKick API](http://www.songkick.com/api_key_requests/new) (instructions below).

### Installation

* [Clone the repository](https://github.com/LinaShadrach/tune-trip)
* Use the CLI of your choice to navigate into the project directory and run the following commands:
  * To install packages
  ```
  $ npm install
  $ bower install
  ```
  * To run the application
  ```
  $ np serve
  ```
  * To quit running the application press `CTRL C`
* Open the project in the text editor of your choice to make changes. You will be able to see changes update in the browser immediately upon saving while the application is running. 

### API Configuration

* Create a new file: _src/app/api-keys.ts_. 

#### Firebase

* Set up a new database in [Firebase](https://firebase.google.com/) and add the the information to _api-keys.ts_ in the following format (replace `xxxxxxx` with your specific information):

```
export var masterFirebaseConfig = {
    apiKey: "xxxxxxx",
    authDomain: "xxxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxxx.firebaseio.com",
    storageBucket: "xxxxxxxq.appspot.com",
    messagingSenderId: "xxxxxxx"
};
```
#### Google Maps and Google Geocoding

* Request an API key from [Google Maps APIs](https://developers.google.com/maps/documentation/javascript/get-api-key).
* Add the API key to _api-keys.ts_ in the following format (replace `{KEY}`):

```
export var geoCodeKey = "{KEY}";
export var googleMapAPIKey = "{KEY}";
```

#### LastFM

* Request an API key from [LastFM API](http://www.last.fm/api).
* Add the API key to _api-keys.ts_ in the following format (replace `{KEY}`):
```
export var lastFMAPIKey = "{KEY}";
```
#### SongKick

* Request an API key from [SongKick's API](http://www.songkick.com/api_key_requests/new).
* Add the API key to _api-keys.ts_ in the following format (replace `{KEY}`):
```
export var songKickKey = "{KEY}";
```

## Known Bugs

If you notice any bugs or problems you can fill out an issue [here](http://www.github.com/kftwotwo/tune-trip/issues) or feel free to submit a pull request.

## Contact details

```
Lina Shadrach: GitHub username: LinaShadrach
Eric Raetz: ayutoa@runbox.com
Alex Francois: apfrancois86@gmail.com
Kevin Finley: kf.two.two@gmail.com
```

#### Authors

 _Lina Shadrach, Eric Raetz, Alex Francois, [Kevin Finley](http://www.kfinley.com)_
 
## Contribute

If you wish to contribute create an issue and describe your idea then fork it and submit a pull request!

## Technologies Used

```
Anglur CLI 1.0.0-beta.26
TypeScript 2.0.3
HTML5
CSS3
SASS
```
### License

**MIT License**

Copyright (c) 2017 **_Lina Shadrach, Kevin Finley, Eric Raetz, Alex Francois_**
