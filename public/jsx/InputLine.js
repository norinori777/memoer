{/*
	・項目番号と入力ボックスを1行で表示する
	・

*/}

window.React = require('react');
var React = require('react');
var ContentEditable = require('./ContentEditable.js');

var InputLine = React.createClass({
	propTypes:{
		number: React.PropTypes.number.isRequired,
		allowEnter: React.PropTypes.bool.isRequired,
		placeholder: React.PropTypes.string.isRequired
	},
	getDefaultProps: function(){
		return{
			placeholder: 'メモの内容を入力してください',
			allowEnter: true			
		}
	},
	getInitialState: function(){
		return{
			number: 1,
			article: ''
		}
	},
	render: function(){
		return(
			<div>
				<label>{this.state.number}</label>
				<ContentEditable allowEnter={this.props.allowEnter} data-placeholder={this.props.placeholder} />
			</div>
		);
	}
});

React.render(<InputLine></InputLine>,document.body)

module.exports = InputLine;