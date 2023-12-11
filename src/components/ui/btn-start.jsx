import React from 'react';
import './ui.css'
export class BtnStart extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-start" onClick={this.props.onClick}></button>		
		)
	}

}
