'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'h4DYX3FobaF4_DaF0k67-caGi9jnX9FVL68xRlROlhwMZp3LzUOgTdgguFoufcHb5BwWy2qXXMCAnUKyg7SrcDjUfKnX-kwnSmtfXzu1rBHWqM73Q_9IpnBzG5YPW3Yx';

var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/getrestaurants', function(req, res) {
    var location = req.body.location;
    console.log("post received: %s", location);
    res.send(find_restaurants(location));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

function find_restaurants(loc) {
  const searchRequest = {
    term:'food',
    location: loc
  };

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[getRandomInt(51)];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(firstResult['name']);
    return firstResult['name'];
  }).catch(e => {
    console.log(e);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
