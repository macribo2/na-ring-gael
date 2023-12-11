import React from 'react';

export class BtnU extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-up" onClick={this.props.onClick}></button>		
		)
	}

}
