module.exports = {
	getAllRecords: (req, res) => {
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("chatapplication");
		  var myobj = { name: "Company Inc", address: "Highway 36" };
		  records = dbo.collection("customers").find();
		  console.log(records);
		});
	},

	insertRecord: (req, res) => {
	  res.send('Inserting record');
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("chatapplication");
		  var myobj = req.body;
		  dbo.collection("customers").insertOne(myobj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
		    db.close();
		  });
		});
	}
}