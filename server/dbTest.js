const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uri =
	"mongodb+srv://habeebcycle:secret101@graph-ql-xihwd.mongodb.net/node-graphql?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", err => {
	if (err) console.log(err);
	console.log("connected to database");
});

var doc = mongoose.model("authors", new Schema());

doc.find({ _id: "5e2049f83d20b536e44d75da" }, function(err, collection) {
	console.log(collection);
});
