import React from 'react';

export class BtnD extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-down" onClick={this.props.onClick}></button>		
		)
	}

}
