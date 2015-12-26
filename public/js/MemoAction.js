var ControlData = require('../js/util/ControlData');

var constants = {
	ADD_MEMO: "ADD_MEMO",
	UPDATE_MEMO: "UPDATE_MEMO",
	UPDATE_TITLE: "UPDATE_TITLE"
};

var MemoActions = {
	updateMemo: function(memo){
		this.dispatch(constants.UPDATE_MEMO,{memo: memo});
	},
	updateTitle: function(title){
		this.dispatch(constants.UPDATE_TITLE,{title:title});
	},
	addMemo: function(data){
		var self = this;
		ControlData('POST',
					'/memo',
					data,
					function(){
						this.dispatch(constants.ADD_MEMO,{});
					}.bind(self)
		);
	}
};
module.exports = MemoActions;