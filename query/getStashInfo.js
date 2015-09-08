var request=require("request");
var mongoose=require('mongoose');
var Jira=mongoose.model('Stash');
var utils=require('./../utils/utils');
var async=require('async');
//no public stash server to play with :(

//http://example.com/rest/api/1.0/projects 
//http://example.com/rest/api/1.0/projects/{projectKey}/repos
//http://example.com/rest/api/1.0/repos
//http://example.com/rest/api/1.0/admin/groups/more-members