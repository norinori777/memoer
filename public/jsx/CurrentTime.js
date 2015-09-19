{
	/*
	・現在時間を表示する。
	・スタイルはインラインで指定する。
	*/
}

window.React = require('react');
var React = require('react/addons');

var CurrentTime = React.createClass({
	render: function(){
		var currentDate = new Date();
		var strTime = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
		return <time>{strTime}</time>
	}
});

module.exports = CurrentTime;