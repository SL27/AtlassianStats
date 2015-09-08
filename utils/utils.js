var request=require('request');
function getDate(){
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    return dd+'-'+mm+'-'+yyyy;
}

//paginate till the last page and find out the total number of contents
function getTotalnum(url,startAt,callback){
	request.get(url+"&start="+startAt,function(err,res,body){
		var data=JSON.parse(body);
		if(data.results.length<500){
			callback(startAt+data.results.length);
		}
		else{
			getTotalnum(url,startAt+500,callback);
		}
	});
}

module.exports.getDate=getDate;
module.exports.getTotalnum=getTotalnum;