{/*
	・propsで指定した数分、複数の入力項目を表示すること。
	・追加で表示するインターフェースを設けること。
*/}
window.React = require('react');
var React = require('react/addons');
var InputLine = require('./InputLine.js');

var InputMultiLine = React.createClass({
	propTypes:{
		allowLines: React.PropTypes.number.isRequired
	},
	getDefaultProps: function(){
		return{
			allowLines: 4
		}
	},
	renderLine: function(number){
		var lines = [];
		for(var i=0; i < number; i++){
			lines.push(<InputLine num={i+1}></InputLine>)
		}
		return lines;
	},
	render: function(){
		return (
			<div>
				{this.renderLine(this.props.allowLines)}
			</div>
		);
	}
});

React.render(<InputMultiLine></InputMultiLine>,document.body);
module.exports = InuputMultiLine;