import React from 'react';
import '../concept/concept.css'
import '../../components/baile/baile.css';
import {BtnA} from '../../components/ui/btn-a';
import {BtnB} from '../../components/ui/btn-b';
import $ from 'jquery';
import { History } from '../history/history';
import { Col, Row, Button } from 'react-bootstrap'



export class Concept extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }


    jQueryCode = () => {
        //jshint esversion:6






        // $('#overlay-bearla').t('<h1>Name:</h1>');
        $('#shield-holder').on('touchstart', function () {
            $('#overlay-bearla').fadeIn();



        });
        $('#shield-holder').on('touchend', function () {
            $('#overlay-bearla').fadeOut();


        })
        //   let overlayBearla =   document.getElementById('overlay-bearla');
        //   let touchFís = (e) =>{
        // // overlayBearla.style();
        // alert();
        // }
        // let touchFísEnd = () =>{
        //   // alert('end')

        //   }

        let story = 2;





        //Initialize the gameMessage
        var gameMessage = ``;






        $('#fwdBtn').on('touchend', function () {
            alert(story)
            story++;
        });


        function narrate(story) {
            // output2.className=''; 
            console.log("test! " + story);
        }
        //test

        function stepBack() {
            // story--;
            playGame();
        }
        function stepFwd() {
            // story++;
            playGame();
        }
        function playGame() {
            narrate(story);
            console.log("hello narrate!");
            render();
            progressStory(story);
            console.log(story);
        }

        function progressStory() {

            if (story > 1) {
                // bckBtn.style.display = 'inline';
                // bckBtn.style.animation = 'delay-fade-in 1s';
                // fwdBtn.style.animation = 'slide-button-right 1s forwards';
                console.log("hello bckBtn?");
            }
            else {
                //I want this, it's not working yet:
                //bckBtn.style.animation='fade-out 0.25s forwards';
                //instead, I'm just setting display to 'none'
                // bckBtn.style.display = 'none';
                // fwdBtn.style.animation = 'slide-button-left 1s forwards';

            }
            if (story > 2) {

                // hum1.play();
            }
            //end of manifesto - begin game y/n?
            if (story === 5) {
                // playBtn.style.display='inline';
                // fwdBtn.style.animation='fade-out 0.25s forwards';
                // fwdBtn.style.visibility='hidden';
                // playBtn.style.animation='fade-in 1s';
                console.log("story === 5");
            }
            if (story === 1) {


            }
            if (story === 2) {
                // setTimeout(function () { cubes.style.display = "inline"; }, 1000);
                // setTimeout(function () { cubes.style.display = "none"; }, 3500);
                // output2.style.top = "-399px";
                // output2.style.left = "150px";

            }

            if (story === 3) {
                // output2.style.top = "-520px";
                // output2.style.left = "-100px";

            }

            if (story === 4) {
                //update button styles if player is coming back from events on story 5 
                // fwdBtn.style.left='-42px';
                // fwdBtn.style.display='inline';
                // fwdBtn.style.visibility='visible';
                // playBtn.style.display='none';
            }

        }


        function render() {
            //Render the location
            // output.innerHTML = map[mapLocation];
            // image.src = "../images/" + images[mapLocation];



            //Display the game message

        }

        // $('#myVideo').touchstart(function () {
        //     alert();
        // });


    }


    componentDidMount() {
        this.jQueryCode();
    }

    render() {





        return (
            <>



                <div className="stage-container" id="kungfu">

                    <History>History</History>
                    <div id="shield-holder" className="img-fluid"  ></div>

                    <div className="under-stage-left">


                        <div className="jq-grid-container">

                            <Row className="row">
                                <Col className="col"></Col>
                                <Col className="col"><div id="north"></div></Col>
                                <Col className="col"></Col>
                            </Row>
                            <Row className="row">
                                <Col className="col"><div id="west"> </div></Col>
                                <Col className="col"><div id="origin"> </div></Col>
                                <Col className="col"><div id="east"> </div></Col>
                            </Row>
                            <Row className="row">
                                <Col className="col"></Col>
                                <Col className="col"><div id="south"></div></Col>
                                <Col className="col"></Col>
                            </Row>
                        </div>



                    </div>
                    <div className="under-stage-right"></div>
                    {/* <div className="sea"></div> */}




                </div>

                <div id="top" className="row justify-content-center ">
                    <div id="toolbar"></div>
                    <h4 id="top-content"></h4>

                </div>

                <p id="output"></p>


                <div className="a-and-b">
                <div className="a-and-b-btns">

    <BtnB  id="prev" onClick={() => {alert("B")}} />

</div>

                        </div>
            </>

        )
    }

}