/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */
var url_1;
var lat_1;
var lon_1;

// Use the data source URL from lab 1 in this 'ajax' function:
var downloadData;

// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(Data_)
{
  return JSON.parse(Data_);
};

// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var makeMarkers = function(Data_) {
  var Markers_ = [];
  for(var i = 0; i<Data_.length; i++){
    var mark = L.marker([Data_[i][lat_1], Data_[i][lon_1]]);
    Markers_.push(mark);
  }
  return Markers_;
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(Markers_) {
  for(var i = 0; i< Markers_.length; i++){
    Markers_[i].addTo(map);
  }
};

// At this point you should see a bunch of markers on your map if
// things went well.
// Don't continue on until you can make them appear!

/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are (nearly) immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

// Look to the bottom of this file and try to reason about what this
// function should look like
var removeMarkers = function(Markers_) {
  for(var i = 0; i< Markers_.length; i++){
    map.removeLayer(Markers_[i]);
  }
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file
  for the stretch goal.
===================== */

/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */


var parsed;
var markers;
$("#button" ).click(function() {
  if (typeof(markers) != "undefined") {      // clear the map before each plot
    removeMarkers(markers);                  // except the first plot
  }
  url_1 = $("#text-input1").val();           // assign the value here rather than in the front
  lon_1 = $("#text-input2").val();           // in order to get the input after users click the Button
  lat_1 = $("#text-input3").val();           // in case the users change the default value
  downloadData = $.ajax(url_1);
    downloadData.done(function(data) {
    parsed = parseData(data);
    markers = makeMarkers(parsed);
    plotMarkers(markers);});
});
