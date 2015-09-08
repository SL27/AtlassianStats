var request=require('request');
var mongoose=require('mongoose');
var Confluence=mongoose.model('Confluence');
var utils=require('./../utils/utils');
var async=require('async');

var spaceUrl="https://confluence.atlassian.com/rest/api/space?limit=500";
var blogUrl="https://confluence.atlassian.com/rest/api/content/search?cql=type=blogpost&limit=500";
var commentUrl="https://confluence.atlassian.com/rest/api/content/search?cql=type=comment&limit=500";
var attachmentUrl="https://confluence.atlassian.com/rest/api/content/search?cql=type=attachment&limit=500";
var pageUrl="https://confluence.atlassian.com/rest/api/content/search?cql=type=page&limit=500";

function getConfluenceInfo(){
	var confluenceStats={};
	confluenceStats.timestamp=Date.now();
	confluenceStats._id=utils.getDate();
	async.parallel([
		function(callback){
			utils.getTotalnum(blogUrl,0,function(total){
				console.log(total);
				confluenceStats.blog=total;
				callback();
			});
		},
		function(callback){
			utils.getTotalnum(commentUrl,0,function(total){
				console.log(total);
				confluenceStats.comment=total;
				callback();
			});
		},
		function(callback){
			utils.getTotalnum(attachmentUrl,0,function(total){
				console.log(total);
				confluenceStats.attachment=total;
				callback();
			});
		},
		function(callback){
			utils.getTotalnum(pageUrl,0,function(total){
				console.log(total);
				confluenceStats.page=total;
				callback();
			});
		},
		function(callback){
			utils.getTotalnum(spaceUrl,0,function(total){
				console.log(total);
				confluenceStats.space=total;
				callback();
			});
		}

	],function(err){
		console.log(confluenceStats);
		var confluence=new Confluence(confluenceStats);
		confluence.save(function(err,confluence){console.log(confluence);});
	});
	
}


module.exports=getConfluenceInfo;