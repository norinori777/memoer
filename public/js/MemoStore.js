var Fluxxor = require('fluxxor');

var constants = {
	ADD_MEMO: "ADD_MEMO",
	UPDATE_MEMO: "UPDATE_MEMO",
	UPDATE_TITLE: "UPDATE_TITLE"
};

var MemoStore = Fluxxor.createStore({
	initialize: function(){
		this.memoes = [];

		this.memoes[0] = {
			no: 1,
			value: ""
		};
		this.title = {
			value: "",
		}
		date = "";
		this.line = 1;

		this.bindActions(
			constants.UPDATE_MEMO,	this.onUpdateMemo,
			constants.UPDATE_TITLE,	this.onUpdateTitle
		);
	},
	onUpdateMemo: function(payload){
		this.memoes[payload.memo.no - 1] = {
			no: payload.memo.no,
			value: payload.memo.value
		}
		this.emit('change');
	},
	onUpdateTitle: function(payload){
		this.title = {
			value: payload.title.value,
		};
		this.emit('change');
	},
	getState: function(){
		return {
			memoes: this.memoes,
			title: this.title,
			line: this.line
		}
	}
});

module.exports = MemoStore;