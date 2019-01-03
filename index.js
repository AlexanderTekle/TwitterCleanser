var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var params = {
  screen_name: "teklecoding",
}

var cleanse = function(){
  Twitter.get('statuses/user_timeline', params, function(err, data){
    if (!err) {
      //console.log("Hello");
      //console.log(data.statuses[0]);
      let tweets = data.filter(tweet => {
        return (tweet.text.includes('fuck') || tweet.text.includes("shit") || tweet.text.includes("bitch"));
      })
      //console.log(tweets);


      var i;
      for (i=0;i<tweets.length;i++) {
        var deleteID = tweets[i].id_str;
        Twitter.post('statuses/destroy/:id', {
          id: deleteID
        }, function (err, data, response) {
          if (err) {
            console.log("Error 1: Unsuccessful delete");
            console.log("" +err);
          }
          else {
            console.log("Deleted.");
          }
        })
      }

    }
    else {
      console.log("Error 2: Unsuccessful search.");
    }
  });
}

cleanse();

//params.q = "from:teklecoding hey"
//console.log(params);
//cleanse();
