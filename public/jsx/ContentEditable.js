{/*
　・ContentEditableを有効にする
　・placeholderの値を動的に設定出来るようにする。
　・値が入力された場合、placeholderの値が消えること。
　・値がなくなった場合、placeholderの値が表示されること。
 ・ENTERを押しても、Cancelされること。
*/}

window.React = require('react');
var React = require('react/addons');

var ContentEditable = React.createClass({
	propTypes:{
	 	placeholder: React.PropTypes.string.isRequired,
	 	classes: React.PropTypes.func.isRequired,
	 	onChange: React.PropTypes.func
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
	handleChange: function(e){
		if(e.target.firstChild == null){
			this.setState({
				isShowDefaultValue: true
			});
		}　else　{
			if(this.props.onChange){
				this.props.onChange(e);
			}
			this.setState({
				isShowDefaultValue: false,
				inputValue: e.target.firstChild
			});
		}
	},
	keyDown: function(e){
		if(this.props.addLine!==undefined){
			if((e.which && e.which === 9) || (e.keyCode && e.keyCode === 9)){
				this.props.addLine();
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
				onInput={this.handleChange.bind(self)}
				onKeyDown={this.keyDown.bind(self)}
				onDragOver={this.handleDragOver}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				onDrop={this.handleDrop}
				onChange={this.props.onChange}>
				{this.props.inputValue}
			</div>
		);
	}
});

module.exports = ContentEditable;