var express=require('express');
var logger=require('morgan');
var mongoose=require('mongoose');
require('./model/jiraModel');
require('./model/confluenceModel');
require('./model/stashModel');
require('./model/jenkinsModel');
var jiraStatsApi=require('./api/jiraStatsApi');
var confluenceStatsApi=require('./api/confluenceStatsApi');
var jenkinsStatsApi=require('./api/jenkinsStatsApi');
var jiraInfo=require('./query/getJiraInfo');
var confluenceInfo=require('./query/getConfluenceInfo');
var jenkinsInfo=require('./query/getJenkinsInfo');
var app = express();
mongoose.connect('mongodb://localhost/atlassian');

app.use(logger('dev'));
app.use('/api/jirastats',jiraStatsApi);
app.use('/api/confluencestats',confluenceStatsApi);
app.use('/api/jenkinsstats',jenkinsStatsApi);
//jiraInfo();
//confluenceInfo();
//jenkinsInfo();
getStats(function(){
	jiraInfo();
	confluenceInfo();
	jenkinsInfo();
});
app.listen(8000);
console.log("App listening on port 8000");

function getStats(callback){
	(function loop(){
		var now=new Date();
		if (now.getHours() ===0) {
            callback();
        }
        now = new Date();                  // allow for time passing
        var delay = 21600000 - (now % 21600000); // exact ms to next 30 minutes interval
        setTimeout(loop, delay);
	})();
}