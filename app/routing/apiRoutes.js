var friendsArr = require("../data/friends.js");
var path = require("path");

module.exports = function(app){
    app.get("/api/friends", function (req, res){
        res.json(friendsArr);
    });

app.post("/api/friends", function (req, res){
    var newFriendRatings = req.body.ratings;
    var scoresArr = [];
    var friendCount = 0;
    var match = 0;

    for (var i=0; i<friendsArr.length; i++){
        var ratingDiff = 0;
        for (var j=0; j<newFriendRatings.length; j++){
            ratingDiff += (Math.abs(parseInt(friendsArr[i].ratings[j]) - parseInt(newFriendRatings[j])))
        }
        scoresArr.push(ratingDiff);
    }
    for(var i=0; i<scoresArr.length; i++){
        if(scoresArr[i] <= scoresArr[match]){
            match = i;
        }
    }
    var newLove = friendsArr[match];
    res.json(newLove);
    friendsArr.push(req.body);
});



};