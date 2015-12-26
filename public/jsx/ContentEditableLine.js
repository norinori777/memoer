{/*

*/}

window.React = require('react');
var React = require('react/addons');

var ContentEditableLine = React.createClass({

	propTypes:{
	 	data: React.PropTypes.string.isRequired,
	},
	render: function(){
		if(this.props.data === "[<BR>]"){
			return (
				<div>
					<br />
				</div>
			);			
		}else{
			return (
				<div>{this.props.data}</div>
			);			
		}
	}
});

module.exports = ContentEditableLine;
