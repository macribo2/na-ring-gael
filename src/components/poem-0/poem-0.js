/* eslint-disable no-sparse-arrays */
import React from 'react';
import '../concept/concept.css'
import './history.css';
import Rings3 from '../Rings/Rings6'
// import Rings3 from '../encounter/encounter'

// import Rings3 from '../Rings/Rings3'
import { Rings5 } from '../Rings/Rings5'
import bg from '../../images/Sample_interior.png'
import { BtnSelect } from '../ui/btn-select';
import { BtnStart } from '../ui/btn-start';
import { BtnA } from '../ui/btn-a';
import { BtnM } from '../ui/btn-m';
import { BtnB } from '../ui/btn-b';
import mobile from '../../images/agnes.png';
import promptVid from '../../images/stars.gif';
import closer from '../../audio/Threerh.ogg';
import slowBleeps from '../../audio/radar2.ogg';
import runLand from '../../images/stars.gif'

import historyVid from '../../images/stars.gif';
import desktopVid from '../../images/stars.gif';
import blueRabbit from '../../images/stars.gif';
import slide0 from '../../images/empty.png';
import slide1 from '../../images/About1/mouse-icons/mouse-arrow.png';
import slide2 from '../../images/About1/cursor-folder.png';
import slide3 from '../../images/About1/unix.png'
import slide4 from '../../images/About1/linux2.png'
import slide5 from '../../images/About1/apple-microsoft.png'
import slide6 from '../../images/About1/ubuntu.png'
import slide7 from '../../images/About1/linux.png'
import slide8 from '../../images/About1/linux.png'
import slide9 from '../../images/About1/backgrounds/linux/distros.gif'
import slide11 from '../../images/About1/banba_poster-0.png'
import slide13 from '../../images/About1/king.gif'
import slide14 from '../../images/About1/Daniel-Maclise.png'
import slide15 from '../../images/About1/pale.png'
import slide16 from '../../images/About1/ard.png'
import slide17 from '../../images/About1/spencer.png'
import slide18 from '../../images/About1/chief.png'
import slide19 from '../../images/About1/1798.png'
import slide21 from '../../images/About1/gpo.png'
import slide22 from '../../images/About1/feicimthu.png'

let engTexts = // eslint-disable-next-line no-sparse-arrays
['','','','','','','','','','','','',''
];

let storyTexts = [
'','','','','','','','','','','',''
    
];


let changeVid = () => {

}


let avatar = localStorage.getItem('avatar');
// alert(avatar);
function setPlayerIcon() {

}
export default class History extends React.Component {
    constructor() {
        super();

        this.state = {

            story: 0,
            toggleStartOptions: false,
            showFromMenu: false
        }
    }
   

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

    }

    bBtnDown = (e) => {

        this.setState({ engMode: true })
        console.log("engMode:" + this.state.engMode)
    }
    bBtnUp = () => {
        this.setState({ engMode: false })

        console.log("engMode:" + this.state.engMode)
    }

    toggleStartOptions = () => {
        if (this.state.showFromMenu === true) {
            this.setState({ showFromMenu: false })
            console.log('showFromMenu ' + this.state.showFromMenu)
        }
        else if (this.state.showFromMenu === false)
            this.setState({ showFromMenu: true })
        console.log('showFromMenu ' + this.state.showFromMenu)


    }

    resize() {
        this.setState({ mobile: window.innerWidth >= 760 });
        this.setState({ mobileHor: window.innerWidth >= window.innerHeight });
    }

    incrementStory = (ev) => { ev.preventDefault();this.setState({ story: this.state.story + 1 }) }
    decrementStory = (ev) => { ev.preventDefault();this.setState({ story: this.state.story - 1 }) }

    
    render() {
let isOn = this.props.isOn
let toggleIsOn = this.props.toggleIsOn

        return (
            <>
                

                    <Rings3 handleInputSelect={ this.props.handleInputSelect}isOn={isOn} toggleIsOn = {toggleIsOn}/>
                                
               
            </>

        )
    }

}