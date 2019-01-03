var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var params = {
  q: "from:teklecoding hey",
  //result_type: 'recent',
  lang: 'en'
}

var cleanse = function(){
  Twitter.get('search/tweets', params, function(err, data){
    if (!err) {
      //console.log("Hello");
      //console.log(data);
      var i;
      for (i=0;i<data.statuses.length;i++) {
        var deleteID = data.statuses[i].id_str;
        Twitter.post('statuses/destroy/:id', {
          id: deleteID
        }, function (err, data, response) {
          if (response) {
            console.log
            console.log("Deleted.");
          }
          if (err) {
            console.log("Error 1: Unsuccessful delete");
            console.log("" +err);
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

params.q = "from:teklecoding hey"
console.log(params);
cleanse();
