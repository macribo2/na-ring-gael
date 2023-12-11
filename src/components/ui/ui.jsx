import React from 'react';
import {BtnA} from './btn-a';
// import BtnB from './btn-b';
// import BtnU from './btn-u';
// import BtnD from './btn-d';
// import BtnL from './btn-l';
// import BtnR from './btn-r';

export class UI extends React.Component {

	constructor() {
		super();
		this.state = {

		}
	}
	render() {

		return (
			<>
				<BtnA onClick={this.props.onClick}/>
				{/* <BtnB />
				<BtnR />
				<BtnL />
				<BtnU />
				<BtnD />
				

		 */}
			</>
		)
	}

}















// import React from 'react';

// export class UI extends React.Component {

// 	constructor() {
// 		super();
// 		this.state = {

// 		}
// 	}
// 	render() {
// 		let incTallyA = this.props.incTallyA;
// 		let decTallyA = this.props.decTallyA;
// 		let incTallyB = this.props.incTallyB;
// 		let decTallyB = this.props.decTallyB;
// 		let incTallyX = this.props.incTallyA;
// 		let decTallyX = this.props.decTallyA;
// 		let incTallyY = this.props.incTallyY;
// 		let decTallyY = this.props.decTallyY;
// 		return (
// 			<>
// 				<button id="dir-left" onClick={this.props.odecTallyB}>left</button>
// 				<button id="dir-right" onClick={incTallyB}>right</button>
				

// 				<button id="dir-up" onClick={incTallyB}>up</button>
// 				<button id="dir-down" onClick={decTallyB}>down</button>
				
// 			</>
// 		)
// 	}

// }