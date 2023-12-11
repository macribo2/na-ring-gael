import React from 'react';

export class BtnL extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-left" onClick={this.props.onClick}></button>		
		)
	}

}
