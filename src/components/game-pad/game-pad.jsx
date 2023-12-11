import React from 'react';
import btnA from '../../images/ciorcal-glass.png'
import './game-pad.css';
export default class GamePad extends React.Component {
	constructor() {
		super();
		this.state = {
			
		}
	}
	render() {

		return (
			<button id="btn-a" onClick={this.props.handleAnswerButtonClick}><h2 id="btn-txt">A</h2></button>		
		)
	}

}
