import React from 'react';
import './overworld.css';
import NumberOne from '../numberOne/numberOne'
import ReactRain from 'react-rain-animation';
import bit from '../../images/gifs/bit.gif'
import "react-rain-animation/lib/style.css";
import Easca from '../easca/easca2'
import { Rings7 } from '../Rings/Rings7'
import { Rings5 } from '../Rings/Rings5'
import Rings6 from '../Rings/Rings6'
import '../Rings/rings1.css';
import emerald from '../../images/misc_crystal_new.png'
import { Score } from '../score/score'
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import stats from '../../images/inv/stats.png';
import disk from '../../images/inv/diskette.png';
import chat from '../../images/inv/chat.png';
import daff from '../../images/localMaps/daff.gif'
import portrait from '../../images/empty.png'
import { BtnB } from './../ui/btn-b';
import promptVid from '../../images/stars.gif'
import ciaroga from '../../images/players/agnes_new.png'
import phone1 from '../../images/phone-0.png';
import glass from '../../images/big-glass.png';
import glassPortait from '../../images/big-glass-portrait.png';
import defaultField from '../../images/localMaps/defaultField.png';
import collinstown from '../../images/localMaps/collinstown.png';
import fernaRiver from '../../images/localMaps/dungeonfog.png';
import ferna from '../../images/localMaps/fearnasringfort.png';
import statsMenu from '../../images/fog3.png';
import invIcon from '../../images/inv/backpack.png';
import invMenu from '../../images/vert-bg0.png';
import diskMenu from '../../images/blackripple.gif';
import Battle from '../battle/battle0'
import EascaLocation from '../easca-location/easca-location'
import rocks from '../../images/rocks.png'
import place0 from '../../images/empty.png'
import lderra from '../../images/ai-art/places/lderra.jpg'
import tullyn from '../../images/ai-art/places/tullyn.jpg'
import collin from '../../images/ai-art/places/collin.jpg';
import corlis from '../../images/ai-art/places/corlis.jpg';
import kilbeg from '../../images/ai-art/places/kilbeg.jpg';
import mullin from '../../images/ai-art/places/mullin.jpg';
import beltur from '../../images/ai-art/places/beltur.jpg'
import birr from '../../images/ai-art/places/birr.jpg'
import clonma from '../../images/ai-art/places/clonma.jpg'
import dunare from '../../images/ai-art/places/dunare.jpg'
import edende from '../../images/ai-art/places/edende.jpg'
import kilbri from '../../images/ai-art/places/kilbri.jpg'
import kinnit from '../../images/ai-art/places/kinnit.jpg'
import lisgre from '../../images/ai-art/places/lisgre.jpg'
import navan from '../../images/ai-art/places/navan.jpg'
import oakwoo from '../../images/ai-art/places/oakwoo.jpg'
import rathan from '../../images/ai-art/places/rathan.jpg'
import redhil from '../../images/ai-art/places/redhil.jpg'
import rathca from '../../images/ai-art/places/rathca.jpg'
import ridge from '../../images/ai-art/places/ridge.jpg'
import sacred from '../../images/ai-art/places/sacred.jpg'
import shinro from '../../images/ai-art/places/shinro .jpg'
import macair from '../../images/ai-art/places/macair.jpg'

import caisui from '../../images/ai-art/places/caisui.jpg'
import athnaf from '../../images/ai-art/places/athnaf.jpg'
import bealfe from '../../images/ai-art/places/bealfe.jpg'
import arklow from '../../images/ai-art/places/arklow.jpg'
import avoca from '../../images/ai-art/places/avoca.jpg'
import leiman from '../../images/ai-art/places/leiman.jpg'
import dundeal from '../../images/ai-art/places/dundeal.jpg'
import angria from '../../images/ai-art/places/angria.jpg'
import bafhir from '../../images/ai-art/places/bafhir.jpg'
import pollph1 from '../../images/ai-art/places/pollph1.jpg'
import baghea from '../../images/ai-art/places/baghea.jpg'
import caiara from '../../images/ai-art/places/caiara.jpg'
import icorth from '../../images/ai-art/places/icorth.jpg'
import pollph2 from '../../images/ai-art/places/pollph2.jpg'
import maolann from '../../images/ai-art/places/maolann.jpg'
import aadubh from '../../images/ai-art/places/aadubh.jpg'
import duncor from '../../images/ai-art/places/duncor.jpg'
import pcaonr from '../../images/ai-art/places/pcaonr.jpg'
// import anbfhu from '../../images/ai-art/places/anbfhu.jpg'
import anfheot from '../../images/ai-art/places/anfheot.jpg'
import bruri from '../../images/ai-art/places/bruri.jpg'
import fionng from '../../images/ai-art/places/fionng.jpg'
import cdolca from '../../images/ai-art/places/cdolca.jpg'
import ctarbh from '../../images/ai-art/places/ctarbh.jpg'
import beadai from '../../images/ai-art/places/beadai.jpg'
import dlaoig from '../../images/ai-art/places/dlaoig.jpg'
import deilgi from '../../images/ai-art/places/deilgi.jpg'
import gleada from '../../images/ai-art/places/gleada.jpg'
import garbha from '../../images/ai-art/places/garbha.jpg'
import dseanb from '../../images/ai-art/places/dseanb.jpg'
import ansile from '../../images/ai-art/places/ansile.jpg'
import fionac from '../../images/ai-art/places/fionac.jpg'
import dromad from '../../images/ai-art/places/dromad.jpg'
import reachl from '../../images/ai-art/places/reachl.jpg'
import dearbh from '../../images/ai-art/places/dearbh.jpg'
import aeocha from '../../images/ai-art/places/aeocha.jpg'
import carnmh from '../../images/ai-art/places/carnmh.jpg'
import cddamh from '../../images/ai-art/places/cddamh.jpg'
import bidabh from '../../images/ai-art/places/bidabh.jpg'
import sdbhea from '../../images/ai-art/places/sdbhea.jpg'
import lceana from '../../images/ai-art/places/lceana.jpg'
import bfeich from '../../images/ai-art/places/bfeich.jpg'
import ncgorm from '../../images/ai-art/places/ncgorm.jpg'
import angara from '../../images/ai-art/places/angara.jpg'
import paitea from '../../images/ai-art/places/paitea.jpg'
import eadarn from '../../images/ai-art/places/eadarn.jpg'
import lnadar from '../../images/ai-art/places/lnadar.jpg'
import scriob from '../../images/ai-art/places/scriob.jpg'
import iceith from '../../images/ai-art/places/iceith.jpg'
import sanogl from '../../images/ai-art/places/sanogl.jpg'
import gaphre from '../../images/ai-art/places/gaphre.jpg'
import bnmhla from '../../images/ai-art/places/bnmhla.jpg'
import ctsail from '../../images/ai-art/places/ctsail.jpg'
import ascioba from '../../images/ai-art/places/ascioba.jpg'
import ncliat from '../../images/ai-art/places/ncliath.jpg'
import sealai from '../../images/ai-art/places/sealai.jpg'
import dard from '../../images/ai-art/places/dard.jpg'
import clfada from '../../images/ai-art/places/clfada.jpg'
import batoba from '../../images/ai-art/places/batoba.jpg'
import lbfinn from '../../images/ai-art/places/lbfinn.jpg'
import lbdear from '../../images/ai-art/places/lbdear.jpg'
import cnfola from '../../images/ai-art/places/cnfola.jpg'
import doire from '../../images/ai-art/places/doire.jpg'
import dfiolt from '../../images/ai-art/places/dfiolt.jpg'
import aseanm from '../../images/ai-art/places/aseanm.jpg'
import muimor from '../../images/ai-art/places/muimor.jpg'
// import bangca from '../../images/ai-art/places/bangca.jpg'
// import mratha from '../../images/ai-art/places/mratha.jpg'
// import lamhad from '../../images/ai-art/places/lamhad.jpg'
// import atmor from '../../images/ai-art/places/atmor.jpg'
// import abhoca from '../../images/ai-art/places/abhoca.jpg'
import uaimnc from '../../images/ai-art/places/uaimnc.jpg'
import maceab from '../../images/ai-art/places/maceab.jpg'
import budala from '../../images/ai-art/places/budala.jpg'
import tobanc from '../../images/ai-art/places/tobanc.jpg'
import roscre from '../../images/ai-art/places/roscre.jpg'
import durlas from '../../images/ai-art/places/durlas.jpg'
import eireil from '../../images/ai-art/places/eireil.jpg'
import daru from '../../images/ai-art/places/daru.jpg'
import anbafi from '../../images/ai-art/places/anbafi.jpg'
import drcrab from '../../images/ai-art/places/drcrab.jpg'
import buirio from '../../images/ai-art/places/buirio.jpg'
import slanco from '../../images/ai-art/places/slanco.jpg'
import anbadu from '../../images/ai-art/places/anbadu.jpg'
import dungar from '../../images/ai-art/places/dungar.jpg'
import gracuf from '../../images/ai-art/places/gracuf.jpg'
import glnapu from '../../images/ai-art/places/glnapu.jpg'
import dunpad from '../../images/ai-art/places/dunpad.jpg'


import cuilant from '../../images/ai-art/places/1.png'
import slnamb from '../../images/ai-art/places/1.png'
import clumea from '../../images/ai-art/places/1.png'
import tignao from '../../images/ai-art/places/1.png'
import tuanir from '../../images/ai-art/places/1.png'
import clufia from '../../images/ai-art/places/1.png'
import cilmio from '../../images/ai-art/places/1.png'
import pollph3 from '../../images/ai-art/places/1.png'
import derryn from '../../images/ai-art/places/derryn.jpg'
import Encounter from '../encounter/encounter'
import $ from 'jquery';
import empty from "../../images/empty.png"
import geaga from "../../images/empty.png"
import ringIcon from '../../images/gold.png'
import blocked from '../../images/empty.png'
import sea0 from '../../images/tonnta1.jpg'
import town0 from '../../images/shields.png'
import Silken from '../silken/silken'
import avatar1 from '../../images/players/spéirbhean0.gif';
import avatar2 from '../../images/players/douglas.png';
import avatar3 from '../../images/players/fianna0.png';
import avatar4 from '../../images/players/alex.png';
import avatar5 from '../../images/players/rógaire0.png'
import avatar6 from '../../images/players/diamhraí0.gif';
import avatar7 from '../../images/players/seanchaí0.png';
import avatar8 from '../../images/players/pooka.png';
import avatar9 from '../../images/players/poet.png';
import agnes2 from '../../images/players/bodach0.gif';
import hint3 from '../../images/gifs/hint3.gif';
import og from '../../images/a-btn.png'
import ringItem from '../../images/stone-soup/expired_portal.png';
import mobile from '../../images/players/rógaire0.png'
import champion1 from '../../images/champions/1.png'
import champion2 from '../../images/champions/2.png'
import champion3 from '../../images/champions/3.png'
import champion4 from '../../images/champions/4.png'
import champion5 from '../../images/champions/5.png'
import champion6 from '../../images/champions/6.png'
import champion7 from '../../images/champions/7.png'
import champion8 from '../../images/champions/8.png'
import champion9 from '../../images/champions/9.png'
import champion10 from '../../images/champions/10.png'
import champion11 from '../../images/champions/11.png'
import champion12 from '../../images/champions/12.png'
import champion13 from '../../images/champions/13.png'
import champion14 from '../../images/champions/14.png'
import champion15 from '../../images/champions/15.png'
import champion16 from '../../images/champions/16.png'
import champion17 from '../../images/champions/17.png'
import champion18 from '../../images/champions/18.png'
import champion19 from '../../images/champions/19.png'
import champion20 from '../../images/champions/20.png'
import champion21 from '../../images/champions/21.png'
import champion22 from '../../images/champions/22.png'
import champion23 from '../../images/champions/23.png'
import champion24 from '../../images/champions/24.png'
import champion25 from '../../images/champions/25.png'
import champion26 from '../../images/champions/26.png'
import champion27 from '../../images/champions/27.png'
import champion28 from '../../images/champions/28.png'
import champion29 from '../../images/champions/29.png'
import champion30 from '../../images/champions/30.png'
import champion31 from '../../images/champions/31.png'
import champion32 from '../../images/champions/32.png'
import champion33 from '../../images/champions/33.png'
import champion34 from '../../images/champions/34.png'
import champion35 from '../../images/champions/35.png'
import champion36 from '../../images/champions/36.png'
import champion37 from '../../images/champions/37.png'
import champion38 from '../../images/champions/38.png'
import champion39 from '../../images/champions/39.png'
import champion40 from '../../images/champions/40.png'
import champion41 from '../../images/champions/41.png'
import champion42 from '../../images/champions/42.png'
import champion43 from '../../images/champions/43.png'
import champion44 from '../../images/champions/44.png'
import champion45 from '../../images/champions/45.png'
import champion46 from '../../images/champions/46.png'
import champion47 from '../../images/champions/47.png'
import champion48 from '../../images/champions/48.png'
import champion49 from '../../images/champions/49.png'
import champion50 from '../../images/champions/50.png'
import champion51 from '../../images/champions/51.png'
import champion52 from '../../images/champions/52.png'
import champion53 from '../../images/champions/53.png'
import champion54 from '../../images/champions/54.png'
import champion55 from '../../images/champions/55.png'
import champion56 from '../../images/champions/56.png'
import champion57 from '../../images/champions/57.png'
import champion58 from '../../images/champions/58.png'
import champion59 from '../../images/champions/59.png'
import champion60 from '../../images/champions/60.png'
import champion61 from '../../images/champions/61.png'
import champion62 from '../../images/champions/62.png'
import champion63 from '../../images/champions/63.png'
import champion64 from '../../images/champions/64.png'
import champion65 from '../../images/champions/65.png'
import champion66 from '../../images/champions/66.png'
import champion67 from '../../images/champions/67.png'
import champion68 from '../../images/champions/68.png'
import champion69 from '../../images/champions/69.png'
import champion70 from '../../images/champions/70.png'
import champion71 from '../../images/champions/71.png'
import champion72 from '../../images/champions/72.png'
import champion73 from '../../images/champions/73.png'
import champion74 from '../../images/champions/74.png'
import champion75 from '../../images/champions/75.png'
import champion76 from '../../images/champions/76.png'
import champion77 from '../../images/champions/77.png'
import champion78 from '../../images/champions/78.png'
import champion79 from '../../images/champions/79.png'
import champion80 from '../../images/champions/80.png'
import champion81 from '../../images/champions/81.png'
import champion82 from '../../images/champions/82.png'
import champion83 from '../../images/champions/83.png'
import champion84 from '../../images/champions/84.png'
import champion85 from '../../images/champions/85.png'
import champion86 from '../../images/champions/86.png'
import champion87 from '../../images/champions/87.png'
import champion88 from '../../images/champions/88.png'
import champion89 from '../../images/champions/89.png'
import champion90 from '../../images/champions/90.png'
import champion91 from '../../images/champions/91.png'
import champion92 from '../../images/champions/92.png'
import champion93 from '../../images/champions/93.png'
import champion94 from '../../images/champions/94.png'
import champion95 from '../../images/champions/95.png'
import champion96 from '../../images/champions/96.png'
import champion97 from '../../images/champions/97.png'
import champion98 from '../../images/champions/98.png'
import champion99 from '../../images/champions/99.png'
import rotatePhone from '../../images/gifs/hint-4-rotate.gif'
let whereAmI = 'geaga';
let mapChanges = 0;
let overworldPortrait;
let whereAmIHolder = 'null';
let showHint3 = false;
let locationGraphic = place0;
let secondLocation = "Dún Laoghaire";
let avatar = "";
function setGeagaIcon(icon) {
    return icon
}
function setIcon(icon) {
    return icon
}
let stillPressedNorth;
let stillPressedSouth;
let stillPressedEast;
let stillPressedWest;
let whereAbouts;
let irishNotes = [
    ''
]
let gaeNotes = [
    'ó 0 go 1',
    "Aontroim",
    "Ard Mhacha",
    "Ceatharlach",
    "Cavan",
    "Clare",
    "Cork",
    "Derry",
    "Donegal",
    "Down",
    "Dublin",
    "Fermanagh",
    "Galway",
    "Kerry",
    "Kildare",
    "Kilkenny",
    "Laois",
    "Leitrim",
    "Limerick",
    "Longford",
    "Louth",
    "Mayo",
    "Meath",
    "Monaghan",
    "Offaly",
    "Roscommon",
    "Sligo",
    "Tipperary",
    "Tyrone",
    "Waterford",
    "An tIarmhí",
    "Wexford",
    "Cill Mhantáin",
    "",

    "fill anois go Dún Sí"


];
let engNotes = [
    'From 0 to 1',
    "Antrim, lone dwelling",
    "Armagh, Macha's height",
    "Carlow, place of cattle",
    "Cavan",
    "Clare",
    "Cork",
    "Derry",
    "Donegal",
    "Down",
    "Dublin",
    "Fermanagh",
    "Galway",
    "Kerry",
    "Kildare",
    "Kilkenny",
    "Laois",
    "Leitrim",
    "Limerick",
    "Longford",
    "Louth",
    "Mayo",
    "Meath",
    "Monaghan",
    "Offaly",
    "Roscommon",
    "Sligo",
    "Tipperary",
    "Tyrone",
    "Waterford",
    "Westmeath",
    "Wexford",
    "Wicklow, meadow of the Vikings. Cill Mhantáin from Church of Mantan",
    "",
    "return to Dunshee"

];
let narrativeCode = 0;

/*block android long click menu*/
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
function setPlayerIcon() {
    overworldPortrait = localStorage.getItem('quest-portrait');

    // { localStorage.setItem('portrait',"")}

    switch (overworldPortrait) {
        case "0": return champion19;
        case "1": return champion1;
        case "2": return champion2;
        case "3": return champion3;
        case "4": return champion4;
        case "5": return champion5;
        case "6": return champion6;
        case "7": return champion7;
        case "8": return champion8;
        case "9": return champion9;

        case "10": return champion10;
        case "11": return champion11;
        case "12": return champion12;
        case "13": return champion13;
        case "14": return champion14;
        case "15": return champion15;
        case "16": return champion16;
        case "17": return champion17;
        case "18": return champion18;
        case "19": return champion19;

        case "20": return champion20;
        case "21": return champion21;
        case "22": return champion22;
        case "23": return champion23;
        case "24": return champion24;
        case "25": return champion25;
        case "26": return champion26;
        case "27": return champion27;
        case "28": return champion28;
        case "29": return champion29;


        case "30": return champion30;
        case "31": return champion31;
        case "32": return champion32;
        case "33": return champion33;
        case "34": return champion34;
        case "35": return champion35;
        case "36": return champion36;
        case "37": return champion37;
        case "38": return champion38;
        case "39": return champion39;

        case "40": return champion40;
        case "41": return champion41;
        case "42": return champion42;
        case "43": return champion43;
        case "44": return champion44;
        case "45": return champion45;
        case "46": return champion46;
        case "47": return champion47;
        case "48": return champion48;
        case "49": return champion49;

        case "50": return champion50;
        case "51": return champion51;
        case "52": return champion52;
        case "53": return champion53;
        case "54": return champion54;
        case "55": return champion55;
        case "56": return champion56;
        case "57": return champion57;
        case "58": return champion58;
        case "59": return champion59;

        case "60": return champion60;
        case "61": return champion61;
        case "62": return champion62;
        case "63": return champion63;
        case "64": return champion64;
        case "65": return champion65;
        case "66": return champion66;
        case "67": return champion67;
        case "68": return champion68;
        case "69": return champion69;

        case "70": return champion70;
        case "71": return champion71;
        case "72": return champion72;
        case "73": return champion73;
        case "74": return champion74;
        case "75": return champion75;
        case "76": return champion76;
        case "77": return champion77;
        case "78": return champion78;
        case "79": return champion79;
        case "80": return champion80;
        case "81": return champion81;
        case "82": return champion82;
        case "83": return champion83;
        case "84": return champion84;
        case "85": return champion85;
        case "86": return champion86;
        case "87": return champion87;
        case "88": return champion88;
        case "89": return champion89;
        case "90": return champion90;
        case "91": return champion91;
        case "92": return champion92;
        case "93": return champion93;
        case "94": return champion94;
        case "95": return champion95;
        case "96": return champion96;
        case "97": return champion97;
        case "98": return champion98;
        case "99": return champion99;

        default: return avatar9;
    }
}



function setNPCIcon(npc) {
    // let overworldPortrait = localStorage.getItem('portrait');

    // { localStorage.setItem('portrait',"")}
    return npc
}
export default class Overworld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerMenu: false,
            mobile: false,
            mobileHor: true,
            whereAmI: 'geaga',
            isOn: false,
            statsVisible: false,
            diskVisible: false,
            inventoryVisible: false,
            showEascaLocation: true,
            isVisible: false,
            // whereAmI: localStorage.getItem('whereAmI')
            data: "",
            speakWithDM: true,
            isEncounterComponentVisible: true,
            encounterID: 0,

        }
        
        
    }
    
    
    resize() {
        this.setState({ mobile: window.innerWidth >= 1601 });
        this.setState({ mobileHor: window.innerWidth >= window.innerHeight });
    }
    jQueryCode = () => {
        const currentQuestion = this.props.currentQuestion;
        // alert(this.isOn);
        var anchors = document.getElementsByTagName('*');
        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            anchor.onclick = function () {
                let code = this.getAttribute('whenClicked');
                eval(code);
            }
        }
        //        For a simple timer or clock, keep track of the time difference explicitly:

        if (currentQuestion === 6) { 

            alert(currentQuestion);
        }
        var start = Date.now();
        setInterval(function () {
            var delta = Date.now() - start; // milliseconds elapsed since start
            overworldPortrait = localStorage.getItem('quest-portrait');
            $('#hero').attr('src', setPlayerIcon());
        }, 1000); // update about every second
        let overworldPlayerRow = 3; let overworldPlayerColumn = 4;

        $("#btn-b").click(function () {
            enterLocation()
        });
        let playerOverLocation = false;
        localStorage.setItem('whereAmI', 'geaga');

        $.getJSON('mapData.json', function (county) {

            $.each(county, function (key, val) {

                if (val.co === imreoir.whereAmI) {
                    $('#output').html(val.county)
                    whereAmI = val.whereAmI
                    localStorage.setItem('whereAmI', whereAmI);
                    map = JSON.parse(val.mapData);
                    // $('.countyMap').animate({ 'left': val.left })
                    // $('.countyMap').css({ 'top': val.top })
                    $('.countyMap').css('background-image', val.countyBG)
                    $('.countyMap').fadeIn();
                    $('.countyMap').css('background-image', town0)


                    newLocations = val.locations;
                    newLocationsEng = val.locationsEng;

                    setTimeout(function () {

                        $('.countyMap').fadeIn();
                        let whichSea = Math.floor(Math.random() * 3)

                        if (localStorage.whereAmI === 'antrim' || localStorage.whereAmI === 'down' || localStorage.whereAmI === 'louth' || localStorage.whereAmI === 'dublin' || localStorage.whereAmI === 'wicklow' || localStorage.whereAmI === 'wexford') {
                            $('.sea').css('background-image', sea0)
                        } else {
                            if (whichSea === 2) { $('.sea').css('background-image', sea0) }
                            if (whichSea === 1) { $('.sea').css('background-image', sea0) }
                            if (whichSea === 3) { $('.sea').css('background-image', sea0) }
                        }


                        refresh()

                    }, 300)
                }
                else {
                }


            });


        })
        let newLocations;
        let newLocationsEng;
        let allCounties;
        $.getJSON('/whichCounty', function (data) {
            allCounties = data.naContae;
            localStorage.setItem("whereAmI", "wicklow");
            imreoir.whereAmI = localStorage.getItem("whereAmI");

        })

        let imreoir = {
            ainm: "Uallach", craobh: "", from: "Ċill Ċainniġ", slí: "Draoi", avatar: setPlayerIcon(), whereAmI: 'donegal'
        }
        imreoir.whereAmI = 'wicklow';

        /*big function to handle which map to go to*/

        /*big function to handle where to position player after map change*/
        // let imreoirJSON = JSON.stringify(imreoir);

        //mapChanges is a little hack to make the daffodills disappear when player leaves location geaga:
        function setMap() {

            $(".tullynally-ring").fadeOut()

            $("#tully-challenge-bg").fadeOut()
            // $("#tullynally-lens").fadeOut()

            $("#loc").html("")
            locationGraphic = place0;
            $("#locEng").html("")
            $("#locEng").fadeOut()
            $('#btn-b').fadeOut();
            mapChanges++;

            if (mapChanges === 1) {
                $('eng-question-text').html('Select a lieutenant, ')
            }
            if (mapChanges > 1) {
                $('.daff-container').fadeOut();
                //  $('.question-text').fadeOut();
                $('.eng-question-text').css('display', 'none');
                $('.eng-question-text-holder').css('color', 'orange');

            }
            $('.sea').css('display', 'none')

            $('.location-title-card-text-container').fadeIn(1);

            $('.emblem-container').fadeIn(1);

            // $('.countyMap').css('animation', 'zoom-to-' + imreoir.whereAmI + ' 1s forwards ease-in');

            $('.countyMap').css('background-image', "url('../../images/counties/" + imreoir.whereAmI + ".png")
            setTimeout(function () {
                $('#stage').fadeOut()
                $('.location-title-card-text-container').fadeIn();

                $('.emblem-container').fadeIn();

                // $('.countyMap').css('left', imreoir.whereAmI.left)
                // $('.countyMap').css('top', imreoir.whereAmI.top)

                // $('.emblem-img').css("opacity",0)
                $('#stage').fadeIn()
                $('.sea').fadeIn();



                $('.location-title-card-text-container').fadeOut(3000, 'linear');
                $('.emblem-container').fadeOut(2000, 'linear');
                $('#hints-geaga').fadeOut();
                if (showHint3 === true) {
                    setTimeout(function () {

                        $('.touch-hint-3-container').css('display', 'flex')
                        $('.touch-hint-3-container').fadeIn()

                    }, 2700)
                    setTimeout(function () {
                        $('.touch-hint-3-container').fadeOut()

                    }, 5000)
                }





            }, 1000)

        }

        //Load grids of connecting counties: 
        function loadMap(direction) {

            //hiding unsightly flicker when emblems are updated. they fade in again after the giant directional switch statement:
            $('.emblem-img').css('display', 'none')
            $('#output').css('display', 'none')
            $('.question-text').fadeOut()
            switch (imreoir.whereAmI) {

                case 'geaga':


                    if (direction === N) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");
                        // narrativeCode++;
                        alert(localStorage.getItem("whereAmI"))
                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 8;
                        playerColumn = 5;
                      
                        refresh();
                        setTimeout(setMap(), 1000)


                    }

                    break;


                default: break;
            
            }
            $.getJSON('mapData.json', function (county) {

                $.each(county, function (key, val) {

                    if (val.co === imreoir.whereAmI) {
                        $('#output').html(val.county)
                        $('.emblem').attr("src", "../../img/counties/icons/" + val.emblem + ".png")
                        setTimeout(function () {
                            $('.emblem-img').attr("src", "./emblems/" + val.emblem + ".png")

                            $('.emblem-img').fadeIn()
                            $('#output').fadeIn()
                        }, 200)



                        map = JSON.parse(val.mapData);
                        $('.countyMap').css('background-image', val.countyBG)


                        newLocations = val.locations;
                        newLocationsEng = val.locationsEng
                        switch (val.co) {
                            case "antrim": narrativeCode = 1; break;
                            case "armagh": narrativeCode = 2; break;
                            case "carlow": narrativeCode = 3; break;
                            case "cavan": narrativeCode = 4; break;
                            case "clare": narrativeCode = 5; break;
                            case "cork": narrativeCode = 6; break;
                            case "derry": narrativeCode = 7; break;
                            case "donegal": narrativeCode = 8; break;
                            case "down": narrativeCode = 9; break;
                            case "dublin": narrativeCode = 10; break;
                            case "fermanagh": narrativeCode = 11; break;
                            case "galway": narrativeCode = 12; break;
                            case "kerry": narrativeCode = 13; break;
                            case "kildare": narrativeCode = 14; break;
                            case "lilkenny": narrativeCode = 15; break;
                            case "laois": narrativeCode = 16; break;
                            case "leitrim": narrativeCode = 17; break;
                            case "limerick": narrativeCode = 18; break;
                            case "longford": narrativeCode = 19; break;
                            case "louth": narrativeCode = 20; break;
                            case "mayo": narrativeCode = 21; break;
                            case "meath": narrativeCode = 22; break;
                            case "monaghan": narrativeCode = 23; break;
                            case "offaly": narrativeCode = 24; break;
                            case "roscommon": narrativeCode = 25; break;
                            case "sligo": narrativeCode = 26; break;
                            case "tipperary": narrativeCode = 27; break;
                            case "tyrone": narrativeCode = 28; break;
                            case "waterford": narrativeCode = 29; break;
                            case "westmeath":
                                //when to show hint3 - first time entering wmeath?
                                showHint3 = true;
                                $('#north').removeClass('circle')

                                $('.eng-question-text').html('');
                                $('.eng-question-text').css('border', '6px solid green');
                                narrativeCode = 30; break;
                            case "wexford": narrativeCode = 31; break;
                            case "wicklow": narrativeCode = 32; break;
                            default: break
                        }

                    }
                    else {
                    }


                });


            })

        }
        let playerDetails = {};


        $.getJSON('mapData.json', function (county) {

            $.each(county, function (key, val) {
                if (val.co === imreoir.whereAmI) {
                    map = JSON.parse(val.mapData);
                    $('.countyMap').css('background-image', val.countyBG)



                }
                else {
                }


            });


        })

        imreoir.whereAmI = localStorage.getItem("whereAmI")

        imreoir.avatar = setPlayerIcon();
        imreoir.slí = localStorage.getItem("slí")
        imreoir.from = localStorage.getItem("from")


        function travel(direction) {
            imreoir.whereAmI = localStorage.getItem("whereAmI");

            switch (direction) {
                case 2:
                    break;
                case 9: playerDetails.whereAmI = 'derry';

                    break;
                case 8: playerDetails.whereAmI = 'tyrone';
                    break;
                case 7: playerDetails.whereAmI = 'fermanagh';
                    break;
                case 6: playerDetails.whereAmI = 'leitrim'
                    break;
                case 5:
                    break;
                case 4:
                    break;
                case 3:
                    break;
                case N:
                    alert(playerDetails.whereAmI)

                    break;
                case NE:
                    alert(playerDetails.whereAmI)

                    break;
                default:
                    break;
            }

            // alert('now ajax put...')
            $.ajax('/updatePlayer', {
                type: 'POST',
                data: playerDetails,
                success: function (res) {
                    imreoir = JSON.stringify(res);
                    window.location.replace('http://167.172.184.73:3000/' + localStorage.get('whereAmI'));
                }
            })
        }

        var map =
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];

        //The game objects map
        var gameObjects =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, "G", 0, 0, 0, 0],
                [0, 0, 0, 0, 0, "C", 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, "P", 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

        var playerRow;
        var playerColumn;

        //Get a reference to the stage and output
        var stage = document.querySelector("#stage");
        var output = document.querySelector("#output");
        function readyLocationEng(locEng) {
            $("#locEng").fadeOut()

            $('#locEng').html(newLocationsEng[locEng])
            $("#locEng").fadeIn()


        }
        function readyLocation(loc) {
            localStorage.setItem('encounterID', 0);
            if (imreoir.whereAmI !== "geaga") {

                $('#btn-b').css('display', 'block');
                $('#btn-b').fadeIn();
            }

            $('#loc').html(newLocations[loc])
            switch (newLocations[loc]) {
                

                default: break;

            }
            $('.big-btn-img').fadeIn();
            playerOverLocation = true;
        }

        function clearLocation() {
            $('#loc').html("")
            $('#locEng').html("")
            locationGraphic = place0;
            $("#locEng").fadeOut()

            $('#walkies-overlay').fadeIn();

            $('.big-btn-img').fadeOut();
            playerOverLocation = false;

        }
        //values for returing to county map after exploring map location

        //Add a keyboard listener
        window.addEventListener("keydown", keydownHandler, false);
        let mapMenuIsVisible = false;
        let keyboardActive = true;
        //The game map
        var lastPressed = '0'; //what was the last key pressed?

        // leave player facing the last touched direction:

        //   var playerFacing='../img/characters/feitheamh1.gif'

        //Map code
        var ring = "f"
        var EXIT = "*";
        var EMPTY = 0;
        var BLOCKED = 1;
        var N = 2;
        var NE = 9;
        var E = 8;
        var SE = 7;
        var S = 6;
        var SW = 5;
        var W = 4;
        var NW = 3;
        var PLAYER = "P";
        var trap = "x"
        var GEAGA = "G";
        var CONTACT = "C"; //a
        var AGNES = "N";
        var HINT0 = 99;
        var location0 = 30;
        var location1 = 31;
        var location2 = 32;
        var location3 = 33;
        var location4 = 34;
        var location5 = 35;
        //The size of each cell
        var SIZE = 10;
        var tullyField0 = "*0";
        var tullyField1 = "*1";
        var tullyField2 = "*2";
        var tullyField3 = "*3";
        var tullyField4 = "*4";
        var tullyField5 = "*5";
        var tullyField6 = "*6";
        var tullyField7 = "*7";

        //The number of rows and columns
        var ROWS = map.length;
        var COLUMNS = map[0].length;

        //Arrow key codes
        var UP = 38;
        var DOWN = 40;
        var RIGHT = 39;
        var LEFT = 37;

        //set start positions
        var geagaRow;
        var geagaColumn;
        var contactColumn;
        var contactRow;
        var ringRow;
        var ringColumn;

        for (var row = 0; row < ROWS; row++) {
            for (var column = 0; column < COLUMNS; column++) {
                if (gameObjects[row][column] === PLAYER) {
                    playerRow = row;
                    playerColumn = column;
                }

                if (gameObjects[row][column] === GEAGA) {

                    geagaRow = row;
                    geagaColumn = column;
                }
                if (gameObjects[row][column] === ring) {
                    ringRow = row;
                    ringColumn = column;
                }

            }
        }


        for (row = 0; row < ROWS; row++) {
            for (column = 0; column < COLUMNS; column++) {
                if (gameObjects[row][column] === PLAYER) {
                    playerRow = row;
                    playerColumn = column;
                }
                if (gameObjects[row][column] === ring) {
                    contactRow = row;
                    contactColumn = column;
                }
                if (gameObjects[row][column] === GEAGA) {
                    geagaRow = row;
                    geagaColumn = column;
                }


            }
        }
        function updateEventReport(report) {
            $('#event-report').html(report)
            $('#event-report').fadeIn()
            setTimeout(function () {
                $('#event-report').fadeOut()

            }, 1500)
        } $('#north').on('touchstart', function () {
            if (this.isOn) { return }

            // playerFacing = imreoir.avatar;
            stillPressedNorth = false;
            updateEventReport('ó thuaidh')
            $('#north').removeClass('circle')

            if (playerRow > 0) {
                lastPressed = 'up';

                gameObjects[playerRow][playerColumn] = 0;

                playerRow--;
                animatePlayer();
                keydownHandler('up');

            }

            setInterval(function () {

                if (stillPressedNorth) {
                    if (keyboardActive) {
                        if (playerRow < ROWS - 1) {

                            setTimeout(function () {
                                lastPressed = 'up';
                                gameObjects[playerRow][playerColumn] = 0;
                                playerRow--;
                                animatePlayer();
                                keydownHandler('up');


                            }, 5)
                        }
                    }
                }
            }, 50);
        });
        $('#south').on('touchend', function () {
            stillPressedSouth = false
        })

        $('#west').on('touchend', function () {
            stillPressedWest = false
        })

        $('#north').on('touchend', function () {
            stillPressedNorth = false
        })

        $('#east').on('touchend', function () {
            stillPressedEast = false
        })


        $('#south').on('touchstart', function () {
            stillPressedSouth = false

            if (keyboardActive) {
                if (playerRow < ROWS - 1) {

                    lastPressed = 'down';
                    gameObjects[playerRow][playerColumn] = ROWS - 0;
                    playerRow++;
                    animatePlayer();
                    keydownHandler('down');

                }
            }
            setInterval(function () {

                if (stillPressedSouth) {
                    if (keyboardActive) {
                        if (playerRow < ROWS - 1) {

                            setTimeout(function () {
                                lastPressed = 'down';
                                gameObjects[playerRow][playerColumn] = ROWS - 0;
                                playerRow++;
                                animatePlayer();
                                keydownHandler('down');


                            }, 5)
                        }
                    }
                }
            }, 50);
            // !keyboardActive;
            updateEventReport('ó dheas')

            function handleFirstDown() {
                // keyboardActive;
                $('#océ').css('visibility', 'visible');
            }


            function handleSwords() {
                alert("Chun troid!")
                $('#océ').css('visibility', 'visible');
            }
            setTimeout(handleFirstDown, 100);
            //override bug where player moves south then turns to face south with this jq :
            $('#hero').attr('src', setPlayerIcon());

            // playerFacing = imreoir.avatar;

        });










        $('#east').on('touchstart', function () {
            stillPressedEast = false;
            // playerFacing = imreoir.avatar;
            updateEventReport('soir')

            if (playerColumn < COLUMNS - 1) {
                gameObjects[playerRow][playerColumn] = 0;
                playerColumn++;

                lastPressed = 'right';
                animatePlayer();
            }

            keydownHandler('right');
            setInterval(function () {

                if (stillPressedEast) {
                    if (keyboardActive) {
                        if (playerRow < COLUMNS - 1) {

                            setTimeout(function () {
                                lastPressed = 'right';
                                gameObjects[playerRow][playerColumn] = 0;
                                playerColumn++;
                                keydownHandler('right');
                                animatePlayer();


                            }, 5)
                        }
                    }
                }
            }, 50);

        });
        $('#west').on('touchstart', function () {
            stillPressedWest = false;
            updateEventReport('siar')



            // playerFacing = imreoir.avatar;

            if (playerColumn > 0) {
                gameObjects[playerRow][playerColumn] = 0;
                playerColumn--;
                lastPressed = 'left';
                animatePlayer();
            }
            keydownHandler('left');

            setInterval(function () {

                if (stillPressedWest) {
                    if (keyboardActive) {
                        if (playerRow < ROWS - 1) {

                            setTimeout(function () {
                                lastPressed = 'left';
                                gameObjects[playerRow][playerColumn] = 0;
                                playerColumn--;
                                animatePlayer();
                                keydownHandler('left');


                            }, 5)
                        }
                    }
                }
            }, 50);
        });


        refresh();
        // jQuery.fx.off = false;

        //   refresh();
        // jQuery.fx.off = false;
        function animatePlayer() {

            let cellWidth = Math.floor(document.getElementById("stage").clientWidth / 10);
            let cellHeight = Math.floor(document.getElementById("stage").clientHeight / 10);
            setTimeout(function () {
                // alert('waiting...')
                refresh();
            }, 210);
            if (lastPressed === 'left') {

                $('#hero').attr('src', setPlayerIcon())
                // $('#hero').animate({ left: playerColumn * cellWidth }, 200, 'linear');

            } else if (lastPressed === 'right') {
                $('#hero').attr('src', setPlayerIcon())

                // $('#hero').animate({ left: playerColumn * cellWidth }, 200, 'linear)');
            } else if (lastPressed === 'up') {
                $('#hero').attr('src', setPlayerIcon())

                // $('#hero').animate({ top: playerRow * cellHeight }, 200, 'linear');
            } else if (lastPressed === 'down') {
                // $('#hero').animate({ top: playerRow * cellHeight }, 200, 'linear');
            }

            gameObjects[playerRow][playerColumn] = ring;
            gameObjects[playerRow][playerColumn] = PLAYER;
            gameObjects[geagaRow][geagaColumn] = GEAGA;
            /*Player makes contact with an npc - one of geaga's costumes, perhaps.*/

            // gameObjects[contactRow][contactColumn] = CONTACT
            // if (gameObjects[contactRow][contactColumn] === gameObjects[playerRow][playerColumn]) {




        };

        function keydownHandler(direction) {
            if (keyboardActive) {
                // eslint-disable-next-line no-restricted-globals
                switch (addEventListener.keyCode) {
                    
                     default: break;
                }

                //find out what kind of cell the player is on
                switch (map[playerRow][playerColumn]) {
                    default: break;
                }

                //Find out if the player is standing on the same square as another object

            }
            if (!mapMenuIsVisible) {
                switch (map[playerRow][playerColumn]) {
                    default: break;


                }
            }


        }

        helloGeaga();

        let elementClass;
        // Target all clicks on any element
        document.addEventListener('click', (e) => {
            // Get element class(es)
            elementClass = e.target.className;

            // If element has class(es)
            if (elementClass !== '') {
            }
            if (elementClass === '') {
            }

            //making each square of a 10x10 grid of squares a button that moves the player there, on touch.

          
if (typeof elementClass === 'string' && elementClass.includes('cell')) {
                // rest of your code
            

                for (let i = 0; i < 10; i++) {

                    for (let j = 0; j < 10; j++) {
                        if (elementClass.includes('Row' + i) && elementClass.includes('Col' + j)) {
                            lastPressed = 'down';
                            gameObjects[playerRow][playerColumn] = 0;
                            playerRow = i;
                            playerColumn = j
                            refresh();
                            animatePlayer();
                            keydownHandler()
                        }


                    }


                }

            }

            // If element has no classes
            else {
            }
        }
        );
        function touchMap() {
            //  alert()
        }

        function blockPath() {
            switch (lastPressed) {
                default: break;
            }
            refresh()


        }
        function refresh() {
            //Clear the stage of img cells
            //from the previous turn
            //  whereAmI = localStorage.getItem('whereAmI')

            if (stage.hasChildNodes()) {
                for (var i = 0; i < ROWS * COLUMNS; i++) {
                    stage.removeChild(stage.firstChild);
                }
            }

            //refresh the game by looping through the map arrays
            for (var row = 0; row < ROWS; row++) {
                for (var column = 0; column < COLUMNS; column++) {
                    //Create a img tag called cell
                    var cell = document.createElement("img");

                    //Set it's CSS class to "cell"
                    cell.setAttribute("class", "cell");
                    cell.classList.add("class", "cellCol" + column);
                    cell.classList.add("class", "cellRow" + row);
                    cell.setAttribute("id", "cell");

                    // set it's touch hanlder
                    cell.setAttribute("onTouchStart", 'touchMap();')
                    cell.onclick = function () { touchMap(); };
                    //Add the img tag to the <div id="stage"> tag
                    stage.appendChild(cell);

                    //Find the correct image for this map cell
                    switch (map[row][column]) {


                        case EMPTY:
                            cell.src = empty;
                            break;

                        case BLOCKED:
                            cell.src = blocked;
                            break;
                        case NE:
                            cell.src = empty;
                            break; case E:
                            cell.src = empty;
                            break; case SE:
                            cell.src = empty;
                            break; case S:
                            cell.src = empty;
                            break; case SW:
                            cell.src = empty;
                            break; case W:
                            cell.src = empty;
                            break; case NW:
                            cell.src = empty;
                            ;
                            break;
                        case N:
                            cell.src = empty;
                            break;
                        case ring: cell.src = ringIcon; break;
                        case og: cell.src = og; break;
                            // case tullyField5: alert('tá an ceart agat!');
                            break;
                        case tullyField0: cell.src = empty; break;
                        case tullyField1: cell.src = empty; break;
                        case tullyField2: cell.src = empty; break;
                        case tullyField3: cell.src = empty; break;
                        case tullyField4: cell.src = empty; break;
                        case tullyField5: cell.src = empty; break;
                        case tullyField6: cell.src = empty; break;
                        case tullyField7: cell.src = empty; break;
                        case trap: cell.src = agnes2; break;
                        case AGNES: cell.src = agnes2; break;
                        case HINT0: cell.src = hint3; break;
                        case GEAGA:
                            cell.src = ""; break;


                        case CONTACT:
                            cell.src = empty;
                            break;
                        case location0:
                            cell.src = town0
                            break;
                        case location1:
                            cell.src = town0
                            break;
                        case location2:
                            cell.src = town0
                            break;
                        case location3:
                            cell.src = town0
                            break;
                        case location4:
                            cell.src = town0
                            break;
                        case location5:
                            cell.src = town0
                            break;
                        case EXIT:
                            cell.src = empty;

                            break;


                        default: break;
                    }

                    //Add the player from the gameObjects array
                    switch (gameObjects[row][column]) {
                        case PLAYER:
                            cell.src = setPlayerIcon();
                            cell.id = 'hero';

                            break;
                        case og: cell.src = og;
                            cell.id = 'og'; break;
                        case AGNES:
                            cell.id = 'agnes'
                            cell.src = agnes2;
                            break;
                        case GEAGA:
                            if (imreoir.whereAmI === "geaga") cell.src = setGeagaIcon(empty);

                            cell.id = 'geaga'
                            break;
                        case CONTACT:
                            cell.src = setIcon(empty); break;
                        case ring:
                            cell.src = ringIcon;
                            // alert('eh what')
                            break;
                        default: break;
                    }

                    //Position the cell 
                    cell.style.top = row * SIZE + "%";
                    cell.style.left = column * SIZE + "%";


                }

            }


            setTimeout(function () {
                // $('#stage').css('opacity', '0.6');
                setPlayerIcon();
                $('#stage').fadeIn();
                $('.toolbar').fadeIn();

            }, 130)
        }


        $('.item5').on('touchend', function () {
            if (playerOverLocation) {
                // enterLocation(loc)
                alert('it5')
            }
            else {
                // toggleOverWorldMode()
            }
        })

        /*a trap flings our hero into the river. 
        button masher puzzle save vs game-over(score).
    win === ar ais go contae, xp + 100 .
    */

        function helloDunashee() {
            /*we want to alert player that they have completed a quest, collected a ring. Also, inform them that they can rotate phone for new ui elements: Rings can be spent like in a pachinko- among the faries of dunnyshee: the prize being the return to Ireland of the avatar initially selected; As a reward, the player would be granted login password and credentials to be the author of their own ring/fort location. api includes input fields for ringfort name in english and Irish, 8 text strings and spaces for translation, and slots for 8 images; and a quiz questions + answers api for winning the ring of + location name.*/
            narrativeCode = 34
            setTimeout(function () {
                $('.rotate-phone-container').css('display', 'flex')
                $('.rotate-phone-container').fadeIn()

            }, 300)
        }
        function helloTullyField5() {
            // alert('✓')



            // returnToCounty();
            $('.score-container').fadeIn()
            $('.score-container').css('display', 'flex')
        }


        function helloTrap() {
            alert('trap!')
            $('.river-container').css('transform', 'rotate(0deg)');
            $(".battle0").fadeIn();
            $('.cell').fadeOut()
            $(".directional-pad").fadeOut();
            $(".question-text").html('Comhairc Aonar!')
            $("#locEng").html('Single Combat!')
            $('#hero').fadeOut();
            setTimeout(function () {
                $("#walkies").fadeOut();
            }, 300)
            //    refresh();
        }
        function helloFerna() {
            // secondLocation = eascaLocations[secondLocationId]
            // alert('anocht!')

            $(".question-text").html('Ar aire!')
            $("#locEng").html('en garde!')
            $("#locEng").fadeIn();

            // $('#puck').fadeIn();
            // setTimeout(function () { 
            //     $('#puck').animate({ "top": "-10px;" });


            // },250)
            $('#walkies-overlay').fadeOut();
            map =
                [
                    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
                    ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                    ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                    ["*", 1, 1, 1, 0, "x", 1, 1, 1, "*"],
                    ["*", 1, 1, 1, 1, "C", 1, 1, 1, "*"],
                    ["*", 0, 0, 0, 0, "C", 0, 0, 0, "*"],
                    ["*", 0, 0, 0, 0, "C", 0, 0, 0, "*"],
                    ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                    ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
                ];

            refresh();


            $(".question-text").fadeIn()
            setTimeout(function () {
                localStorage.setItem('visitedFerna', 'true')

            }, 3000)

        }
        function helloGeaga() {
            // whereAmI = whereAmIHolder;
            imreoir.whereAmI = whereAmI;
            // $('#register').removeClass('hidden')



            localStorage.setItem('whereAmI', whereAmI);
            // secondLocation = eascaLocations[secondLocationId]
            // alert('Beidh muid ag siúl leat i '+  secondLocation +' anocht!')
            returnToCounty();
            refresh();
            $('.countyMap').fadeIn();
        }
        function returnToCounty() {
            $('#tully-challenge-bg').fadeOut();
            $('#bg-container-rings-5').fadeOut();
            $('.score-container').fadeOut();
            $('.numbers-e').html('')
            $('.numbers-i').html('')
            $('#btn-b').fadeIn();
            $('.challenge-container').fadeOut();

            $('#loc').fadeIn()
            gameObjects[playerRow][playerColumn] = 0;

            $('#walkies').fadeOut();
            $.getJSON('mapData.json', function (county) {
                $.each(county, function (key, val) {
                    if (val.co === imreoir.whereAmI) {
                        $('#output').html(val.county)
                        // $('.emblem').attr('src', '../../img/counties/icons/' + localStorage.getItem('whereAmI')+'.png')
                        map = JSON.parse(val.mapData);

                        // $('.countyMap').css('left', val.left)
                        // $('.countyMap').css('top', val.top)
                        $('.countyMap').css('background-image', val.countyBG)



                        newLocations = val.locations;
                        newLocationsEng = val.locationsEng;
                    }
                    else {


                    }


                });


            })
            // localStorage.setItem("whereAmI","Dublin")
            imreoir.whereAmI = localStorage.getItem("whereAmI");

            gameObjects[playerRow][playerColumn] = 0;
            playerRow = overworldPlayerRow;
            playerColumn = overworldPlayerColumn;
            animatePlayer();
            refresh();
            setMap();

        }

        $('.round-btn').on("click", function () {
            // alert( "Handler for `click` called." );
            returnToCounty()
        });
        let placeNamesGaeilge =
            [
                "Cluain Ṁic Nóis",
                "An Ċorr Ċríochach"

            ]

        function enterLocation(location) {
            //refresh spiel mit neues Bilder und Text.
            //engNotes "from 0 to 1". 33=""
            narrativeCode = 33;

            whereAbouts = $('#loc').html()
            overworldPlayerRow = playerRow;
            overworldPlayerColumn = playerColumn;

            if (whereAbouts === "Baile na gCailleach") {
                $("#walkies").attr("src", collinstown)
                gameObjects[playerRow][playerColumn] = 0;

                playerRow = 8;
                playerColumn = 5;

                setTimeout(function () {
                    // return <Redirect to="/login" />
                }, 500)
            }


            if (whereAbouts === "") {


                map =
                    [
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, "f", 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
                    ];




                // $("#walkies").attr("src",ferna)
                // $("#walkies-overlay").attr("src",fernaRiver)
                gameObjects[playerRow][playerColumn] = 0;

                playerRow = 6;
                playerColumn = 4;
            }
            // else $("#walkies").attr("src",defaultField)
            // $('#walkies').fadeIn();
            // $('#stage').fadeIn()

            if (whereAbouts === secondLocation) {


                alert("Anseo")

            }




            //setting specific walkabe area for locations with rivers walls etc. there's going to be at least 192 of these, not including dungeons castle interiors. Doing a few here to get started and then ship them out to a JSON like county maps.

            if (whereAbouts === "Ráth Ḟearna") {
                setTimeout(function () {
                    $('#loc').fadeOut();

                    $('.ringOfFerna').css('display', 'grid');
                    $('.ringOfFerna').fadeIn();
                }, 2000)
                map =
                    [


                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, "x", 0, 0, 0, "*"],
                        ["*", 1, 1, 1, 0, "C", 1, 1, 1, "*"],
                        ["*", 1, 1, 1, 1, "C", 1, 1, 1, "*"],
                        ["*", 0, 0, 0, 0, "C", 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", 0, 0, 0, 0, 0, 0, 0, 0, "*"],
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
                    ];

                $("#walkies").attr("src", ferna)
                $("#walkies").fadeIn();
                // $("#walkies-overlay").attr("src", fernaRiver)
                gameObjects[playerRow][playerColumn] = 0;

                playerRow = 6;
                playerColumn = 5;
                narrativeCode = 34;

            }

            if (whereAbouts === "Dún Sí") {


                // alert('dún sí!')
                map =
                    [
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
                        ["*", "*3", "*3", "*7", "*7", "*7", "*6", "*6", "*6", "*"],
                        ["*", "*3", 0, 0, 0, 0, 0, 0, "*6", "*"],
                        ["*", "*5", 0, 0, 0, 0, 0, 0, "*6", "*"],
                        ["*", "*5", 0, 0, 0, 0, 0, 0, "*2", "*"],
                        ["*", "*5", 0, 0, 0, 0, 0, 0, "*2", "*"],
                        ["*", "*1", 0, 0, 0, 0, 0, 0, "*2", "*"],
                        ["*", "*1", 0, 0, 0, 0, 0, 0, "*4", "*"],
                        ["*", "*1", "*1", "*0", "*0", "*0", "*4", "*4", "*4", "*"],
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
                    ];
                refresh();

                $("#walkies").attr("src", ferna)
                $("#walkies").fadeIn();
                gameObjects[playerRow][playerColumn] = 0;
                playerRow = 3;
                playerColumn = 4;
                $('#loc').fadeOut();

                $('#locEng').fadeOut();
                // document.getElementById('dir-pad').style.opacity='0'
                $('#btn-b').fadeOut();
            }
            if (whereAbouts === "Tulaigh an Eallaigh") {

                // alert('Tully!')
                map =
                    [
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
                        ["*", "*3", "*3", "*7", "*7", "*7", "*6", "*6", "*6", "*"],
                        ["*", "*3", 0, 0, 0, 0, 0, 0, "*6", "*"],
                        ["*", "*5", 0, 0, 0, 0, 0, 0, "*6", "*"],
                        ["*", "*5", 0, 0, 0, 0, 0, 0, "*2", "*"],
                        ["*", "*5", 0, 0, 0, 0, 0, 0, "*2", "*"],
                        ["*", "*1", 0, 0, 0, 0, 0, 0, "*2", "*"],
                        ["*", "*1", 0, 0, 0, 0, 0, 0, "*4", "*"],
                        ["*", "*1", "*1", "*0", "*0", "*0", "*4", "*4", "*4", "*"],
                        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
                    ];
                refresh();

                //rings in Tulaigh an eallaigh : counting in binary from 0 to 63.
                //player has completed ring? player has tullyRing1; update quiz questions with tullyRing1 quiz content.
                $("#walkies").attr("src", ferna)
                // $("#walkies-overlay").attr("src", fernaRiver)
                gameObjects[playerRow][playerColumn] = 0;
                playerRow = 3;
                playerColumn = 4;
                // $('#hero').fadeOut();
                $('.champion-portrait').fadeIn();
                $('.ringOfTullyNally').css('display', 'grid');
                $('.ringOfTullyNally').fadeIn();
                $('#loc').fadeOut();
                $('#bg-container-rings-5').fadeIn();

                $('#locEng').fadeOut();
                $('.tullynally-ring').fadeIn();
                document.getElementById('dir-pad').style.opacity = '0'
                $('.challenge-container').fadeIn();

                $('#btn-b').fadeOut();
            }
            refresh();



            animatePlayer();
        }

    }
    toggleStartOptions() {
        $('.start-options').css('display', 'grid');
        setTimeout(function () {
            $('.start-options').css('display', 'none');

        }, 2500)
    }

    toggleSelectOptions() {
        $('.select-options').css('display', 'grid');
        setTimeout(function () {
            $('.select-options').css('display', 'none');

        }, 3500)
    }

    componentDidMount() {
        const { isOn } = this.state;
        this.jQueryCode();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));

    }

    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };



    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }
    conceptHandler() {
        window.location.replace('http://167.172.184.73:3000/history')
    }
    helloHint0() {
        // alert()        
        $('.touch-hint-3-container').css('display', 'none')
        showHint3 = false;
    }
    render() {
        const { isVisible } = this.state;
        //just in case the player hasn't already dismissed the flashing purple light on btn #north.
        $('#north').removeClass('prompt-north')

        //react functions here
        let proceedThroughQuiz = this.props.proceedThroughQuiz
        let storyTimer = this.props.storyTimer
        let incrementScore = this.props.incrementScore
        let readme = `
      
      	 
         `;



        function restartApp() {
            window.location.reload(false)
        }
        let heroNameEng = this.props.heroNameEng;
        let heroName = this.props.heroName
        avatar = this.props.avatar;
        let handleAnswerButtonClick = this.props.handleAnswerButtonClick
        whereAmIHolder = this.props.whereAmI;

        storyTimer()
        // whereAmI = localStorage.getItem('whereAmI');

        let runInventory = function () {
            alert('inv')
        }
        let runStats = function () {
            alert('stats')
        }
        let runDisk = function () {
            this.setState({ diskVisible: true })
        }

        let isOn = this.props.isOn;
        let runEvent = function () {
            // this.setState({ isOn: false })
            $('.encounter').fadeIn();
            // alert('run event');
        }
        let revealStyle = {
            animation: 'fade-in 4s forwards',
        }
        let crossSwords = function () {

            // alert("Chun troid!" )
            $('#océ').css('visibility', 'visible');

            // setTimeout(handleFirstDown, 1000);
            //override bug where player moves south then turns to face south with this jq :
            $('#hero').attr('src', setPlayerIcon());

            // playerFacing = imreoir.avatar;


        }
        function hideEncounterComponent() {
            this.setState({ isEncounterComponentVisible: false });
            alert(this.state.isEncounterComponentVisible)
        }
        let heroName1 = localStorage.getItem('heroNameEng');

        return (

            <div>
                <div className="bg"></div>
                <div id="toolbar"></div>
                <div className="ui"></div>
                <div id="screen-blocker">
                    <div className="container screen-blocker">
                        <div className="col-xs-4 gaeilge screen-blocker"></div>
                    </div>
                </div>
                <div className="start-options">
                    <button className="start-options-button" onTouchStart={this.conceptHandler}>concept</button>
                    <button className="start-options-button" onTouchStart={() => { this.setState({ registerMenu: true }) }}>{this.props.engMode === true ? "register" : "cláraigh"}</button>
                </div>

                {this.state.mobile ? <div id='prompt-hor'>  <>


                    <video autoPlay muted loop id="prompt-vid"><source src={promptVid} type="video/mp4" alt=" remember the dream speed of falling and fly along the memory of wind" /></video>
                    <h2 className="mobile-mode">I gcomhair cuirteoirí ar ríomhaire baile, brú <span id="f12">f12</span> nó clé-clic agus roghnaigh <span id="inspect">inspect</span>, le do thoil. Ansin roghnaigh </h2><img alt="toggle mobile icon" src={mobile}></img> <p>chun aithris a dhéanamh ar gléas soghluaiste   |   to simulate mobile device</p></><br />
                    <img id="ciaroga" src={ciaroga} />
                </div> : null
                }



                {/* registration resources */}

                {/* {this.state.registerMenu ? <Register /> : null} */}


                <img id="mob-effect" className="phonebg2" src={phone1} alt="" />

                <div className="countyMap-container">
                    <div className="sea"></div>
                    <div className="countyMap"></div>
                </div>


                <div className="emblem-container">

                    {<img src={geaga} rel="preload" alt="county pixelart emblem." className="emblem-img" />}

                </div>
                <div className="location-title-card-text-container">
                    <p id="output"></p>
                </div>


                <div ><img id="portrait" src={portrait}></img>


                </div>
                <div className="map-lens-container">
                    <img src={defaultField} alt="green field" id="walkies" />
                    <img src={empty} alt="green field" id="walkies-overlay" />
                    <div className="stage-container" id="kungfu">
                        <div id="stage"></div>
                    </div>

                    {/* {this.state.showEascaLocation ? <EascaLocation whereAmI= "geaga" />:null} */}

                    <div id="touch-hint-3-container" className="touch-hint-3-container">
                        {/* <div className='touch-hint-3 circle' onTouchEnd={this.helloHint0}></div> */}

                    </div>

                    <div className="map-lens"  alt="" />

                </div>
                {this.state.isOn ? (<div id="glass">

                    < img src={glass} rel="preload" className="question-img" id="glass-img" alt="glass bg for translucent overlay effect." />
                    <div id="event-report"></div>

                    <div >
          
                        <p className="eng-question-text">
                        Choose a champion, {heroName1}
                        </p>
                        {/* <p className="eng-question-text" id="irish-inside" >Roghnaigh fichilín, arsa Mallaidh Dubh.</p> */}
        </div>
                            <div className="location-graphic-container">
                        {/* <div className="ui-container_b-btn">
                    <BtnB  ></BtnB>
 </div> */}
                        <img src={locationGraphic} className="location-graphic" alt="graphic of location" />


                        {locationGraphic !== place0 ? <div id="buttonmash" onClick={(value) => runEvent(locationGraphic)} className="buttonmash-loc-graphic" >

                            <div className="circle"></div>
                        </div> : null}
                    </div>
                </div>) : null}
                <Silken id="silken"></Silken>
                {/* <Rings1/> */}



                <div className="portraitMode">

                    <p id="gae-notes" > {gaeNotes[narrativeCode]}</p>

                    <div id="ui-container">


                        {/* <img src={stats} alt="" className="stats"onClick={() => {
    if (this.state.statsVisible) {
            this.setState({ statsVisible: false })


        }
        else {
            (this.setState({ statsVisible: true }))


        }
    }}  />
     */}


                        <p className="App-intro">{this.state.data}</p>


                        {/* <h1 id="" >⚔</h1> */}
                        <img src={disk} alt="" className="disk" onClick={() => {
                            if (this.state.diskVisible) {
                                this.setState({ diskVisible: false })


                            }
                            else {
                                (this.setState({ diskVisible: true }))


                            }
                        }} />

                    </div>

                    <div className={this.state.diskVisible ? "disk-menu" : "hidden"}>

                        <img rel="preload" src={diskMenu}
                            alt="slow low framerate scrolling white lines on black bg."
                            className="disk-bg" />


                        <div>


                            <p className="readmore" id="schlussel"></p><div className="bit-container">

                                <img className="bit" src={bit} />
                            </div>
                            <p id="readme">

                                {readme}
                                <a>This project is a fork of https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/</a>

                                <button onClick={restartApp}>baile | home</button>
                                Tógadh an app le React.js. Foinsí: http://www.namenerds.com/irish/
                                <a href="https://www.pngwing.com/en/free-png-zampg"> Stone Soup Net Hack graphics </a>
                                <a href="https://manpages.ubuntu.com/manpages/xenial/man1/xscreensaver.1.html">screensaver effects by Jamie Zawinski Paul 'Joey' Clark</a><br />

                                additional graphics from <a href="https://game-icons.net/"> https://game-icons.net/
                                </a>    <br />

                                <a href="https://github.com/macribo2/Quiz-starter">git repo</a>
                                <br />
                                more @ <a href="https://www.reddit.com/r/Banba/">/r/banba</a>
                            </p>

                            <p className='readme'>





                            </p>
                        </div>
                    </div>
                    <img rel="preload" src={this.state.statsVisible ? statsMenu : null} alt="" className="statsMenu" />
                    <img rel="preload" src={this.state.inventoryVisible ? invIcon : null} alt="" className="invIcon" />


                    {/* {this.state.isOn ? (<div id="glass">


                        < img src={glassPortait} rel="preload" className="question-img" id="glass-img" alt="glass bg for translucent overlay effect." />

                        <p id="eng-notes" > {engNotes[narrativeCode]}</p>

                    </div>) : null} */}

                    <div className='ui-container_directional-pad'>
                        <div className="directional-pad dir-pad-portrait-mode" id="dir-pad" onTouchStart={this.props.incrementScore} onTouchEnd={localStorage.setItem('whereAmI', 'westmeath')
                        }>


                            <div className='grid-container'>

                                <div className="grid-item"></div>

                                <div className="grid-item" ></div>

                                <div className="grid-item" id="toggle-glass-btn2"><img src={this.state.isOn ? pearl : emerald} id="glass-btn-img" alt="a crystal or precious stone toggle on off button" onClick={() => {
                                    if (this.state.isOn) {
                                        this.setState({ isOn: false })

                                    }
                                    else {
                                        (this.setState({ isOn: true }))
                                    }
                                    {/* setTimeout(()=> { this.setState({ isOn: false }) }, 3000) */ }



                                }} /></div>

                                <div className="grid-item"></div>

                                <div className="grid-item"></div>

                            </div>



                        </div>
                    </div>

                </div>

                storyTimer={() => storyTimer}
                <p id="loc" alt="holder for location names"></p>
                <p style={revealStyle} id="locEng" className={`fade-in ${isVisible ? 'visible' : 'hidden'}`} alt="holder for location names English">
                </p>
                {this.state.whereAmI === "geaga" ?

                    <div className="daff-container" >
                        {/* <img src={ rocks} className="rocks" alt="circle of rocks" /> */}

                    </div> : null}

                {
                    <>

                    </>}

                <div className="river-container">
                </div>
                <div id="puck"><img src={agnes2} alt="a strange creature" /></div>
                <Battle className="battle0" />


                <NumberOne  proceedThroughQuiz={this.props.proceedThroughQuiz} toggleIsOn={this.props.toggleIsOn} isOn={this.state.isOn} heroNameEng={this.props.heroNameEng} heroName={this.props.heroName} />


{/* 
                <p id="hints-geaga" className={this.state.isOn && this.state.whereAmI === 'geaga' ? "hints" : "hidden"}>{'"What is a knight?", asked ' + this.props.choiceRingEng + '. "A pawn on a horse", said ' + localStorage.getItem('hname') + '.'}</p> */}

                <div className="ringOfFerna">
                    {/* <Rings7/> */}                </div>

                <div className="ringOfTullyNally" >
                    {/* <img src={ daff} className="daffs" alt="small yellow flowers stir in the breeze" /> */}
                    <Rings5 />

                    {/* <Rings5 heroName={this.props.heroName} heroNameEng={ this.props.heroNameEng} toggleIsOn={this.props.toggleIsOn} isOn={this.props.isOn} proceedThroughQuiz={this.props.proceedThroughQuiz } fadeOutNoOne={ this.fadeOutNoOne } /> */}
                </div>



                <div className='ui-container_directional-pad'>
                    <div className="directional-pad glowing-circle" id="dir-pad" onTouchStart={this.props.incrementScore} onTouchEnd={localStorage.setItem('whereAmI', 'westmeath')
                    }>


                        <div className='grid-container'>

                            <div className="grid-item"></div>

                            <div className="grid-item" id="north">
                                {this.state.isOn ? <img src={chat} id="chat" alt="chat button" rel="preload" className="inventory" onClick={() => {

                                    $('#eng-notes').html('');

                                    $('#gae-notes').html('');
                                    $('#easca').fadeIn()
                                    $('.react-simple-keyboard').fadeIn()

                                    if (this.state.diskVisible) {
                                        this.setState({ diskVisible: false })
                                    }
                                }} /> : null}
                            </div>
                            <div className="grid-item" ></div>
                            <div className="grid-item" id="west">
                                {this.state.isOn ? <img src={invMenu} id="inventory" alt="equipment icon" rel="preload" className="inventory" onClick={() => {
                                    alert('test ok')

                                    if (this.state.diskVisible) {
                                        this.setState({ diskVisible: false })
                                    }
                                }} /> : null}

                            </div>







                            <div className="grid-item" id="toggle-glass-btn2"><img src={this.state.isOn ? pearl : emerald} id="glass-btn-img" alt="a crystal or precious stone toggle on off button" onClick={() => {
                                this.setState(prevState => ({
                                    isVisible: !prevState.isVisible
                                }));
                                if (this.state.isOn) {
                                    this.setState({ isOn: false })
                                }
                                else {
                                    (this.setState({ isOn: true }))
                                }
                            

                             


                                
                            }} /></div>
                            <div className="grid-item" id="east">

                                <img id="inventory" rel="preload" src={invMenu}></img>


                            </div>
                            <div className="grid-item"></div>
                            <div className="grid-item" id="south">
                            </div>
                            <div className="grid-item"></div>

                        </div>



                    </div>
                </div>
                <>
                    {this.state.isEncounterComponentVisible && <div className="encounter">

                        <Encounter hideEncounterComponent={this.hideEncounterComponent} encounterID={this.state.encounterID} />

                    </div>}
                </>
                <Score returnToCounty={this.returnToCounty} />
                <div className="rotate-phone-container">
                    <img className="rotate-phone-img" src={rotatePhone} alt="rotate phone icon" />
                </div>

           
            </div>



        )
    }

}