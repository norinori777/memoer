
var ControlData = function(method, 
							url, 
							data, 
							callback){
	var request = new XMLHttpRequest();
	request.open(method, url);
	request.onreadystatechange = function(){
		if(request.readyState === 4 
			&& request.status === 200 
			&& callback ){
			callback(request);
		}
	};
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify(data));
};

module.exports = ControlData;