{
	/*まとめ*/
}

Window.React = require('react');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var ContentEditableLine = require('./ContentEditableLine.js');
var ContentEditable = require('./ContentEditable.js');
var InputLine = require('./InputLine.js');
var InputMultiLines = require('./InputMultiLine.js');
var CurrentTime = require('./CurrentTime.js');
var MemoStore = require('../js/MemoStore.js');
var MemoActions = require('../js/MemoAction.js');

var FluxMixin = Fluxxor.FluxMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MemoerApp = React.createClass({
	mixins: [FluxMixin,StoreWatchMixin('MemoStore')],

	getStateFromFlux: function(){
		return this.getFlux().store('MemoStore').getState();
	},
	handleAdd: function(){
		var data = {title: this.state.title, memo: this.state.memoes};
		return this.getFlux().actions.addMemo(data);
	},

	render: function(){
		var cx = React.addons.classSet;
		var classes = cx({
			'memo__titleFont': true
		});
		return(
			<div>
				<heder>
					<ContentEditable classes={classes} 
									role={'title'}
									allowEnter={false}
									placeholder={'タイトルを入力してください'}
									inputValue={this.state.title.value} />
					<CurrentTime></CurrentTime>
				</heder>
				<article>
					<InputMultiLines data={this.state.memoes}></InputMultiLines>
				</article>
				<input type="button" id="add" value="登録" onClick={this.handleAdd}/>
				<footer></footer>
			</div>
		) 
	}
});

var stores = { MemoStore: new MemoStore()};
var flux = new Fluxxor.Flux(stores, MemoActions)

React.render(<MemoerApp flux={flux} />, document.getElementById('main'));



