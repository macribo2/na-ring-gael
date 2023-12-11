import React from 'react';
import './ui.css'
export class BtnSelect extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
				<button id="btn-select"onClick={this.props.onClick}></button>		
		)
	}

}
