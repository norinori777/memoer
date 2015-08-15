var React = require('react/addons');
var ContentEditable = require('../../public/jsx/ContentEditable.js');
var TestUtils = React.addons.TestUtils;

describe("ContentEditable",function(){
	var myComponent;
	describe("renderIntoDocument",function(){
		beforeEach(function(){
			myComponent = TestUtils.renderIntoDocument(<ContentEditable></ContentEditable>);
		});
		it("should render",function(){
			expect(TestUtils.findRenderedDOMComponentWithClass(myComponent,'Normal__font').getDOMNode().className).toBe('Normal__font');
		});
	});
	describe("renderIntoDocument",function(){
		beforeEach(function(){
			myComponent = TestUtils.renderIntoDocument(<ContentEditable></ContentEditable>);
			TestUtils.Simulate.input(myComponent.getDOMNode(),{target:{firstChild:'テストデータ'}});
		});
		it("should render",function(){
			expect(myComponent.state.isShowDefaultValue).toBe(false);
			expect(myComponent.state.titleValue).toBe('テストデータ');
			
		});
	});
});