{/*
　・ContentEditableを有効にする
　・placeholderの値を動的に設定出来るようにする。
　・値が入力された場合、placeholderの値が消えること。
　・値がなくなった場合、placeholderの値が表示されること。
 ・ENTERを押しても、Cancelされること。
*/}

window.React = require('react');
var React = require('react/addons');
var ContentEditableLine = require('./ContentEditableLine.js');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var ContentEditable = React.createClass({
	mixins: [FluxMixin],

	position: 0,
	enter_flg: 0,

	propTypes:{
	 	placeholder: React.PropTypes.string.isRequired,
	 	classes: React.PropTypes.func.isRequired,
	 	no: React.PropTypes.number.isRequired
	},
	getDefaultProps: function(){
		return {
			placeholder: 'メモの題名を入力してください',
			allowEnter: false
		}
	},
	getInitialState: function(){
		return{
			inputValue: this.props.inputValue,
			isShowDefaultValue: true,
			isDropover: false
		};
	},
	getDefaultValue: function(){
		return this.state.isShowDefaultValue ? this.props.placeholder : '';
	},

	// Actionでデータを保存する、Storeに保存
	handleChange: function(e){
		var line = '';
		
		if(e.target.firstChild === null){
			this.setState({isShowDefaultValue: true});
		}else{
			this.setState({isShowDefaultValue: false});
		}
		if(this.props.role === 'memo'){
			var i, values = [];
			for(i = 0; i < e.target.childNodes.length; i++){
				if(e.target.childNodes[i].textContent === ""){
					values.push("[<BR>]");
				}else{
					values.push(e.target.childNodes[i].textContent);
				}
			}
			return this.getFlux().actions.updateMemo({
				no: this.props.no,
				value: values
			});
		}
		if(this.props.role === 'title'){
			return this.getFlux().actions.updateTitle({
				value: e.target.firstChild.textContent.toString()
			});
		}
	},

	// Actionで行数を増やし、Storeに保存
	keyDown: function(e){
		var target = e.target;
		if(this.props.addLine!==undefined){
			if((e.which && e.which === 9) || (e.keyCode && e.keyCode === 9)){
				this.props.addLine(this.props.no);
			}
			if((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)){
				enter_flg = 1;
			}							
		}
	},
	handleDragOver: function(e){
		e.preventDefault();
		e.dataTransfer.dropEffect='copy';
		this.showDropping(e);
	},
	handleDragLeave: function(e){
		this.hideDropping(e);
	},
	handleDrop: function(e){
		e.preventDefault();
		this.hideDropping(e);
		for(var i = 0; i < e.dataTransfer.files.length; i++){
			var file = e.dataTransfer.files[i];
			var img=document.createElement("img");
			var target=e.target;
			var reader = new FileReader();
			var binary = new FileReader();
			reader.onload = function(e){
				var data = e.target.result;
				img.src=data;
				img.width=100;
				target.appendChild(img);
			};
			binary.onload = function(e){
				var data = e.target.result;
			}
			reader.readAsDataURL(file);
			binary.readAsBinaryString(file);
    	}
	},
	showDropping: function(e){
		this.setState({isDropover:true});
	},
	hideDropping: function(e){
		this.setState({isDropover:false});
	},
	renderTmp: function(values){
		var i,lines = [];

		for(i=0; i < values.length; i++){
			lines.push(<ContentEditableLine data={values[i]}></ContentEditableLine>);
		}
		return lines;
	},
	componentWillMount: function(){
		console.log("test1");
	},
	componetDidMount: function(){
		console.log("test2");
	},
	componentWillReceiveProps: function(){
		if(this.props.role === 'memo'){
			for(var i = 0; i < React.findDOMNode(this).childNodes.length; i++){
				if(React.findDOMNode(this).childNodes[i].toString() === "[object Text]"){
					React.findDOMNode(this).childNodes[i].remove();
				}else{
					if(React.findDOMNode(this).childNodes[i].childElementCount !== 0){
						if(React.findDOMNode(this).childNodes[i].childNodes[0].getAttribute("data-reactid") === null){
							if(React.findDOMNode(this).childNodes[i].childNodes[0].nodeName === "BR" || 
								React.findDOMNode(this).childNodes[i].childNodes[0].nodeName === "br" ){
								React.findDOMNode(this).childNodes[i].remove();
								i--;
							}
						}
					}
				}
			}
		}
		console.log("test3");
	},
	componentWillUpdate: function(){
		console.log("test4");
	},
	componentDidUpdate: function(){
		if(this.props.role === "memo"){
			var range = document.createRange();
			var sel = getSelection();
			var base, start, end;

			if(sel.baseNode.nodeName === "DIV"){
				if(sel.baseOffset === 0 && enter_flg === 0){
					base = sel.baseNode.childNodes[0];
					if(sel.baseNode.childNodes[0].nodeName === "BR"){
						start = 0;
						end = 0;
					}else{
						start = sel.baseNode.childNodes[0].textContent.length;
						end = sel.baseNode.childNodes[0].textContent.length;
					}
				}else{
					base = sel.baseNode;
					start = sel.baseOffset;
					end = sel.baseOffset;
				}
				if(enter_flg === 1){
					start = start + 1;
					end = end + 1;
					enter_flg = 0;
				}
				range.setStart(base,start);
				range.setEnd(base,end);
				sel.removeAllRanges();
				sel.addRange(range);

				range.collapse(false);
			}
		}
		console.log("test5");
	},
	render: function(){
		var self = this;
		if(this.props.role === 'memo'){
			return (
				<div contentEditable
					className={this.props.classes}
					effectAllowed="move"
					data-placeholder={this.getDefaultValue()} 
					onInput={this.handleChange}
					onKeyDown={this.keyDown.bind(self)}
					onDragOver={this.handleDragOver}
					onDragEnter={this.handleDragEnter}
					onDragLeave={this.handleDragLeave}
					onDrop={this.handleDrop} >
					{this.renderTmp(this.props.inputValue)}
				</div>
			);
		}
		if(this.props.role === 'title'){
			return (
				<div contentEditable
					className={this.props.classes}
					effectAllowed="move"
					data-placeholder={this.getDefaultValue()} 
					onInput={this.handleChange}
					onKeyDown={this.keyDown.bind(self)}
					onDragOver={this.handleDragOver}
					onDragEnter={this.handleDragEnter}
					onDragLeave={this.handleDragLeave}
					onDrop={this.handleDrop} >
					{this.props.inputValue}
				</div>
			);
		}
	}
});

module.exports = ContentEditable;
