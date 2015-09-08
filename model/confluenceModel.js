var mongoose=require('mongoose');

var ConfluenceSchema= new mongoose.Schema({
	space:Number,
	blog:Number,
	comment:Number,
	attachment:Number,
	page:Number,
	_id: String,
	timestamp : { type : Number, index:true }
});

mongoose.model("Confluence",ConfluenceSchema);