var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/fotos");

var image_schema = new Schema({
	title : {
		type : String,
		required : true
	},
	owner : {
		type : Schema.Types.ObjectId,
		ref : "User"
	},
	extension : {
		type : String,
		required : true
	}
});

var Image = mongoose.model("Image", image_schema);

module.exports = Image;