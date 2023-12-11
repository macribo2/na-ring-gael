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
import lens from '../../images/fog5.png';
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
// import bamian from '../../images/ai-art/places/bamian.jpg'
// import benaga from '../../images/ai-art/places/benaga.jpg'
// import dgarbh from '../../images/ai-art/places/dgarbh.jpg'
// import baanpo from '../../images/ai-art/places/baanpo.jpg'
// import slirua from '../../images/ai-art/places/slirua.jpg'
// import casaid from '../../images/ai-art/places/casaid.jpg'
// import andain from '../../images/ai-art/places/andain.jpg'
import glnapu from '../../images/ai-art/places/glnapu.jpg'
// import slimis from '../../images/ai-art/places/slimis.jpg'
// import nacrud from '../../images/ai-art/places/nacrud.jpg'
// import antsna from '../../images/ai-art/places/antsna.jpg'
// import anlibr from '../../images/ai-art/places/anlibr.jpg'
// import mtroim from '../../images/ai-art/places/mtroim.jpg'
// import granar from '../../images/ai-art/places/granar.jpg'
// import cldara from '../../images/ai-art/places/cldara.jpg'
// import maduma from '../../images/ai-art/places/maduma.jpg'
// import ancabu from '../../images/ai-art/places/ancabu.jpg'
// import cillal from '../../images/ai-art/places/cillal.jpg'
// import caanba from '../../images/ai-art/places/caanba.jpg'
// import bauifi from '../../images/ai-art/places/bauifi.jpg'
// import ancaru from '../../images/ai-art/places/ancaru.jpg'
// import liants from '../../images/ai-art/places/liants.jpg'
// import aneill from '../../images/ai-art/places/aneill.jpg'
// import anlorg from '../../images/ai-art/places/anlorg.jpg'
// import linagc from '../../images/ai-art/places/linagc.jpg'
// import ancari from '../../images/ai-art/places/ancari.jpg'
// import anmali from '../../images/ai-art/places/anmali.jpg'
import dunpad from '../../images/ai-art/places/dunpad.jpg'
// import cillca from '../../images/ai-art/places/cillca.jpg'
// import srnaha from '../../images/ai-art/places/srnaha.jpg'
// import craiga from '../../images/ai-art/places/craiga.jpg'
// import poandu from '../../images/ai-art/places/poandu.jpg'
// import bailur from '../../images/ai-art/places/bailur.jpg'
// import bailan from '../../images/ai-art/places/bailan.jpg'
// import liosli from '../../images/ai-art/places/liosli.jpg'
// import cillde from '../../images/ai-art/places/cillde.jpg'
// import bauimu from '../../images/ai-art/places/bauimu.jpg'
// import bahaic from '../../images/ai-art/places/bahaic.jpg'
// import miseal from '../../images/ai-art/places/miseal.jpg'
// import cillda from '../../images/ai-art/places/cillda.jpg'
// import scairb from '../../images/ai-art/places/scairb.jpg'
// import cluain from '../../images/ai-art/places/cluain.jpg'
import mainbu from '../../images/ai-art/places/mainbu.jpg'
// import teaans from '../../images/ai-art/places/teaans.jpg'
// import crirua from '../../images/ai-art/places/crirua.jpg'
// import carmac from '../../images/ai-art/places/carmac.jpg'
import pollph5 from '../../images/ai-art/places/pollph5.jpg'
// import cairbr from '../../images/ai-art/places/cairbr.jpg'
// import nasolla from '../../images/ai-art/places/nasolla.jpg'
// import fiodha from '../../images/ai-art/places/fiodha.jpg'
// import maighn from '../../images/ai-art/places/maighn.jpg'
// import ancurra from '../../images/ai-art/places/ancurra.jpg'
// import leiman from '../../images/ai-art/places/leiman.jpg'
// import ceannb from '../../images/ai-art/places/ceannb.jpg'
import fiochr from '../../images/ai-art/places/fiochr.jpg'
// import antula from '../../images/ai-art/places/antula.jpg'
// import cillro from '../../images/ai-art/places/cillro.jpg'
// import leabas from '../../images/ai-art/places/leabas.jpg'
// import bunrai from '../../images/ai-art/places/bunrai.jpg'
// import caisna from '../../images/ai-art/places/caisna.jpg'
// import bamhgo from '../../images/ai-art/places/bamhgo.jpg'
// import anomai from '../../images/ai-art/places/anomai.jpg'
// import sesiui from '../../images/ai-art/places/sesiui.jpg'
// import ancocr from '../../images/ai-art/places/ancocr.jpg'
import dungea from '../../images/ai-art/places/dungea.jpg'


// import cillca from '../../images/ai-art/places/1.png'
import cuilant from '../../images/ai-art/places/1.png'
import slnamb from '../../images/ai-art/places/1.png'
import faiero from '../../images/ai-art/places/1.png'
import clumea from '../../images/ai-art/places/1.png'
import tignao from '../../images/ai-art/places/1.png'
import tuanir from '../../images/ai-art/places/1.png'
import clufia from '../../images/ai-art/places/1.png'
import cilmio from '../../images/ai-art/places/1.png'
import scramo from '../../images/ai-art/places/1.png'
import amumor from '../../images/ai-art/places/1.png'
import cnmall from '../../images/ai-art/places/1.png'
import cfhear from '../../images/ai-art/places/1.png'
import bfeiri from '../../images/ai-art/places/1.png'
import pollph3 from '../../images/ai-art/places/1.png'
import cuicon from '../../images/ai-art/places/1.png'
import ceannc from '../../images/ai-art/places/1.png'
import pollph4 from '../../images/ai-art/places/1.png'

import derryn from '../../images/ai-art/places/derryn.jpg'
import Encounter from '../encounter/encounter'
import gigakoops from '../../audio/Gigakoops - Level 2 - High Clouds.mp3'
import jam from '../../audio/ultima-tone-long.wav'
import ReactAudioPlayer from 'react-audio-player';
// import county emblems

import Rings1 from '../Rings/Rings1'
import ogHero from '../../images/agnes.png'

// import { Register } from './../register/register'
import $ from 'jquery';
import empty from "../../images/empty.png"
import shamrocks from "../../images/overworld/shamrock.png"
import geaga from "../../images/empty.png"
//empty image for geaga beceause they're just handlers for player triggering geaga event. Geaga image now in geagaSprite
import ringIcon from '../../images/gold.png'
import blocked from '../../images/empty.png'
import sea0 from '../../images/tonnta1.jpg'

import { Col, Row } from 'react-bootstrap'
import town0 from '../../images/shields.png'
import Silken from '../silken/silken'

import avatar1 from '../../images/players/spéirbhean0.gif';
import avatar2 from '../../images/players/douglas.png';
import avatar3 from '../../images/players/fianna0.png';
import avatar4 from '../../images/players/gotach0.png';
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
let secondLocationId = 3//localStorage.getItem('secondLocationId');
let mapChanges = 0;
let overworldPortrait;
let whereAmIHolder = 'null';
let avatar = "";
let showHint3 = false;
let locationGraphic = place0;


let secondLocation = "Dún Laoghaire";
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
    constructor() {
        super();
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
            encounterID: 0
        }

    }


    //     this.setState({ mobile: window.innerWidth >= 760 });
    //     this.setState({ mobileHor: window.innerWidth >= window.innerHeight });
    // }
    resize() {
        this.setState({ mobile: window.innerWidth >= 1601 });
        this.setState({ mobileHor: window.innerWidth >= window.innerHeight });
    }
    jQueryCode = () => {
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


        var start = Date.now();
        setInterval(function () {
            var delta = Date.now() - start; // milliseconds elapsed since start
            //   console.log(Math.floor(delta / 1000)); // in seconds
            // alternatively just show wall clock time:
            // console.log(new Date().toUTCString());
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
                    console.log("line 112:" + val.county);
                    map = JSON.parse(val.mapData);
                    console.log(val.mapData);
                    // $('.countyMap').animate({ 'left': val.left })
                    // $('.countyMap').css({ 'top': val.top })
                    $('.countyMap').css('background-image', val.countyBG)
                    $('.countyMap').fadeIn();
                    $('.countyMap').css('background-image', town0)


                    // console.log("line 123" + val.co)
                    newLocations = val.locations;
                    newLocationsEng = val.locationsEng;
                    // console.log(newLocations)

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

                        console.log("whichSea" + whichSea)
                    }, 300)
                }
                else {
                    console.log(">>>> does" + imreoir.whereAmI + " match  error loading map.")
                }


            });


        })
        let newLocations;
        let newLocationsEng;
        let allCounties;
        $.getJSON('/whichCounty', function (data) {
            allCounties = data.naContae;
            console.log(allCounties);
            console.log("^JQ getJSON call to  /whichCounty endpoint works OK from inside React component baile.jsx")
            localStorage.setItem("whereAmI", "wicklow");
            imreoir.whereAmI = localStorage.getItem("whereAmI");

        })

        let imreoir = {
            ainm: "Uallach", craobh: "", from: "Ċill Ċainniġ", slí: "Draoi", avatar: setPlayerIcon(), whereAmI: 'donegal'
        }
        imreoir.whereAmI = 'wicklow';

        console.log(imreoir.whereAmI + ": new imreoir whereAmI");
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


                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");
                        // NarrativeCode++;
                        alert("NEs");
                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        refresh();
                        setTimeout(setMap(), 1000)


                    };
                    if (direction === E) {


                    };
                    if (direction === SE) {
                    };
                    if (direction === S) {

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");
                        // NarrativeCode++;
                        alert("sw");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 7;
                        refresh();
                        setTimeout(setMap(), 1000)

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");
                        // NarrativeCode++;

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 7;
                        refresh();
                        setTimeout(setMap(), 1000)
                        alert("W");

                    };
                    if (direction === NW) {
                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 6;
                        animatePlayer();

                        // NarrativeCode++;

                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");
                        // NarrativeCode++;
                        refresh();
                        setMap()



                    };

                    break;


                case 'wexford':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 8;
                        playerColumn = 5;
                        // animatePlayer();
                        refresh();
                        setMap()

                    }


                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        refresh();
                        setMap();



                    };
                    if (direction === E) {


                    };
                    if (direction === SE) {
                    };
                    if (direction === S) {

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 7;
                        refresh();
                        setMap();


                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 7;
                        refresh();
                        setMap();


                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "carlow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();


                    };

                    break;

                case 'offaly':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "laois");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "galway");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 9;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    break;
                case 'cavan':
                    if (direction === N) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {

                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "leitrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    }; break;
                case 'clare':
                    if (direction === N) {
                        localStorage.setItem("whereAmI", "galway");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "limerick");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {

                    };
                    if (direction === SW) {

                    };
                    if (direction === W) {

                    };
                    if (direction === NW) {

                    }; break;
                case 'kildare':
                    if (direction === N) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "dublin");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "carlow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "laois");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();


                    }; break;
                case 'galway':
                    if (direction === N) {
                        localStorage.setItem("whereAmI", "mayo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "clare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SW) {


                    };
                    if (direction === W) {

                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "mayo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();


                    }; break;
                case 'monaghan':
                    if (direction === N) {

                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "louth");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();


                    }; break;
                case 'carlow':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "wexford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "wexford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === NW) {

                        localStorage.setItem("whereAmI", "laois");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };



                    break;
                case 'armagh':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "antrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 9;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "down");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "down");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "louth");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "louth");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SW) {

                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 9;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();


                    }; break;

                case 'down': if (direction === N) {
                    localStorage.setItem("whereAmI", "antrim");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 6;
                    playerColumn = 9;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {

                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "louth");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "antrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 9;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'westmeath':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 9;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SW) {

                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();


                    }; break;
                case 'mayo': if (direction === N) {

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "sligo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "galway");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "galway");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "galway");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();


                    };
                    if (direction === W) {

                    };
                    if (direction === NW) {

                    }; break;
                case 'longford':
                    if (direction === N) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'kerry': if (direction === N) {

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "limerick");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {

                    };
                    if (direction === SW) {

                    };
                    if (direction === W) {

                    };
                    if (direction === NW) {

                    }; break;
                case 'meath': if (direction === N) {
                    localStorage.setItem("whereAmI", "monaghan");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 8;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "louth");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "dublin");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'kilkenny': if (direction === N) {
                    localStorage.setItem("whereAmI", "laois");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 8;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "laois");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "carlow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "wexford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "waterford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "waterford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'waterford': if (direction === N) {
                    localStorage.setItem("whereAmI", "tipperary");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 8;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {

                    };
                    if (direction === S) {

                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'laois': if (direction === N) {
                    localStorage.setItem("whereAmI", "offaly");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 4;
                    playerColumn = 6;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "carlow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'sligo': if (direction === N) {

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "leitrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "leitrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "mayo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "mayo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {

                    }; break;
                case 'derry': if (direction === N) {

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "antrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "antrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "antrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "donegal");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {


                    }; break;
                case 'roscommon': if (direction === N) {
                    localStorage.setItem("whereAmI", "sligo");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 8;
                    playerColumn = 7;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "leitrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "westmeath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 7;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "offaly");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "galway");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "mayo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "sligo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'wicklow':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "dublin");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap()

                    }


                    if (direction === NE) {

                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {

                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "wexford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 1
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap()
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "carlow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 1;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap()

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 4;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap()
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;

                        playerRow = 3;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap()

                    };
                    break;
                case 'cork': if (direction === N) {
                    localStorage.setItem("whereAmI", "limerick");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 5;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "waterford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {

                    };
                    if (direction === S) {
                    };
                    if (direction === SW) {

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "kerry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "kerry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'fermanagh': if (direction === N) {
                    localStorage.setItem("whereAmI", "donegal");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 8;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 6;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "leitrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "donegal");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 8;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'donegal': if (direction === N) {

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "derry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "tyrone");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 2;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 4;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "leitrim");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {

                    };
                    if (direction === NW) {
                    }; break;
                case 'antrim': if (direction === N) {

                };
                    if (direction === NE) {

                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "down");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "down");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "derry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "derry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 7;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'leitrim': if (direction === N) {
                    localStorage.setItem("whereAmI", "donegal");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 8;
                    playerColumn = 3;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 3;
                        playerColumn = 1;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 3;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "longford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "roscommon");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 2;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "sligo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 4;
                        playerColumn = 8;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "sligo");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'dublin': if (direction === N) {
                    localStorage.setItem("whereAmI", "meath");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 7;
                    playerColumn = 7;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {

                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 6;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "wicklow");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 1;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "kildare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'limerick': if (direction === N) {

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "clare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "tipperary");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "kerry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "kerry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {


                    }; break;
                case 'louth':

                    if (direction === N) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === NE) {


                    };
                    if (direction === E) {

                    };
                    if (direction === SE) {

                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "meath");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "cavan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'tipperary': if (direction === N) {
                    localStorage.setItem("whereAmI", "offaly");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 5;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "laois");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "kilkenny");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "waterford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "waterford");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "cork");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "limerick");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "clare");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;

                case 'tyrone': if (direction === N) {
                    localStorage.setItem("whereAmI", "derry");
                    imreoir.whereAmI = localStorage.getItem("whereAmI");

                    gameObjects[playerRow][playerColumn] = 0;
                    playerRow = 5;
                    playerColumn = 5;
                    animatePlayer();
                    refresh();
                    setMap();

                };
                    if (direction === NE) {
                        localStorage.setItem("whereAmI", "derry");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === E) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === SE) {
                        localStorage.setItem("whereAmI", "armagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === S) {
                        localStorage.setItem("whereAmI", "monaghan");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === SW) {
                        localStorage.setItem("whereAmI", "fermanagh");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    };
                    if (direction === W) {
                        localStorage.setItem("whereAmI", "donegal");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();
                    };
                    if (direction === NW) {
                        localStorage.setItem("whereAmI", "donegal");
                        imreoir.whereAmI = localStorage.getItem("whereAmI");

                        gameObjects[playerRow][playerColumn] = 0;
                        playerRow = 5;
                        playerColumn = 5;
                        animatePlayer();
                        refresh();
                        setMap();

                    }; break;
                case 'abroad': break;

                default: break;
            }
            $.getJSON('mapData.json', function (county) {

                $.each(county, function (key, val) {
                    console.log("val " + val.co)
                    console.log("val.county " + val.county)

                    if (val.co === imreoir.whereAmI) {
                        $('#output').html(val.county)
                        $('.emblem').attr("src", "../../img/counties/icons/" + val.emblem + ".png")
                        setTimeout(function () {
                            $('.emblem-img').attr("src", "./emblems/" + val.emblem + ".png")

                            $('.emblem-img').fadeIn()
                            $('#output').fadeIn()
                        }, 200)



                        map = JSON.parse(val.mapData);
                        console.log(val.mapData);

                        // $('.countyMap').css('left', val.left)
                        // $('.countyMap').css('top', val.top)
                        $('.countyMap').css('background-image', val.countyBG)
                        console.log('imreoir where am I?' + imreoir.whereAmI)


                        console.log("line 123" + val.co)
                        newLocations = val.locations;
                        newLocationsEng = val.locationsEng
                        console.log(newLocations)
                        console.log(newLocationsEng)
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
                        console.log("does > > > >" + imreoir.whereAmI + " match  error loading map.")
                    }


                });


            })

        }
        let playerDetails = {};


        $.getJSON('mapData.json', function (county) {

            $.each(county, function (key, val) {
                console.log("val " + val.co)
                console.log("val.county " + val.county)
                if (val.co === imreoir.whereAmI) {
                    console.log("line 112!!!!!:" + val.county);
                    map = JSON.parse(val.mapData);
                    console.log("OOOOOOO" + val.mapData);
                    console.log("OOOOOOO" + val.mapData);

                    // $('.countyMap').css('left', val.left)
                    // $('.countyMap').css('top', val.top)
                    $('.countyMap').css('background-image', val.countyBG)
                    console.log('imreoir where am I?' + imreoir.whereAmI)
                    // $('.countyMap').css('animation', 'zoom-to-' + imreoir.whereAmI + ' 2s forwards ease-in');


                    console.log("line 123" + val.co)

                }
                else {
                    console.log(whereAmI + 'whereAmI');
                    console.log("does" + imreoir.whereAmI + " match error loading map.")
                }


            });


        })

        console.log("line 108" + imreoir.whereAmI);
        imreoir.whereAmI = localStorage.getItem("whereAmI")

        imreoir.avatar = setPlayerIcon();
        console.log("imreoir.avatar: " + imreoir.avatar)
        imreoir.slí = localStorage.getItem("slí")
        imreoir.from = localStorage.getItem("from")


        function travel(direction) {
            console.log('travelling...' + direction)
            imreoir.whereAmI = localStorage.getItem("whereAmI");
            console.log('whereAmI...' + imreoir.whereAmI);

            switch (direction) {
                case 2:
                    break;
                case 9: playerDetails.whereAmI = 'derry';
                    console.log('travelling to Derry...')

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
                    console.log(imreoir + "hey here- ajax request update player ...success.")
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
                case '': locationGraphic = place0; localStorage.setItem('encounterID', 0); break;
                case "Baile na gCailleach": locationGraphic = collin; localStorage.setItem('encounterID', 1); break;
                case "Loch Dairbhreach": locationGraphic = lderra; localStorage.setItem('encounterID', 2); break;
                case "Tulaigh an Eallaigh": locationGraphic = tullyn; localStorage.setItem('encounterID', 3); break;
                case "Na Colúir": locationGraphic = corlis; localStorage.setItem('encounterID', 4); break;
                case "Cill Ḃeagáin": locationGraphic = kilbeg; localStorage.setItem('encounterID', 5); break;
                case "An Muileann gCearr": locationGraphic = mullin; localStorage.setItem('encounterID', 6); break;
                case "Cluain Ṁic Nóis": locationGraphic = clonma; localStorage.setItem('encounterID', 7); break;
                case "Éadan Doire": locationGraphic = edende; localStorage.setItem('encounterID', 8); break;
                case "Biorra": locationGraphic = birr; localStorage.setItem('encounterID', 9); break;
                case "Cionn Eitigh": locationGraphic = kinnit; localStorage.setItem('encounterID', 10); break;
                case "Ráth Iomġáin": locationGraphic = rathan; localStorage.setItem('encounterID', 11); break;
                case "Suí an Róin": locationGraphic = shinro; localStorage.setItem('encounterID', 12); break;
                case "Dún Dealgan": locationGraphic = dundeal; localStorage.setItem('encounterID', 13); break;
                case "An Grianfort": locationGraphic = angria; localStorage.setItem('encounterID', 14); break;
                case "Ceann Ċloċair": locationGraphic = iceith; localStorage.setItem('encounterID', 15); break
                case "Baile Átha Ḟirdia": locationGraphic = bafhir; localStorage.setItem('encounterID', 16); break;
                case "Poll an Phúca": locationGraphic = pollph1; localStorage.setItem('encounterID', 17); break;
                case "Baile an Ġearlánaigh": locationGraphic = baghea; localStorage.setItem('encounterID', 18); break;
                case "Coill an Iarainn": locationGraphic = caiara; localStorage.setItem('encounterID', 19); break;
                case "Inis Córṫaidh": locationGraphic = icorth; localStorage.setItem('encounterID', 20); break;
                case "Poll an Phúca": locationGraphic = pollph2; localStorage.setItem('encounterID', 21); break;
                case "Maolán na nGaḃar": locationGraphic = maolann; localStorage.setItem('encounterID', 22); break;
                case "An Abhainn Dubh": locationGraphic = aadubh; localStorage.setItem('encounterID', 23); break;
                case "Dún Ċormaic": locationGraphic = duncor; localStorage.setItem('encounterID', 24); break;
                case "Pailis Ċaonraí": locationGraphic = pcaonr; localStorage.setItem('encounterID', 25); break;
                case "Poll an Phúca": locationGraphic = pollph3; localStorage.setItem('encounterID', 26); break;
                case "Caisleán Uí Ċonaill": locationGraphic = caisui; localStorage.setItem('encounterID', 27); break;
                case "Áth na bḞuinseog": locationGraphic = athnaf; localStorage.setItem('encounterID', 28); break;
                case "An Ḟeoṫanaċ": locationGraphic = anfheot; localStorage.setItem('encounterID', 29); break;
                case "Brú Rí": locationGraphic = bruri; localStorage.setItem('encounterID', 30); break;
                case "Fionnġlas": locationGraphic = fionng; localStorage.setItem('encounterID', 31); break;
                case "Cluain Dolcáin": locationGraphic = cdolca; localStorage.setItem('encounterID', 32); break;
                case "Cluain Tarbh": locationGraphic = ctarbh; localStorage.setItem('encounterID', 33); break;
                case "Binn Éadair": locationGraphic = beadai; localStorage.setItem('encounterID', 34); break;
                case "Dún Laoiġaire": locationGraphic = dlaoig; localStorage.setItem('encounterID', 35); break;
                case "Deilginis": locationGraphic = deilgi; localStorage.setItem('encounterID', 36); break;
                case "Gleann Éada": locationGraphic = gleada; localStorage.setItem('encounterID', 37); break;
                case "Garḃach": locationGraphic = garbha; localStorage.setItem('encounterID', 38); break;
                case "Droim Seanḃó": locationGraphic = dseanb; localStorage.setItem('encounterID', 39); break;
                case "Aċaḋ na Síleann": locationGraphic = ansile; localStorage.setItem('encounterID', 40); break;
                case "Fíonach": locationGraphic = fionac; localStorage.setItem('encounterID', 41); break;
                case "Dromad": locationGraphic = dromad; localStorage.setItem('encounterID', 42); break;
                case "Reaċlainn": locationGraphic = reachl; localStorage.setItem('encounterID', 43); break;
                case "Dearḃóg": locationGraphic = dearbh; localStorage.setItem('encounterID', 44); break;
                case "Aċaḋ Eoċaille": locationGraphic = aeocha; localStorage.setItem('encounterID', 45); break;
                case "Carn Ṁéaḃla": locationGraphic = carnmh; localStorage.setItem('encounterID', 46); break;
                case "Carraig Ḟearġais": locationGraphic = dlaoig; localStorage.setItem('encounterID', 47); break;
                case "Béal Feiriste": locationGraphic = bealfe; localStorage.setItem('encounterID', 48); break;
                case "Cionn Dhún Damh": locationGraphic = cddamh; localStorage.setItem('encounterID', 49); break;
                case "Baile idir Dhá Abhainn": locationGraphic = bidabh; localStorage.setItem('encounterID', 50); break;
                case "Sléiḃte Ḋoire Ḃeatha": locationGraphic = sdbhea; localStorage.setItem('encounterID', 51); break;
                case "Leitir Ceanainn": locationGraphic = lceana; localStorage.setItem('encounterID', 52); break;
                case "Bealach Féich": locationGraphic = bfeich; localStorage.setItem('encounterID', 53); break;
                case "Na Cruacha Gorma": locationGraphic = ncgorm; localStorage.setItem('encounterID', 54); break;
                case "An Garastún": locationGraphic = angara; localStorage.setItem('encounterID', 55); break;
                case "Paiteagó": locationGraphic = paitea; localStorage.setItem('encounterID', 56); break;
                case "Eadarnaiḋ": locationGraphic = eadarn; localStorage.setItem('encounterID', 57); break;
                case "Lios na Daróg": locationGraphic = lnadar; localStorage.setItem('encounterID', 58); break;
                case "Scriobaċ": locationGraphic = scriob; localStorage.setItem('encounterID', 59); break;
                case "Inis Ceiṫleann": locationGraphic = iceith; localStorage.setItem('encounterID', 60); break;
                case "Cill na Mallaċ": locationGraphic = dromad; localStorage.setItem('encounterID', 61); break;
                case "Sliabh an Nóglaigh": locationGraphic = sanogl; localStorage.setItem('encounterID', 62); break;
                case "Gleann an Ṗreaċáin": locationGraphic = gaphre; localStorage.setItem('encounterID', 63); break;
                case "Beal na mḂláth": locationGraphic = bnmhla; localStorage.setItem('encounterID', 64); break;
                case "Cionn tSáile": locationGraphic = ctsail; localStorage.setItem('encounterID', 65); break;
                case "An Sciobairín": locationGraphic = ascioba; localStorage.setItem('encounterID', 66); break;
                case "Poll an Ṗúca": locationGraphic = pollph3; localStorage.setItem('encounterID', 67); break;
                case "Na Cloċa Liaṫa": locationGraphic = ncliat; localStorage.setItem('encounterID', 68); break;
                case "Siol Éalaiġ": locationGraphic = sealai; localStorage.setItem('encounterID', 69); break;
                case "Dún Ard": locationGraphic = dard; localStorage.setItem('encounterID', 70); break;
                case "An tInḃear Mór": locationGraphic = arklow; localStorage.setItem('encounterID', 71); break;
                case "Aḃóca": locationGraphic = avoca; localStorage.setItem('encounterID', 72); break;
                case "Cluain Fada": locationGraphic = clfada; localStorage.setItem('encounterID', 73); break;
                case "Baile an Tobair": locationGraphic = batoba; localStorage.setItem('encounterID', 74); break;
                case "Loch Bó Finne": locationGraphic = lbfinn; localStorage.setItem('encounterID', 75); break;
                case "Scramóg": locationGraphic = collin; localStorage.setItem('encounterID', 76); break;
                case "Loch Bó Dearge": locationGraphic = lbdear; localStorage.setItem('encounterID', 77); break;
                case "Corr na Fola": locationGraphic = cnfola; localStorage.setItem('encounterID', 78); break;
                case "Doire": locationGraphic = doire; localStorage.setItem('encounterID', 79); break;
                case "Léim an Ṁadaiḋ": locationGraphic = leiman; localStorage.setItem('encounterID', 80); break;
                case "Droichead Fíolta": locationGraphic = dfiolt; localStorage.setItem('encounterID', 81); break;
                case "Maċaire Ráṫa": locationGraphic = macair; localStorage.setItem('encounterID', 82); break;
                case "An Seanṁullach": locationGraphic = aseanm; localStorage.setItem('encounterID', 83); break;
                case "Muine Mór": locationGraphic = muimor; localStorage.setItem('encounterID', 84); break;
                case "Béal Átha na gCarraigíní": locationGraphic = collin; localStorage.setItem('encounterID', 85); break;
                case "An Mullach Mór": locationGraphic = collin; localStorage.setItem('encounterID', 86); break;
                case "Uaimheanna na Céise": locationGraphic = uaimnc; localStorage.setItem('encounterID', 87); break;
                case "Machaire Eabha": locationGraphic = maceab; localStorage.setItem('encounterID', 88); break;
                case "Baile Uí Ḋálaigh": locationGraphic = budala; localStorage.setItem('encounterID', 89); break;
                case "Tobar an Ċoire": locationGraphic = tobanc; localStorage.setItem('encounterID', 90); break;
                case "Ros Cré": locationGraphic = roscre; localStorage.setItem('encounterID', 91); break;
                case "Durlas": locationGraphic = durlas; localStorage.setItem('encounterID', 92); break;
                case "Faiċe Ró": locationGraphic = collin; localStorage.setItem('encounterID', 93); break;
                case "Sliabh na mBan": locationGraphic = slnamb; localStorage.setItem('encounterID', 94); break;
                case "Cluain Meala": locationGraphic = clumea; localStorage.setItem('encounterID', 95); break;
                case "Tigh na Naoi Míle": locationGraphic = tignao; localStorage.setItem('encounterID', 96); break;
                case "Eiréil ": locationGraphic = eireil; localStorage.setItem('encounterID', 97); break;
                case "Darú": locationGraphic = daru; localStorage.setItem('encounterID', 98); break;
                case "An Baile Fionn": locationGraphic = anbafi; localStorage.setItem('encounterID', 99); break;
                case "Droichead Crom Abú": locationGraphic = drcrab; localStorage.setItem('encounterID', 100); break;
                case "Cúil an tSúdaire": locationGraphic = cuilant; localStorage.setItem('encounterID', 101); break;
                case "Buiríos Mór Osraí": locationGraphic = buirio; localStorage.setItem('encounterID', 102); break;
                case "Sléiḃte an Ċomaraigh": locationGraphic = slanco; localStorage.setItem('encounterID', 103); break;
                case "An Baile Dubh": locationGraphic = anbadu; localStorage.setItem('encounterID', 104); break;
                case "Tullach an Iarainn": locationGraphic = tuanir; localStorage.setItem('encounterID', 105); break;
                case "Cluain Ḟia": locationGraphic = clufia; localStorage.setItem('encounterID', 106); break;
                case "Dún Garḃán": locationGraphic = dungar; localStorage.setItem('encounterID', 107); break;
                case "Cill Ṁíodáin": locationGraphic = cilmio; localStorage.setItem('encounterID', 108); break;
                case "Sléiḃte an Ċomaraigh": locationGraphic = slanco; localStorage.setItem('encounterID', 109); break;
                case "Tullach an Iarainn": locationGraphic = collin; localStorage.setItem('encounterID', 111); break;
                case "Ġráinseaċ Ċuffe": locationGraphic = gracuf; localStorage.setItem('encounterID', 114); break;
                case "Baile Ṁic Andáin": locationGraphic = collin; localStorage.setItem('encounterID', 115); break;
                case "Bearna na Gaoiṫe": locationGraphic = collin; localStorage.setItem('encounterID', 116); break;
                case "Baile an Ṗoill": locationGraphic = collin; localStorage.setItem('encounterID', 118); break;
                case "Sliaḃ Rua": locationGraphic = collin; localStorage.setItem('encounterID', 119); break;
                case "Bearna na Gaoiṫe": locationGraphic = collin; localStorage.setItem('encounterID', 122); break;
                case "Baile an Ṗoill": locationGraphic = collin; localStorage.setItem('encounterID', 124); break;
                case "An Uaimh": locationGraphic = navan; localStorage.setItem('encounterID', 126); break;
                case "Ráth Ċairn": locationGraphic = rathca; localStorage.setItem('encounterID', 127); break;
                case "Cill Ḃríde": locationGraphic = kilbri; localStorage.setItem('encounterID', 128); break;
                case "Teamhair": locationGraphic = sacred; localStorage.setItem('encounterID', 129); break;
                case "Buaile na Bréachṁaí ": locationGraphic = collin; localStorage.setItem('encounterID', 130); break;
                case "Tigh na Sióg": locationGraphic = collin; localStorage.setItem('encounterID', 131); break;
                case "Cathair Saiḋḃín": locationGraphic = collin; localStorage.setItem('encounterID', 132); break;
                case "An Daingean": locationGraphic = collin; localStorage.setItem('encounterID', 133); break;
                case "Gleann na bPúcaí": locationGraphic = glnapu; localStorage.setItem('encounterID', 134); break;
                case "Sliabh Mis": locationGraphic = collin; localStorage.setItem('encounterID', 135); break;
                case "Na Cruaċa Duḃa": locationGraphic = collin; localStorage.setItem('encounterID', 136); break;
                case "An tSnaidhm": locationGraphic = collin; localStorage.setItem('encounterID', 137); break;
                case "An Lios Breac": locationGraphic = collin; localStorage.setItem('encounterID', 138); break;
                case "Meathais Troim": locationGraphic = collin; localStorage.setItem('encounterID', 139); break;
                case "Gránard": locationGraphic = collin; localStorage.setItem('encounterID', 140); break;
                case "Cluain Dá Ráth": locationGraphic = collin; localStorage.setItem('encounterID', 141); break;
                case "Maiġ Duṁa": locationGraphic = collin; localStorage.setItem('encounterID', 142); break;
                case "An Ċarraig Ḃuí": locationGraphic = collin; localStorage.setItem('encounterID', 143); break;
                case "Cill Ala": locationGraphic = collin; localStorage.setItem('encounterID', 144); break;
                case "Caisleán an Ḃarraiġ": locationGraphic = collin; localStorage.setItem('encounterID', 145); break;
                case "Baile Ui Ḟiacáin": locationGraphic = collin; localStorage.setItem('encounterID', 146); break;
                case "An Caoláire Rua": locationGraphic = collin; localStorage.setItem('encounterID', 147); break;
                case "Lios an tSaṁaiḋ": locationGraphic = collin; localStorage.setItem('encounterID', 148); break;
                case "An Éill": locationGraphic = collin; localStorage.setItem('encounterID', 149); break;
                case "An Lorgain": locationGraphic = collin; localStorage.setItem('encounterID', 150); break;
                case "Lios na gCearrḃach": locationGraphic = collin; localStorage.setItem('encounterID', 151); break;
                case "An Caisleán Riaḃach": locationGraphic = collin; localStorage.setItem('encounterID', 152); break;
                case "An Ṁainistir Liath": locationGraphic = collin; localStorage.setItem('encounterID', 153); break;
                case "Dún Pádraig": locationGraphic = dunpad; localStorage.setItem('encounterID', 154); break;
                case "Cill Ċaoil": locationGraphic = collin; localStorage.setItem('encounterID', 155); break;
                case "Sráid na nAlbanach": locationGraphic = collin; localStorage.setItem('encounterID', 156); break;
                case "Craigavon": locationGraphic = collin; localStorage.setItem('encounterID', 157); break;
                case "Port An Dúnáin": locationGraphic = collin; localStorage.setItem('encounterID', 158); break;
                case "Baile Úr": locationGraphic = collin; localStorage.setItem('encounterID', 159); break;
                case "Baile an Ṁuilinn": locationGraphic = collin; localStorage.setItem('encounterID', 160); break;
                case "Lios Liath": locationGraphic = collin; localStorage.setItem('encounterID', 161); break;
                case "Cill Deirge": locationGraphic = collin; localStorage.setItem('encounterID', 162); break;
                case "Baile Uí Ṁurċú": locationGraphic = collin; localStorage.setItem('encounterID', 163); break;
                case "Baile Haicéid": locationGraphic = collin; localStorage.setItem('encounterID', 164); break;
                case "An Ḃuiríos": locationGraphic = collin; localStorage.setItem('encounterID', 165); break;
                case "Miseal": locationGraphic = collin; localStorage.setItem('encounterID', 166); break;
                case "Cill Daṁáin": locationGraphic = collin; localStorage.setItem('encounterID', 167); break;
                case "Scairbh na gCaorach": locationGraphic = collin; localStorage.setItem('encounterID', 168); break;
                case "Cluain Eois": locationGraphic = collin; localStorage.setItem('encounterID', 169); break;
                case "Mainistir Ḃuithe": locationGraphic = collin; localStorage.setItem('encounterID', 170); break;
                case "Teach an Scotaigh": locationGraphic = collin; localStorage.setItem('encounterID', 171); break;
                case "Crícheán Rua": locationGraphic = collin; localStorage.setItem('encounterID', 172); break;
                case "Carraig Ṁaċaire Rois": locationGraphic = collin; localStorage.setItem('encounterID', 173); break;
                case "Poll an Phúca": locationGraphic = collin; localStorage.setItem('encounterID', 174); break;
                case "Cill Cais": locationGraphic = collin; localStorage.setItem('encounterID', 175); break;
                case "An Spidéal ": locationGraphic = collin; localStorage.setItem('encounterID', 176); break;
                case "An Teach Dóite": locationGraphic = collin; localStorage.setItem('encounterID', 177); break;
                case "An Ċeaṫrú Rua": locationGraphic = collin; localStorage.setItem('encounterID', 178); break;
                case "Inis Meáin ": locationGraphic = collin; localStorage.setItem('encounterID', 179); break;
                case "Cairbre": locationGraphic = collin; localStorage.setItem('encounterID', 180); break;
                case "Na Solláin": locationGraphic = collin; localStorage.setItem('encounterID', 181); break;
                case "Fioḋ Alúine": locationGraphic = collin; localStorage.setItem('encounterID', 182); break;
                case "Maigh Nuad": locationGraphic = collin; localStorage.setItem('encounterID', 183); break;
                case "An Currach": locationGraphic = collin; localStorage.setItem('encounterID', 184); break;
                case "Léim an Ḃradáin": locationGraphic = collin; localStorage.setItem('encounterID', 185); break;
                case "Ceann Boirne": locationGraphic = collin; localStorage.setItem('encounterID', 186); break;
                case "Fíoch Rua": locationGraphic = collin; localStorage.setItem('encounterID', 187); break;
                case "An Tulach": locationGraphic = collin; localStorage.setItem('encounterID', 188); break;
                case "Cill Rois": locationGraphic = collin; localStorage.setItem('encounterID', 189); break;
                case "Leaba Ṡíoda": locationGraphic = collin; localStorage.setItem('encounterID', 190); break;
                case "Bun Raite": locationGraphic = collin; localStorage.setItem('encounterID', 191); break;
                case "Doire na Criaḋ": locationGraphic = derryn; localStorage.setItem('encounterID', 192); break;
                case "An Cnoc Rua": locationGraphic = redhil; localStorage.setItem('encounterID', 193); break;
                case "Béal Tairbirt": locationGraphic = beltur; localStorage.setItem('encounterID', 194); break;
                case "An Dromainn": locationGraphic = ridge; localStorage.setItem('encounterID', 195); break;
                case "Dún an Rí": locationGraphic = dunare; localStorage.setItem('encounterID', 196); break;
                case "Lios Cré": locationGraphic = lisgre; localStorage.setItem('encounterID', 197); break;
                case "Caisleán na Deirge": locationGraphic = collin; localStorage.setItem('encounterID', 198); break;
                case "Baile Mhic Gofraidh": locationGraphic = collin; localStorage.setItem('encounterID', 199); break;
                case "An Ómaigh": locationGraphic = collin; localStorage.setItem('encounterID', 200); break;
                

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
            // gameObjects[geagaRow][geagaColumn] = '../../img/geaga.png'
            // console.log("geaga xy" + gameObjects[geagaRow][geagaColumn])
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
            console.log("Cell height and width from animatePlayer()" + cellHeight)
            console.log(cellWidth)
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
                    case UP:
                        if (playerRow > 0) {
                            lastPressed = 'up';

                            gameObjects[playerRow][playerColumn] = 0;

                            playerRow--;
                            animatePlayer();

                        }
                        break;

                    case DOWN:
                        if (playerRow < ROWS - 1) {
                            lastPressed = 'down';
                            gameObjects[playerRow][playerColumn] = ROWS - 0;
                            playerRow++;
                            animatePlayer();
                        }
                        break;

                    case LEFT:
                        if (playerColumn > 1) {
                            gameObjects[playerRow][playerColumn] = 1;
                            playerColumn--;
                            lastPressed = 'left';
                            animatePlayer();
                        }
                        break;

                    case RIGHT:
                        if (playerColumn < COLUMNS - 1) {
                            gameObjects[playerRow][playerColumn] = 0;
                            playerColumn++;

                            lastPressed = 'right';
                            animatePlayer();
                        }
                        break;
                    default: break;
                }

                //find out what kind of cell the player is on
                switch (map[playerRow][playerColumn]) {
                    case EMPTY:
                        clearLocation();
                        $('#btn-b').fadeOut()
                        break;
                    case N:
                        loadMap(N)
                        break;

                    case NE:
                        loadMap(NE)
                        break;
                    case E:
                        loadMap(E)
                        break;
                    case SE:
                        loadMap(SE)
                        break;
                    case S:
                        loadMap(S)
                        break;
                    case SW:
                        loadMap(SW)
                        break;
                    case W:
                        loadMap(W)
                        break;
                    case NW:
                        loadMap(NW)

                        break;
                    case location0:
                        readyLocation(0)
                        readyLocationEng(0)

                        break;

                    case location1:
                        readyLocation(1)
                        readyLocationEng(1)
                        break;
                    case location2:
                        readyLocation(2)
                        readyLocationEng(2)

                        break;
                    case location3:
                        readyLocation(3)
                        readyLocationEng(3)

                        break;
                    case location4:
                        readyLocation(4)
                        readyLocationEng(4)

                        break;
                    case location5:
                        readyLocation(5)
                        readyLocationEng(5)

                        break;
                    case EXIT:
                        returnToCounty(); break
                    case tullyField5: helloTullyField5(); break;
                    default: break;
                }

                //Find out if the player is standing on the same square as another object

            }
            if (!mapMenuIsVisible) {
                switch (map[playerRow][playerColumn]) {
                    case tullyField5: helloTullyField5(); break;
                    case BLOCKED:
                        //Undo last key press
                        //   alert('blocked!');
                        //   alert('Blocked' + lastPressed + Cookies.get('locationID'));
                        blockPath();
                        break;
                    // case HINT0: helloHint0(); break;
                    case trap: helloTrap(); break;
                    case CONTACT: helloFerna(); break;
                    case GEAGA: helloGeaga(); break;
                    case N: travel(N); break;
                    case NE: travel(NE); break;
                    case E: travel(E); break;
                    case SE: travel(SE); break;
                    case S: travel(S); break;
                    case SW: travel(SW); break;
                    case W: travel(W); break;
                    case NW: travel(NW); break;
                    default: break;


                }
            }


        }

        helloGeaga();

        // function goBackOneSquare() {
        //     if (lastPressed === 'up') {
        //         gameObjects[playerRow][playerColumn] = 0;
        //         playerRow++;
        //         gameObjects[playerRow][playerColumn] = PLAYER;
        //     } else if (lastPressed === 'down') {
        //         gameObjects[playerRow][playerColumn] = 0;
        //         playerRow--;
        //         gameObjects[playerRow][playerColumn] = PLAYER;
        //     } else if (lastPressed === 'left') {
        //         gameObjects[playerRow][playerColumn] = 0;
        //         playerColumn++;
        //         gameObjects[playerRow][playerColumn] = PLAYER;
        //     } else if (lastPressed === 'right') {
        //         gameObjects[playerRow][playerColumn] = 0;
        //         playerColumn--;
        //         gameObjects[playerRow][playerColumn] = PLAYER;
        //     }
        // };
        let elementClass;
        // Target all clicks on any element
        document.addEventListener('click', (e) => {
            // Get element class(es)
            elementClass = e.target.className;

            // If element has class(es)
            if (elementClass !== '') {
                console.log(elementClass);
            }
            if (elementClass === '') {
                console.log(elementClass);
            }

            //making each square of a 10x10 grid of squares a button that moves the player there, on touch.


            if (elementClass.includes('cell')) {


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
                console.log('An element without a class was clicked');
            }
        }
        );
        function touchMap() {
            //  alert()
        }

        function blockPath() {
            switch (lastPressed) {
                case 'down':

                    gameObjects[playerRow][playerColumn] = BLOCKED;

                    playerRow--;

                    //Apply the player's new updated position to the array
                    gameObjects[playerRow][playerColumn] = PLAYER;

                    break;

                case 'up':
                    gameObjects[playerRow][playerColumn] = BLOCKED;

                    playerRow++;
                    gameObjects[playerRow][playerColumn] = PLAYER;

                    break;

                case 'right':
                    gameObjects[playerRow][playerColumn] = BLOCKED;

                    playerColumn--;
                    gameObjects[playerRow][playerColumn] = PLAYER;

                    break;

                case 'left':
                    gameObjects[playerRow][playerColumn] = BLOCKED;

                    playerColumn++;
                    gameObjects[playerRow][playerColumn] = PLAYER;
                    break;
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



            console.log('whereAmI' + whereAmI)
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
                    // console.log("val.county " + val.county)
                    if (val.co === imreoir.whereAmI) {
                        $('#output').html(val.county)
                        // $('.emblem').attr('src', '../../img/counties/icons/' + localStorage.getItem('whereAmI')+'.png')
                        console.log("line 112:" + val.county);
                        map = JSON.parse(val.mapData);
                        console.log(val.mapData);

                        // $('.countyMap').css('left', val.left)
                        // $('.countyMap').css('top', val.top)
                        $('.countyMap').css('background-image', val.countyBG)
                        console.log('imreoir where am I?' + imreoir.whereAmI)



                        console.log("line 123" + val.co)
                        newLocations = val.locations;
                        newLocationsEng = val.locationsEng;
                        console.log(newLocations)
                    }
                    else {
                        console.log("does" + imreoir.whereAmI + " match " + "error loading map.");

                        console.log(whereAmI + 'whereAmI');

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
                "Éadan Doire",
                "Biorra",
                "Cionn Eitigh",
                "Ráth Iomġáin",
                "Suí an Róin",
                "Dún Dealgan",
                "An Grianfort",
                "Ceann Ċloċair",
                "Baile Átha Ḟirdia",
                "Poll an Phúca",
                "Baile an Ġearlánaigh",
                "Coill an Iarainn",
                "Inis Córṫaidh",
                "Poll an Phúca",
                "Maolán na nGaḃar",
                "An Abhainn Dubh",
                "Dún Ċormaic",
                "Pailis Ċaonraí",
                "Poll an Phúca",
                "Caisleán Uí Ċonaill",
                "Áth na bḞuinseog",
                "An Ḟeoṫanaċ",
                "Brú Rí",
                "Fionnġlas",
                "Cluain Dolcáin",
                "Cluain Tarbh",
                "Binn Éadair",
                "Dún Laoiġaire",
                "Deilginis",
                "Gleann Éada",
                "Garḃach",
                "Droim Seanḃó",
                "Aċaḋ na Síleann",
                "Fíonach",
                "Dromad",
                "Reaċlainn",
                "Dearḃóg",
                "Aċaḋ Eoċaille",
                "Carn Ṁéaḃla",
                "Carraig Ḟearġais",
                "Béal Feiriste",
                "Cionn Dhún Damh",
                "Baile idir Dhá Abhainn",
                "Sléiḃte Ḋoire Ḃeatha",
                "Leitir Ceanainn",
                "Bealach Féich",
                "Na Cruacha Gorma",
                "An Garastún",
                "Paiteagó",
                "Eadarnaiḋ",
                "Lios na Daróg",
                "Scriobaċ",
                "Inis Ceiṫleann",
                "Cill na Mallaċ",
                "Sliabh an Nóglaigh",
                "Gleann an Ṗreaċáin",
                "Beal na mḂláth",
                "Cionn tSáile",
                "An Sciobairín",
                "Poll an Ṗúca",
                "Na Cloċa Liaṫa",
                "Siol Éalaiġ",
                "Dún Ard",
                "An tInḃear Mór",
                "Aḃóca",
                "Cluain Fada",
                "Baile an Tobair",
                "Loch Bó Finne",
                "Scramóg",
                "Loch Bó Dearge",
                "Corr na Fola",
                "Doire",
                "Léim an Ṁadaiḋ",
                "Droichead Fíolta",
                "Maċaire Ráṫa",
                "An Seanṁullach",
                "Muine Mór",
                "Béal Átha na gCarraigíní",
                "An Mullach Mór",
                "Uaimheanna na Céise",
                "Machaire Eabha",
                "Baile Uí Ḋálaigh",
                "Tobar an Ċoire",
                "Ros Cré",
                "Durlas",
                "Faiċe Ró",
                "Sliabh na mBan",
                "Cluain Meala",
                "Tigh na Naoi Míle",
                "Eiréil ",
                "Darú",
                "An Baile Fionn",
                "Droichead Crom Abú",
                "Cúil an tSúdaire",
                "Buiríos Mór Osraí",
                "Sléiḃte an Ċomaraigh",
                "An Baile Dubh",
                "Tullach an Iarainn",
                "Cluain Ḟia",
                "Dún Garḃán",
                "Cill Ṁíodáin",
                "Sléiḃte an Ċomaraigh",
                "the black town",
                "Tullach an Iarainn",
                "Cluain Ḟia",
                "Dungarvan - Garbhann's Fort",
                "Cill Ṁíodáin",
                "Ġráinseaċ Ċuffe",
                "Baile Ṁic Andáin",
                "Bearna na Gaoiṫe",
                "Dún Garḃáin",
                "Baile an Ṗoill",
                "Sliaḃ Rua",
                "An Uaimh",
                "Ráth Ċairn",
                "Cill Ḃríde",
                "Teamhair",
                "Buaile na Bréachṁaí ",
                "Tigh na Sióg",
                "Cathair Saiḋḃín",
                "An Daingean",
                "Gleann na bPúcaí",
                "Sliabh Mis",
                "Na Cruaċa Duḃa",
                "An tSnaidhm",
                "An Lios Breac",
                "Meathais Troim",
                "Gránard",
                "Cluain Dá Ráth",
                "Maiġ Duṁa",
                "An Ċarraig Ḃuí",
                "Cill Ala",
                "Caisleán an Ḃarraiġ",
                "Baile Ui Ḟiacáin",
                "An Caoláire Rua",
                "Lios an tSaṁaiḋ",
                "An Éill",
                "An Lorgain",
                "Lios na gCearrḃach",
                "An Caisleán Riaḃach",
                "An Ṁainistir Liath",
                "Dún Pádraig",
                "Cill Ċaoil",
                "Sráid na nAlbanach",
                "Craigavon",
                "Port An Dúnáin",
                "Baile Úr",
                "Baile an Ṁuilinn",
                "Lios Liath",
                "Cill Deirge",
                "Baile Uí Ṁurċú",
                "Baile Haicéid",
                "An Ḃuiríos",
                "Miseal",
                "Cill Daṁáin",
                "Scairbh na gCaorach",
                "Cluain Eois",
                "Einistir Ḃuithe",
                "Teach an Scotaigh",
                "Crícheán Rua",
                "Carraig Ṁaċaire Rois",
                "Poll an Phúca",
                "Cill Cais",
                "An Spidéal ",
                "An Teach Dóite",
                "An Ċeaṫrú Rua",
                "Inis Meáin ",
                "Cairbre",
                "Na Solláin",
                "Fioḋ Alúine",
                "Maigh Nuad",
                "An Currach",
                "Léim an Ḃradáin",
                "Ceann Boirne",
                "Fíoch Rua",
                "An Tulach",
                "Cill Rois",
                "Leaba Ṡíoda",
                "Bun Raite",
                "Doire na Criaḋ",
                "An Cnoc Rua",
                "Béal Tairbirt",
                "An Dromainn",
                "Dún an Rí",
                "Lios Cré",
                "Caisleán na Deirge",
                "Baile Mhic Gofraidh",
                "An Ómaigh",
                "Seisceann Siúil",
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
        console.log(whereAmIHolder + 'whereAmIHolder');

        storyTimer()
        console.log(whereAmI + 'whereAmI');
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

                    <img rel="preload" className="map-lens" src={lens} alt="" />

                </div>
                {this.state.isOn ? (<div id="glass">

                    < img src={glass} rel="preload" className="question-img" id="glass-img" alt="glass bg for translucent overlay effect." />
                    <div id="event-report"></div>

                    <p className='eng-question-text'></p>
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

                                        console.log("hi from toggle glass overworld portrait mode")
                                    }
                                    else {
                                        (this.setState({ isOn: true }))
                                        console.log("hi from toggle glass portrait overworld")
                                    }
                                    {/* setTimeout(()=> { this.setState({ isOn: false }) }, 3000) */ }



                                }} /></div>

                                <div className="grid-item"></div>

                                <div className="grid-item"></div>

                            </div>



                        </div>
                    </div>

                </div>
                <Easca id="easca" />

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



                <p id="hints-geaga" className={this.state.isOn && this.state.whereAmI === 'geaga' ? "hints" : "hidden"}>{'"What is a knight?", asked ' + this.props.choiceRingEng + '. "A pawn on a horse", said ' + localStorage.getItem('hname') + '.'}</p>

                <div className="ringOfFerna">
                    {/* <Rings7/> */}                </div>

                <div className="ringOfTullyNally" >
                    {/* <img src={ daff} className="daffs" alt="small yellow flowers stir in the breeze" /> */}
                    <Rings5 />

                    {/* <Rings5 heroName={this.props.heroName} heroNameEng={ this.props.heroNameEng} toggleIsOn={this.props.toggleIsOn} isOn={this.props.isOn} proceedThroughQuiz={this.props.proceedThroughQuiz } fadeOutNoOne={ this.fadeOutNoOne } /> */}
                </div>



                <div className='ui-container_directional-pad'>
                    <div className="directional-pad" id="dir-pad" onTouchStart={this.props.incrementScore} onTouchEnd={localStorage.setItem('whereAmI', 'westmeath')
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
                                    console.log("hi from toggle glass overworld")
                                }
                                else {
                                    (this.setState({ isOn: true }))
                                    console.log("hi from toggle glass  overworld")
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