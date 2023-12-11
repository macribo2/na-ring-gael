import React from 'react';
import btnB from './b-btn.png'
export class BtnB extends React.Component {

	constructor() {
		super();
		this.state = {
			
		}
	}
	render() {

		return (
				<button id="btn-b" className="btn-txt-b" onClick={this.props.onClick} onTouchStart={this.props.onTouchStart} onTouchEnd={this.props.onTouchEnd}><h2 id="btn-txt"></h2></button>		
		)
	}

}
