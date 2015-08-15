{/*
　・ContentEditableを有効にする
　・placeholderの値を動的に設定出来るようにする。
　・値が入力された場合、placeholderの値が消えること。
　・値がなくなった場合、placeholderの値が表示されること。
 ・ENTERを押しても、Cancelされること。
*/}

window.React = require('react');
var React = require('react');

var ContentEditable = React.createClass({
	propTypes:{
	 	placeholder: React.PropTypes.string.isRequired
	},
	getDefaultProps: function(){
		return {
			placeholder: 'メモの題名を入力してください',
			allowEnter: false,
			fontType: 'Normal__font'
		}
	},
	getInitialState: function(){
		return{
			Value: '',
			isShowDefaultValue: true
		};
	},
	getDefaultValue: function(){
		return this.state.isShowDefaultValue ? this.props.placeholder : '';
	},
	handleChange: function(e){
		if(e.target.firstChild == null){
			this.setState({
				isShowDefaultValue: true
			});
		}　else　{
			this.setState({
				isShowDefaultValue: false,
				Value: e.target.firstChild
			});
		}
	},
	cancelEnter: function(e){
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
		e.target.classList.add('dropover');
	},
	hideDropping: function(e){
		e.target.classList.remove('dropover');
	},
	showFiles: function(files){

	},
	render: function(){
		var self = this;
		return (
			<div contentEditable 
				className={this.props.fontType}
				effectAllowed="move"
				data-placeholder={this.getDefaultValue()} 
				onInput={this.handleChange.bind(self)}
				onKeyDown={this.cancelEnter.bind(self)}
				onDragOver={this.handleDragOver}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				onDrop={this.handleDrop}>
				{this.state.titleValue}
			</div>
		);
	}
});

module.exports = ContentEditable;