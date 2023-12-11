import React from 'react';
import btnA from '../../images/a-btn.png'
export class BtnA extends React.Component {

	constructor() {
		super();
		this.state = {
			
		}
	}
	render() {

		return (
				<button id="btn-a" onClick={this.props.onClick}><h2 id="btn-txt">A</h2></button>		
		)
	}

}
