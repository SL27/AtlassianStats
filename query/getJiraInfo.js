var request=require("request");
var mongoose=require('mongoose');
var Jira=mongoose.model('Jira');
var utils=require('./../utils/utils');
var async=require('async');

var projectBaseUrl="https://jira.spring.io/rest/api/2/project";
var searchBaseUrl="https://jira.spring.io/rest/api/2/search?jql=";
var userBaseUrl="https://jira.spring.io/rest/api/2/group?groupname=jira-users";
var statuses=["open","in Progress","resolved","reopened","closed"];
var issueTypes=["issue","bug","task","story","epic",'new Feature', "improvement" ];

function requestJiraInfo(){
	jiraStats={};
	jiraStats.timestamp=Date.now();
	jiraStats._id=utils.getDate();
	async.parallel([
		function (callback){
			callback();
		},
		function(callback){
			getProjectInfo(jiraStats,callback);
		},
		function(callback){
			getIssueInfo(jiraStats,callback);
		}
	],function(err){
		console.log(jiraStats);
		var jira= new Jira(jiraStats);
		jira.save(function(err,jira){});
	});

}


function getIssueInfo(jiraStats,callback){
	//need to track number of callbacks so we know when all the callbacks executed
	var totalCallback=(statuses.length+1)*issueTypes.length;
	var called=0;

	//if type equals issue then we can't specify any 'type' in the jql of the url query
	issueTypes.forEach(function(type){
		if(type==="issue"){
			request.get(searchBaseUrl,function(err,res,body){
				if(!jiraStats[type]){
					jiraStats[type]={};
				}
				jiraStats.issue.total=JSON.parse(body).total;
				if(++called===totalCallback){
					callback();
				}
			});

			statuses.forEach(function(status){
				request.get(searchBaseUrl+"status='"+status+"'",
				function(err,res,body){
					typeFieldName=type.replace(" ","");
					statusFieldName=status.replace(" ","");
					if(!jiraStats[typeFieldName]){
						jiraStats[typeFieldName]={};
					}
					jiraStats[typeFieldName][statusFieldName]=JSON.parse(body).total;
					if(++called===totalCallback){
						callback();
					}
				});
			});
		} else {
			//example https://jira.spring.io/rest/api/2/search?jql=type='new feature'
			request.get(searchBaseUrl+"type='"+type+"'",function(err,res,body){
				fieldName=type.replace(" ","");
				if(!jiraStats[fieldName]){
					jiraStats[fieldName]={};
				}
				jiraStats[fieldName].total=JSON.parse(body).total;
				if(++called===totalCallback){
					callback();
				}
			});
			//loop through each status of this type of issue
			statuses.forEach(function(status){
				request.get(searchBaseUrl+"type='"+type+"'"+" and " + "status='"+status+"'",
				function(err,res,body){
					typeFieldName=type.replace(" ","");
					statusFieldName=status.replace(" ","");
					if(!jiraStats[typeFieldName]){
						jiraStats[typeFieldName]={};
					}
					jiraStats[typeFieldName][statusFieldName]=JSON.parse(body).total;
					if(++called===totalCallback){
						callback();
					}
				});
			});
		}
	
	});
}


function getProjectInfo(jiraStats,callback){
	request.get('https://jira.spring.io/rest/api/2/project',function(err,res,body){
		jiraStats.project=JSON.parse(body).length;
		callback();
	});
}


module.exports=requestJiraInfo;
