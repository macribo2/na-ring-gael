/* eslint-disable no-sparse-arrays */
import React from 'react';
import './easca.css'
import $ from 'jquery';
import pearl from '../../images/stone-soup/misc_crystal_old.png'



export default class Easca extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect:null
        }
    }
    
	jQueryCode = () => {
		let myVar
		let showWhatKeys;

		// new ClipboardJS('#copy');

		let keyPressed;

		let keysToShow = [];
		showWhatKeys = (keyPressed) => {
			switch (keyPressed) {
				case 'a': keysToShow.push('a');
					keysToShow.push('á');
					keysToShow.push('A');
					break;
			

				case 'b': keysToShow.push('b');
					keysToShow.push('ḃ');
					keysToShow.push('B');
					keysToShow.push('v');

					break;
			
				case 'c': keysToShow.push('c');
					keysToShow.push('ċ');
					keysToShow.push('C');
					keysToShow.push('k');
					keysToShow.push('q');
					break;
			
				case 'd': keysToShow.push('d');
					keysToShow.push('ḋ');
					keysToShow.push('D');
					keysToShow.push('j');
					break;
			
				case 'e': keysToShow.push('e');
					keysToShow.push('é');
					keysToShow.push('E');
					break;
			
				case 'f': keysToShow.push('f');
					keysToShow.push('ḟ');
					keysToShow.push('F');
					break;
			
				case 'g': keysToShow.push('g');
					keysToShow.push('ġ');
					keysToShow.push('G');
					break;
			
				case 'h': keysToShow.push('h');
					keysToShow.push('H');
					break;
			
				case 'i': keysToShow.push('i');
					keysToShow.push('í');
					keysToShow.push('y');
					break;
			
				case 'l': keysToShow.push('l');
					keysToShow.push('L');
					break;
			
				case 'm': keysToShow.push('m');
					keysToShow.push('ṁ');
					keysToShow.push('M');
					break;
			
				case 'n': keysToShow.push('n');
					keysToShow.push('N');
					break;
			
				case 'o': keysToShow.push('o');
					keysToShow.push('ó');
					keysToShow.push('O');
					break;
			
				case 'p': keysToShow.push('p');
					keysToShow.push('ṗ');
					keysToShow.push('P');
					break;
			
				case 'r': keysToShow.push('r');
					keysToShow.push('ꞃ');
					keysToShow.push('R');
					break;
			
				case 's': keysToShow.push('s');
					keysToShow.push('ṡ');
					keysToShow.push('S');
					keysToShow.push('z');


					break;
			
				case 't': keysToShow.push('t');
					keysToShow.push('ṫ');
					keysToShow.push('T');
					break;
			
				case 'u': keysToShow.push('u');
					keysToShow.push('ú');
					keysToShow.push('U');
					keysToShow.push('w');

					break;
			
			

				default: break;
			}
	
		}


		$('#fada-mode').hide();
		$('#caps-keyboard-container').hide();
		let capsMode = false;


		function toggleCapsMode() {
			if (capsMode === true) {
				$('#keyboard-container').show();
				$('#caps-keyboard-container').hide();
				capsMode = false;
			}
			else {
				$('#keyboard-container').hide();
				$('#alt-keyboard-container').hide();
				$('#caps-keyboard-container').show();

				capsMode = true;

			}
			;

		}
		function fadaMode() {

			$('#keyboard-container').hide();
			$('#fada-mode').show();

			$('.btn').on('touchend', function (e) {
				if (keyPressed != "Ᵹ") {
					$('#keyboard-container').show();
					$('#fada-mode').hide();
				}
			})
		}
		// 	else{
		// 		$('#keyboard-container').show();
		// 	$('#alt-keyboard-container').hide();
		// 	fadaMode=false;
		// 	}
		// }


		function holdKeyDown() {
			// alert(keyPressed);
	
			// alert(keysToShow)
			for (let i = 0; i < keysToShow.length; i++) {
				let newButton = `<button id=` + keysToShow[i] + `  type="button" class="btn btn-right-logo btn-outline-dark j-line-btn">` + keysToShow[i] + `</button>`
				$('#j-line').append(newButton)
			}

			$('#j-line').fadeIn();
			// let newLeft = $('#' + keyPressed).offset().left;
			// let newTop = $('#' + keyPressed).offset().top - 50;
			// $('#j-line').css({ "left": newLeft });
			// $('#j-line').css({ "top": newTop });
			$('.j-line-btn').on('touchstart', function () {
				$('#hero-says').append(this.id)
				setTimeout(function () { 
					$('#j-line').fadeOut();
				},250)
			})
			setTimeout(function () {
				$('#j-line').fadeOut();
				// alert("removed");
			}, 3000
			)
		}
		$('.btn').on('touchstart', function () {

			$('#j-line').empty();
			keyPressed = (this.innerHTML);
			keysToShow = [];
			showWhatKeys(keyPressed);
	if ($('#j-line').is(':visible')) { 
			$('#hero-says').append(keyPressed)
		}
			myVar = setTimeout(holdKeyDown, 600);
	
		})
		$('.btn').on('touchend', function (e) {
		if(	$('#j-line').is(':visible')){ 


			}
			$(this).addClass('hl');
			// alert()

			clearTimeout(myVar)
			var id = this.id
			if (id === "fada") {
				fadaMode();
				// alert('alt')
			}
			else if (
					
				(this.id === "copy")
			) {
				// toggleCapsMode()

					
			}
			else
				if (id === 'undo') {
					var temp = $('#hero-says').text();
					temp.toString();
					let str = temp.substring(0, temp.length - 2);
					$('#hero-says').text(str);
				}
				else if ($('#j-line').is(':hidden')) {
					// alert("hidden")
					$('#hero-says').append(keyPressed);
					keysToShow = [];
				}
	
		});
		// if (id === 'undo'){
		// 	let temp = document.getElementById('#hero-says');
		// 	alert(temp)
		// }


		}
        componentDidMount() {
            if (this.state.redirect) {
                // return <Redirect to="/login"  />
              }
        
              const h1 = $('h1')
              console.log(h1)      
                 this.jQueryCode();
              
    }


 
    appendToOutput(char) {
        return <p>hello</p>
     }
	render(){
		return(
            <>

				{ 
		}
				<div id="easca">
            




            <p id="hero-says"> </p>

    
    
    
        <div id="keyboard-container" className="">
            <div className="BtnGroup BtnGroup-lg" id="e-line"role="group" aria-label="...">					
                        <button  onClick={() => console.log("e"+this.value) } type="button" id="e" className="btn btn-right">e</button>
                        <button type="button" id="r" className="btn-left btn ">r</button>
                        <button type="button" id="t" className="btn btn-right ">t</button>
                        <button type="button" id="u" className="btn-left btn ">u</button>
                        <button type="button" id="i" className="btn btn-right ">i</button>
                        <button type="button" id="o" className="btn-left btn ">o</button>
                        <button type="button" id="p" className="btn btn-right ">p</button>
            </div>
            <div className="BtnGroup BtnGroup-lg" id="a-line"role="group" aria-label="...">					
            
            <button type="button" id="a" className="btn-left btn ">a</button>
            <button type="button"id="s"  className="btn btn-right ">s</button>
            <button type="button"id="d"  className="btn-left btn ">d</button>
            <button type="button"id="f"  className="btn-right btn ">f</button>
            <button type="button"id="g"  className="btn-left btn ">g</button>
            <button type="button"id="h"  className="btn-right btn ">h</button>
            <button type="button"id="l"  className="btn-left btn " 
                onMouseUp={this.props.incrementStory} onTouchEnd={ this.goCd}
            >l</button>
    
    </div>
    <div className="BtnGroup BtnGroup-lg" id="c-line"role="group" aria-label="...">					
    
                        <button type="button" id="c" className="btn-right btn ">c</button>
                        <button type="button" id="b" className="btn-left btn ">b</button>
                        <button type="button" id="n" className="btn-right btn ">n</button>
                        <button type="button" id="m" className="btn-left btn ">m</button>
                        <button type="button" id="," className="btn-right btn ">,</button>
                        <button type="button" id="." className="btn-left btn ">.</button>
                        <button type="button" id="?" className="btn-right btn ">?/!</button>
                    </div>

                    <div className="btn-group btn-group-lg" id="shift-line" role="group" aria-label="...">
        
        <button type="button" id="undo" className="btn-right btn btn-outline-dark">
		⌫
        </button>
        <button type="button" id="divs" className="btn-left btn btn-outline-dark">㉧</button>
        <button type="button" className="space btn btn-outline-dark"> </button>
        <button type="button" className=" enter btn-right  btn btn-outline-dark"><i className="fa fa-arrow-right"></i></button>
        
							<button type="button" className="btn" id="exit-easca" onTouchStart={() => {
								$('#easca').fadeOut();
								$('#hero-says').html('')}} > 🗙
          {/* <img src={pearl} /> */}
        </button>
      </div>
                      
        </div>
      

        </div>


                <div id="j-line"></div>
       


            </>
		)
	}

}