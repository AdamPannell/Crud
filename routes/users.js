var express = require('express');
var router = express.Router();

//Get a list of users
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

//Add a user
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

//Delete a user
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.post("/userLogin", function(req, res)
{
	var db = req.db;
	var userLoginData = req.body;
	db.collection("userlist").findOne({username: userLoginData.username},function(err, item)
	{
		if(item.username === userLoginData.username)
		{
			if(item.password === userLoginData.Password)
			{
				console.log(item.username + " logged in");
				res.json({status: 200, fullname: item.fullname, username: item.username, rel: item._id});
			}
			else
			{
				console.log(item.username + " login in failed");
				res.json({status: 401});
			}
		}
		else
		{
			console.log(userLoginData.username + " login in failed");
			res.json({status: 404});
		}
	});
});

module.exports = router;
