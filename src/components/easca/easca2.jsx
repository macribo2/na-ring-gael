
/* eslint-disable no-sparse-arrays */
import React from 'react';
import './easca.css'

import $ from 'jquery';
import { Col, Row, Button ,BtnGroup } from 'react-bootstrap'


import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';



export default class Easca extends React.Component {
  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

      onKeyPress = (button) => {
        console.log("Button pressed", button);

        if (button === "{shift}") this.handleShift();
       else if (button === "{alt}") this.handleAlt();
        else { this.restoreDefaultKeyboard()}

      }
    constructor() {
        super();
        this.state = {
          layoutName: 'easca',
          input: "",
          display: {
            '{space}': ' ',
            '{backspace}': '⬅',
            '{enter}': '↵',
            '{alt}': 'ᵹ',
            '{shift}':'⇧'
          }
          
          
        }
    }
    
    // componentDidMount() {
     
    // }
  
    handleShift = () => {
      let layoutName = this.state.layoutName;
  
      this.setState({
        layoutName: layoutName === "shift" ? "easca" : "shift"
      });
    };

    restoreDefaultKeyboard = () => {
  
      this.setState({
        layoutName:  "easca"
      });
    };
    handleAlt = () => {
      let layoutName = this.state.layoutName;
  
      this.setState({
        layoutName: layoutName === "alt" ? "easca" : "alt"
      });
    };
	render(){


        return (
            
            
            <>
            <textarea maxLength="162" className="easca-input"
          value={this.state.input}
          placeholder={""}
          onChange={e => this.onChangeInput(e)}
        />
            <Keyboard 
              display={ this.state.display}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        
          layoutName={this.state.layoutName}
              layout={{
  
            easca: [
              "e r t u i o p {backspace}",
              "a s d f g h l",
              "c b n m . ? {alt}",
              "{shift} {space} {enter}"
            ],
            shift: [
              "E R T U I O P {backspace}",
              "A S D F G H L",
              "C B N M , ! {alt}",
              "{shift} {space} {enter}"
            ]
            ,
                alt: [
              "é ꞃ ṫ ú í ó ṗ {backspace}",
              "á ꞅ ḋ ḟ ġ Ꞅ ⁊",
              "ċ ḃ ṁ Á Í É {alt}",
              "{shift} {space} Ó Ú {enter}"
              
            ]


          }
          }
              
              
          buttonTheme={[
            {
              class: "hg-red",
              buttons: "Q W E R T Y q w e r t y"
            },
            {
              class: "hg-highlight",
              buttons: "Q q"
            }
          ]}
        
                />                



      </>)
		}
	}