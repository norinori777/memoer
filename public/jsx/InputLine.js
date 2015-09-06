{/*
	・項目番号と入力ボックスを1行で表示する
	・

*/}

window.React = require('react');
var React = require('react/addons');
var ContentEditable = require('./ContentEditable.js');

var InputLine = React.createClass({
	propTypes:{
		allowEnter: React.PropTypes.bool.isRequired,
	},
	getDefaultProps: function(){
		return{
			num: "1",
			line:'memo__line',
			no: 'memo__no',
			allowEnter: true			
		}
	},
	getInitialState: function(){
		return{
			article: ''
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
				<label className={this.props.no}>{this.props.num}：</label>
				<ContentEditable
					classes={classes}
					fontType={this.props.memo__contentFont}
					allowEnter={this.props.allowEnter}
					placeholder={'メモの内容を入力してください'} />
			</div>
		);
	}
});

module.exports = InputLine;