{/*
	・propsで指定した数分、複数の入力項目を表示すること。
	・追加で表示するインターフェースを設けること。
*/}
window.React = require('react');
var React = require('react/addons');
var InputLine = require('./InputLine.js');
var CurrentTime = require('./CurrentTime.js');

var InputMultiLines = React.createClass({
	propTypes:{
		allowLines: React.PropTypes.number.isRequired
	},
	getInitialState: function(){
		return{
			allowLines: this.props.allowLines
		}
	},
	handleAdd: function(event){
		this.setState({allowLines: this.state.allowLines+1});
	},
	renderLine: function(number){
		var lines = [];
		for(var i=0; i < number; i++){
			if(i+1 == number){
				lines.push(<InputLine num={i+1} addLine={this.handleAdd}></InputLine>);
			}else{
				lines.push(<InputLine num={i+1}></InputLine>);
			}
		}
		return lines;
	},
	render: function(){
		return <div>{this.renderLine(this.state.allowLines)}</div>
	}
});

module.exports = InputMultiLines;