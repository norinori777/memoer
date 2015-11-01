{/*
	・propsで指定した数分、複数の入力項目を表示すること。
	・末尾の入力項目には、項目を追加するインターフェースを設けること。
*/}
window.React = require('react');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var InputLine = require('./InputLine.js');
var FluxMixin = Fluxxor.FluxMixin(React);

var InputMultiLines = React.createClass({
	mixins: [FluxMixin],
	propTypes:{
		data: React.PropTypes.object.isRequired
	},
	handleAdd: function(no){
		this.getFlux().actions.updateMemo({
				isShowDefaultValue: true,
				no: no + 1,
				value: ""
		});

	},
	renderLine: function(values){
		var lines=[], i;
		for(i=0; i < values.length; i++){
			if(i+1 == values.length){
				lines.push(<InputLine value={values[i]} addLine={this.handleAdd} />);
			}else{
				lines.push(<InputLine value={values[i]} />);
			}
		}
		return lines;
	},
	render: function(){
		return <div>{this.renderLine(this.props.data)}</div>;
	}
});

module.exports = InputMultiLines;