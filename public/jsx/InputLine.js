{/*
	・項目番号と入力ボックスを1行で表示する
	・

*/}

window.React = require('react');
var React = require('react/addons');
var ContentEditable = require('./ContentEditable.js');

var InputLine = React.createClass({
	propTypes:{
		allowEnter: React.PropTypes.bool.isRequired
	},
	getDefaultProps: function(){
		return{
			line:'memo__line',
			no: 'memo__no',
			allowEnter: true,
			inputValue: ''			
		}
	},
	getInitialState: function(){
		return{
			inputVlue: this.props.inputValue
		}
	},
	render: function(){
		var cx = React.addons.classSet;
		var classes = cx({
			'memo__contentFont': true,
			'dropover': this.state.isDropover
		});
		return(
			<div className={this.props.line}>
				<label className={this.props.no}>{this.props.value.no}：</label>
				<ContentEditable
					role={'memo'}
					classes={classes}
					addLine={this.props.addLine}
					no={this.props.value.no}
					fontType={this.props.memo__contentFont}
					allowEnter={this.props.allowEnter}
					placeholder={'メモの内容を入力してください'}
					inputValue={this.props.value.value} />
			</div>
		);
	}
});

module.exports = InputLine;