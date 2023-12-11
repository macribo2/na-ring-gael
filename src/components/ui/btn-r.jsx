import React from 'react';

export class BtnR extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-right" onClick={this.props.onClick}></button>		
		)
	}

}
