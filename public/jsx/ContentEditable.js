{/*
　・ContentEditableを有効にする
　・placeholderの値を動的に設定出来るようにする。
　・値が入力された場合、placeholderの値が消えること。
　・値がなくなった場合、placeholderの値が表示されること。
 ・ENTERを押しても、Cancelされること。
*/}

window.React = require('react');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var ContentEditable = React.createClass({
	mixins: [FluxMixin],

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
		if(e.target.firstChild === null){
			this.setState({isShowDefaultValue: true});
		}else{
			this.setState({isShowDefaultValue: false});
		}
		if(this.props.role === 'memo'){
			return this.getFlux().actions.updateMemo({
				no: this.props.no,
				value: e.target.firstChild.textContent.toString()
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
		if(this.props.addLine!==undefined){
			if((e.which && e.which === 9) || (e.keyCode && e.keyCode === 9)){
				this.props.addLine(this.props.no);
			}						
		}
		if(!this.props.allowEnter){
			if((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)){
				return false;
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
			reader.onload = function(e){
				var data = e.target.result;
				img.src=data;
				img.width=100;
				target.appendChild(img);
			}
			reader.readAsDataURL(file);
    	}
	},
	showDropping: function(e){
		this.setState({isDropover:true});
	},
	hideDropping: function(e){
		this.setState({isDropover:false});
	},
	showFiles: function(files){

	},
	render: function(){
		var self = this;
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
});

module.exports = ContentEditable;
