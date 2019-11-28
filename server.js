// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

var defaults = { // same format as API response
  items: { 
    snippet: {
      title: 'No results found.' // use defaults when no search results
    },
    id: {
      videoId: '_ul7X5js1vE' // include a nice default video
    }
  }
};

// Express 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // add public dir to our path
app.set('view engine', 'ejs'); // use embedded javascript templates

// listen for web requests
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// index page for all GET requests
app.get('*', function(req, res) {
    res.render('index');
});

// POST a search
app.post('/search/', async function(req, res) { // need async to await API results
  var search = req.body.searchValue;
  console.log('Using search term: "' + search + '"'); // for debugging
  var videos = await queryYouTube(search); // search and await answer
  res.render('index', { // return the index page plus results of queryYouTube()
    videos: videos,
    searchValue: search // for ejs
  });
});

'use strict';

const {google} = require('googleapis');

// initialize Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.SECRET // put yout API key in .env
});

// simple example of using YouTube API
async function queryYouTube(search) { 
  try {
    var res = await youtube.search.list({
      // request parameters below
      q: search + "sesame street songs",     // add keywords to user search terms
      part: 'snippet',                       // see YouTube docs for parameters
      channelId: 'UCoookXUzPciGrEZEXmh4Jjg', // Sesame Street channelId
      topicId: '/m/04rlf',                   // not sure it matters, but "music" topic
      type: 'video',
      order: 'relevance',
      maxResults: 10
    });
    if ( res.data.pageInfo.totalResults == 0) {
      return defaults; // no results, so default message
    } else {
      return res.data.items; // otherwise, we have results
    }
  } catch(err) { // catch errors and include error on web page with a default video
    console.log("-- Catch block hit! --");
    console.log(err);
    var error = defaults;
    error.items.snippet.title = 'HTTP ' + err.code + ': ' + err.message + 
          ' <p>Since the query did not work, watch Stevie Wonder singing "Superstition" on Sesame Street.</p>';
    return error; // returns the error code and message as part of the title
  }    
}
