{
	/*まとめ*/
}

Window.React = require('react');
var React = require('react/addons');
var cx = React.addons.classSet;
var ContentEditable = require('./ContentEditable.js');
var InputLine = require('./InputLine.js');
var InputMultiLines = require('./InputMultiLine.js');
var CurrentTime = require('./CurrentTime.js');
var classes = cx({
	'memo__titleFont': true
});
var allowLines = 1;

React.render(<ContentEditable classes={classes}></ContentEditable>, document.getElementById('title'));
React.render(<CurrentTime></CurrentTime>, document.getElementById('time'));
React.render(<InputMultiLines allowLines={allowLines}></InputMultiLines>, document.getElementById('memo'));


