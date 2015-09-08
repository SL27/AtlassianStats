var mongoose=require('mongoose');

var JiraSchema = new mongoose.Schema({
	project: Number,
	issue:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	bug:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	task:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	story:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	epic:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	newFeature:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	improvement:{
		total:Number,
		open: Number, 
		inProgress:Number,
		resolved:Number,
		reopened:Number,
		closed:Number
	},
	user:Number,
	_id: String,
	timestamp : { type : Number, index:true }
});

mongoose.model('Jira',JiraSchema);