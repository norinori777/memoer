var React = require('react/addons');
var ContentEditable = require('../../public/jsx/ContentEditable.js');
var InputLine = require('../../public/jsx/InputLine.js');
var TestUtils = React.addons.TestUtils;

describe("inputLine",function(){
	beforeEach(function(){
		
	});
	if('should render',function(){
		myComponent = TestUtils.renderIntoDocument(<InputLine></InputLine>);
	});
});