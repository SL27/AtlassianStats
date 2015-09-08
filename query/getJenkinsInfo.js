var request=require('request');
var mongoose=require('mongoose');
var Jenkins=mongoose.model('Jenkins');
var utils=require('./../utils/utils');
var async=require('async');

var jobUrl="https://builds.apache.org/view/All/api/json";
var userUrl="https://builds.apache.org/asynchPeople/api/json";

function getJenkinsInfo(){
	var jenkinsStats={};
	jenkinsStats.timestamp=Date.now();
	jenkinsStats._id=utils.getDate();
	async.parallel([
		//get the number of jobs in the server
		function(callback){
			request.get(jobUrl,function(err,res,body){
				var blue=0,red=0,yellow=0,notBuilt=0,aborted=0;
				var data=JSON.parse(body);
				jenkinsStats.job=data.jobs.length;
				data.jobs.forEach(function(job){
					switch (job.color){
						//count both red and red_anime as red
						case "red_anime":
						case "red":
							red++;
							break;
						case "yellow_anime":
						case "yellow":
							yellow++;
							break;
						case "blue_anime":
						case "blue":
							blue++;
							break;
						case "notbuilt":
							notBuilt++;
							break;
						case "aborted":
							aborted++;
							break;
					}
				});
				jenkinsStats.blue=blue;
				jenkinsStats.red=red;
				jenkinsStats.yellow=yellow;
				jenkinsStats.notBuilt=notBuilt;
				jenkinsStats.aborted=aborted;
				callback();
			});
		},
		function(callback){
			request.get(userUrl,function(err,res,body){
				var data=JSON.parse(body);
				jenkinsStats.user=data.users.length;
				callback();
			});
		}
	],function(err){
		console.log(jenkinsStats);
		var jenkins= new Jenkins(jenkinsStats);
		jenkins.save(function(err,jenkins){});
	});
}

module.exports=getJenkinsInfo;