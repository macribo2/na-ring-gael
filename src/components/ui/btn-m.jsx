import React from 'react';

export class BtnM extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-middle" onClick={this.props.onClick}></button>		
		)
	}

}
