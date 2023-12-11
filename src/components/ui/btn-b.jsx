import React from 'react';
import btnB from '../../images/b-btn.png'
export class BtnB extends React.Component {

	constructor() {
		super();
		this.state = {
			
		}
	}
	render() {

		return (
				<button id="btn-b" onClick={this.props.onClick} onTouchStart={this.props.onTouchStart} onTouchEnd={this.props.onTouchEnd}><h2 id="btn-txt" className="btn-txt-b">B</h2></button>		
		)
	}

}
