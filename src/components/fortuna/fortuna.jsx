import React from 'react';
import btnA from '../../images/ciorcal-glass.png';
import ft0 from '../../images/o-fortuna/0.png';
import ft1 from '../../images/o-fortuna/1.png';
import ft2 from '../../images/o-fortuna/2.png';
import ft3 from '../../images/o-fortuna/3.png';
import ft4 from '../../images/o-fortuna/4.png';
import ft5 from '../../images/o-fortuna/5.png';
import ft6 from '../../images/o-fortuna/6.png';
import ft7 from '../../images/o-fortuna/7.png';
import ft8 from '../../images/o-fortuna/8.png';
import ft9 from '../../images/o-fortuna/9.png';
import ft10 from '../../images/o-fortuna/10.png';
import ft11 from '../../images/o-fortuna/11.png';
import ft12 from '../../images/o-fortuna/12.png';
import ft13 from '../../images/o-fortuna/13.png';
import ft14 from '../../images/o-fortuna/14.png';
import ft15 from '../../images/o-fortuna/15.png';
import ft16 from '../../images/o-fortuna/16.png';
import ft17 from '../../images/o-fortuna/17.png';
import ft18 from '../../images/o-fortuna/18.png';
import ft19 from '../../images/o-fortuna/19.png';
import ft20 from '../../images/o-fortuna/20.png';
import ft21 from '../../images/o-fortuna/21.png';
import ft22 from '../../images/o-fortuna/22.png';
import ft23 from '../../images/o-fortuna/23.png';
import ft24 from '../../images/o-fortuna/24.png';
import ft25 from '../../images/o-fortuna/25.png';
import ft26 from '../../images/o-fortuna/26.png';
import ft27 from '../../images/o-fortuna/27.png';
import ft28 from '../../images/o-fortuna/28.png';
import ft29 from '../../images/o-fortuna/29.png';
import ft30 from '../../images/o-fortuna/30.png';
import ft31 from '../../images/o-fortuna/31.png';
import ft32 from '../../images/o-fortuna/32.png';
import ft33 from '../../images/o-fortuna/33.png';
import ft34 from '../../images/o-fortuna/34.png';
import ft35 from '../../images/o-fortuna/35.png';
import ft36 from '../../images/o-fortuna/36.png';
import ft37 from '../../images/o-fortuna/37.png';
import ft38 from '../../images/o-fortuna/38.png';
import ft39 from '../../images/o-fortuna/39.png';
import ft40 from '../../images/o-fortuna/40.png';
import ft41 from '../../images/o-fortuna/41.png';
import ft42 from '../../images/o-fortuna/42.png';
import ft43 from '../../images/o-fortuna/43.png';
import ft44 from '../../images/o-fortuna/44.png';
import ft45 from '../../images/o-fortuna/45.png';
import ft46 from '../../images/o-fortuna/46.png';
import ft47 from '../../images/o-fortuna/47.png';
import ft48 from '../../images/o-fortuna/48.png';
import ft49 from '../../images/o-fortuna/49.png';
import ft50 from '../../images/o-fortuna/50.png';
import ft51 from '../../images/o-fortuna/51.png';
import ft52 from '../../images/o-fortuna/52.png';
import ft53 from '../../images/o-fortuna/53.png';
import ft54 from '../../images/o-fortuna/54.png';
import ft55 from '../../images/o-fortuna/55.png';
import ft56 from '../../images/o-fortuna/56.png';
import ft57 from '../../images/o-fortuna/57.png';
import ft58 from '../../images/o-fortuna/58.png';
import ft59 from '../../images/o-fortuna/59.png';
import ft60 from '../../images/o-fortuna/60.png';
import ft61 from '../../images/o-fortuna/61.png';
import ft62 from '../../images/o-fortuna/62.png';
import ft63 from '../../images/o-fortuna/63.png';

import fortuna from '../../vid/fortuna.mp4';
import './fortuna.css';	
import $ from 'jquery';
export default class Fortuna extends React.Component {
	constructor() {
		super();
		this.state = {
			
		}
	}
	jQueryCode = () => {
		//document.getElementById('fortuna-vid').setAttribute('currentTime',4000)
		//$('#fortuna-vid').prop('currentTime');
		document.getElementById('fortuna-vid').currentTime = Math.floor(Math.random() * 50);
		
		let playerRollsA;
			let fortunaPos = 0

			function mode(whichMode){
			
				if(whichMode===3)
				$('.fortuna').fadeOut();
				// $('#fortuna-glass').fadeOut();
				// showMap();
			
				// $('#main-text').text('')
				// $('#next-text').text('')
				// $('#ciorcal-glass').fadeOut()
				
				// $('#mode3').fadeIn()
				// let newTempName = $('#main-text').html();
				// let newTempName2 = $('#nameInIre').html();	
				// $('#mode3-name').html(newTempName2 +" "+newTempName )
				$("").fadeIn()
				// $('#stat-text').fadeIn()
				
				// $('#fortuna-glass').fadeOut();
				// $(stage).fadeOut()
					// $('#main-text').fadeOut();
					// $('#nameInIre').fadeOut();
					// $('#stat-text').html(" " + "teamLocation")
					// $('#avatar').fadeOut();
					$('.fortuna').fadeOut();
					// $('#fortuna-bg').fadeOut();
					// $('#fortuna-glass').fadeOut();
					// $('#fortuna-lit').fadeOut();
					// $('#team-icon').fadeOut();
					// $('#sea').fadeOut();/
				setTimeout(function(){
					// $('#splash-b').fadeIn();
			
				},1000)
				setTimeout(function(){
					// $('#storyteller-0').fadeIn();
				},3000)
				
			}
		
			// function textfade(div){
			// $(div).css('color','goldenrod')
			
				// $(div).fadeTo("slow",0.2)
				
				// $(div).css('color','purple')
			

			

				var fortuna = document.getElementById("fortuna-vid");
				fortuna.playbackRate = 2;
			}
			
			


			
			

			


	componentDidMount() {
        this.jQueryCode();
        // window.addEventListener("resize", this.resize.bind(this));
        // this.resize();
    }
	render() {
	let	currentQuestion = this.props.currentQuestion
		var ct;
		
		var playerRollsA;
		
		function forFunction() {
			localStorage.setItem('touchedVid','true')
		
			let vid = document.getElementById('fortuna-vid');
			
				$('#pO').html('')
			

				localStorage.setItem('ct',0  )

			let fortunaTime = [

				0, 0.999179 //bat
			
				, 1.947995
			
				, 2.879788
			
				, 3.833269
			
				, 4.703301
			
				, 5.700534
			
				, 6.635405
			
				, 7.607866
			
				, 8.202764
			
				, 9.502059
			
				, 10.344323
			
				, 11.205234
			
				, 11.8
			
				, 12.6
			
				, 13.55
			
				, 15.09466
			
				, 16.018195
			
				, 16.890296
			
				, 17.50953
			
				, 18.371846
			
			
				, 19.3
			
				, 20.132032
			
				, 22.00
			
				, 22.9
			
				, 23.606052
			
				, 24.606503
			
				, 25.485475
			
				, 26.37863
			
				, 27.416979
			
				, 28.322332
			
				, 29.343308
			
				, 30.273748
			
				, 31.170325
			
				, 32.113677
			
				, 33.074869
			
				, 34.029713
			
				, 35.00184
			
				, 35.985617
			
				, 36.861393
			
				, 37.821016
			
				, 38.776928
			
				, 39.680194
			
				, 40.627361
			
				, 41.562459
			
				, 42.594088
			
				, 43.466576
			
				, 44.434434
			
				, 45.371554
			
				, 46.331188
			
				, 47.309242
			
				, 48.170715
			
				, 49.122312
			
				, 50.093291
			
				, 51.067239
			
				, 51.998431
			
				, 52.946006
			
				, 53.928298
			
				, 54.839978
			
				, 55.814187
			
				, 56.746084
			
				, 57.660556
			
				, 58.640924
			
				, 59.615353
			
				, 60.537449
			
			];
			


			//☘

			let fortunaTeamsEng = [

				`Of the Bats`,
				`The Blood Thirsty`,
				`The Hidden`,
				`The Wave`,
				`The Grunter`,
				`with high performance equipment`,
				`The Obelisk`,
				`under candle light`,
				`of the cats`,
				`Shillelagh`,
				`of the Cauldron`,
				`Horseman`,
				`of the Leaves`,
				`of the Ring`,
				`The Dagger`,
				`The Cow`,
				`of the Wandering Warriors`,
				`The Enchanted Ones`,
				`The Night Branch`,
				`Of the Dark One`,
				`Marauders`,
				`The Eagles`,
				`The Stronghold`,
				`of the Tricksters`,
				`of fanatics`,
				`of the flatterer`,
				`The Rogue`,
				`branch of the Black Beetle`,
				`The Kings`,
				`of the Sea Warriors`,
				`The Fury`,
				`sapling`,
				`of kisses`,
				`of the Druids`,
				`The Rats`,
				`Morrigin Worshipers`,
				`The Spellbound`,
				`the Sharp Taloned`,
				`the Shield`,
				`Wisdom`,
				`Worshipers of the Crooked One`,
				`The Returned`,
				`The Fortunate`,
				`Golden Axe Tribe`,
				`of the Sickle`,
				`the Vigilant`,
				`the Dragon`,
				`Courage, Patience`,
				`The Plunderer	`,
				`Lancer-Fencers`,
				`Wanderer`,
				`The Swallows`,
				`of the Swans | of the Sciences`,
				`The Calm`,
				`The Steadfast`,
				`Of Mann`,
				`Triquetra`,
				`Prosperous`,
				``,
				`of the Stings`,
				`the Wolf`,
				`The Skiffs`,
				`Coders`,
				`of Herbalism`
			]
			
			let fortunaTeams = [
				`Na hÍoltóga`,
				`An Cródh-linntighe`,
				`Na Ceilte`,
				`An Tonn`,
				`An Gnúsachán`,
				`le trealamh ardfheidhme`,
				`an tOibilisc`,
				`faoi sholas coinnle`,
				`na gcat`,
				`Sail Éille`,
				`An Coire`,
				`Na Marcra`,
				`na Dilleoga`,
				`An Fáinne`,
				`An Miodóg`,
				`An Bó`,
				`Na Fánaigh`,
				`Na hUptha`,
				`Craobh na hOidhche`,
				`Na Doilbhaithe`,
				`Foghlaithe`,
				`Na hIolair`,
				`An Daingin`,
				`Na Cleasaí`,
				`na Siabhaire`,
				`na Beadaidhthe`,
				`Na Rogairí`,
				`Craobh an Daol Dubh`,
				`Na Ríthe`,
				`Fiannaí Mara`,
				`Ar an Daoraí`,
				`buinneán`,
				`Na Póga`,
				`Na Draoithe`,
				`Na Raftáin`,
				`Adhraightheora Morrígan`,
				`Na Geasaithe`,
				`Na Bir-Iongaighe`,
				`An Sciath`,
				`An Siansacht`,
				`An Clachán Crom`,
				`Na Fhillte`,
				`Na Seamhasaigh`,
				`ó Treabh an Tua Oɼga`,
				`Na Corráin`,
				`Na For-fhaire`,
				`Dragún`,
				`na Foirtileach `,
				`an tArgthóir`,
				`Lannairidhe`,
				`Fánach`,
				`Na Fáinleoga`,
				`Na hEalaí`,
				`Na Ciúine`,
				`Na Dílseachta`,
				`Na Manainnise`,
				`Snaidhm Trí rinn`,
				`Conách`,
				``,
				`Na Spriochair`,
				`Na Mictíre`,
				`Bárc`,
				`Códóir`,
				`luibheolaíocht`,

			]
			
			var pucaNa = ' '
			let teamImg;
			let thePookaOf
			
			ct = Math.floor(vid.currentTime) 
			localStorage.setItem('ct',ct  )

			setTimeout(function () { document.getElementById('fortuna-vid').playbackRate = 0.5; }, 200)
			setTimeout(function () { document.getElementById('fortuna-vid').playbackRate = 0.25; }, 400)
			
			setTimeout(function () {
				// $('#pO').html(pucaNa);
				// $('#pO').fadeIn();
				// $('#pOf').html(thePookaOf);
				// $('#pOf').fadeIn();
			}, 500)
			setTimeout(function () {
				document.getElementById('fortuna-vid').playbackRate = 0.2;
				
				
			}, 600)
			setTimeout(function () { document.getElementById('fortuna-vid').playbackRate = 0.1; }, 800)
			
			setTimeout(function () {
				$('#fortuna-vid').trigger('pause');
				
				console.log(' fortunaTime '+fortunaTime[ct] + "ct "+ct)

}, 1000)
			setTimeout(function () {
				$('#btn-a2').fadeIn()
				let whichIcon = "#imgID" + localStorage.getItem('ct');
				console.log("whichIcon"+ whichIcon)
				$(whichIcon).fadeIn().removeClass('hidden');
				hasStopped = true;
			}, 2000);
			

//irishufology.com costs 4000.
			//escapistopian 
			
			for (let i = 0; i < fortunaTime.length; i++) {
				ct = Math.floor(vid.currentTime) 

			
				if (ct >= fortunaTime[i]) {
					if (ct <= fortunaTime[i + 1]) {
						// pucaNa = fortunaTeams[i];
						thePookaOf =  ""//fortunaTeamsEng[i];
						localStorage.setItem('pucaEng',thePookaOf )
						console.log('this ft...' + fortunaTime[ct] + "   i "+i  )
						console.log('this ft...' + pucaNa + " " + thePookaOf)
						// ct = i;
						
					}
					
				}
			
			
			
			}
			
			
			
			if (localStorage.getItem("isPaused") === true) {
				setTimeout(function () {

				localStorage.setItem("isPaused",false)

				 },1000)
			}


		}
		
		function restartFortuna() {
			document.getElementById('fortuna-vid').play();
			document.getElementById('fortuna-vid').playbackRate = 2;
			$('.team-icon').fadeOut()
			setTimeout(function () {
				$('#pO').html("");
				$('#pOf').html("");
			}, 2000)
		 }
		
		
	let hasStopped = false;
		return (
			
			<div className="fortuna">
				<video id="fortuna-vid"  autostart="true" autoPlay={true} loop={true} fluid="false" src={fortuna} type={this.props.type} onTouchEnd={function (){ forFunction() }}
		
				/>
				{/* <h1 id="pO"></h1> */}
				<div className="team-icon-container">
				<img id="imgID0" onTouchEnd={restartFortuna} className="team-icon" src={ft0} alt="" />
				<img id= "imgID1"className="team-icon" src={ft1} alt="assorted icons from gameicons.net" />
				<img id= "imgID2"className="team-icon" onTouchEnd={restartFortuna}src={ft2} alt="" />
				<img id= "imgID3"className="team-icon" onTouchEnd={restartFortuna}src={ft3} alt="" />
				<img id= "imgID4"className="team-icon" onTouchEnd={restartFortuna}src={ft4} alt="" />
				<img id= "imgID5"className="team-icon" onTouchEnd={restartFortuna}src={ft5} alt="" />
				<img id= "imgID6"className="team-icon" onTouchEnd={restartFortuna}src={ft6} alt="" />
				<img id= "imgID7"className="team-icon" onTouchEnd={restartFortuna}src={ft7} alt="" />
				<img id= "imgID8"className="team-icon" onTouchEnd={restartFortuna}src={ft8} alt="" />
				<img id= "imgID9"className="team-icon" onTouchEnd={restartFortuna}src={ft9} alt="" />
				<img id="imgID10"className="team-icon" onTouchEnd={restartFortuna}src={ft10}  alt="" />
				<img id="imgID11"className="team-icon" onTouchEnd={restartFortuna}src={ft11}  alt="" />
				<img id="imgID12"className="team-icon" onTouchEnd={restartFortuna}src={ft12}  alt="" />
				<img id="imgID13"className="team-icon" onTouchEnd={restartFortuna}src={ft13}  alt="" />
				<img id="imgID14"className="team-icon" onTouchEnd={restartFortuna}src={ft14}  alt="" />
				<img id="imgID15"className="team-icon" onTouchEnd={restartFortuna}src={ft15}  alt="" />
				<img id="imgID16"className="team-icon" onTouchEnd={restartFortuna}src={ft16}  alt="" />
				<img id="imgID17"className="team-icon" onTouchEnd={restartFortuna}src={ft17}  alt="" />
				<img id="imgID18"className="team-icon" onTouchEnd={restartFortuna}src={ft18}  alt="" />
				<img id="imgID19"className="team-icon" onTouchEnd={restartFortuna}src={ft19}  alt="" />
				<img id="imgID20"className="team-icon" onTouchEnd={restartFortuna}src={ft20}  alt="" />
				<img id="imgID21"className="team-icon" onTouchEnd={restartFortuna}src={ft21}  alt="" />
				<img id="imgID22"className="team-icon" onTouchEnd={restartFortuna}src={ft22}  alt="" />
				<img id="imgID23"className="team-icon" onTouchEnd={restartFortuna}src={ft23}  alt="" />
				<img id="imgID24"className="team-icon" onTouchEnd={restartFortuna}src={ft24}  alt="" />
				<img id="imgID25"className="team-icon" onTouchEnd={restartFortuna}src={ft25}  alt="" />
				<img id="imgID26"className="team-icon" onTouchEnd={restartFortuna}src={ft26}  alt="" />
				<img id="imgID27"className="team-icon" onTouchEnd={restartFortuna}src={ft27}  alt="" />
				<img id="imgID28"className="team-icon" onTouchEnd={restartFortuna}src={ft28}  alt="" />
				<img id="imgID29"className="team-icon" onTouchEnd={restartFortuna}src={ft29}  alt="" />
				<img id="imgID30"className="team-icon" onTouchEnd={restartFortuna}src={ft30}  alt="" />
				<img id="imgID31"className="team-icon" onTouchEnd={restartFortuna}src={ft31}  alt="" />
				<img id="imgID32"className="team-icon" onTouchEnd={restartFortuna}src={ft32}  alt="" />
				<img id="imgID33"className="team-icon" onTouchEnd={restartFortuna}src={ft33}  alt="" />
				<img id="imgID34"className="team-icon" onTouchEnd={restartFortuna}src={ft34}  alt="" />
				<img id="imgID35"className="team-icon" onTouchEnd={restartFortuna}src={ft35}  alt="" />
				<img id="imgID36"className="team-icon" onTouchEnd={restartFortuna}src={ft36}  alt="" />
				<img id="imgID37"className="team-icon" onTouchEnd={restartFortuna}src={ft37}  alt="" />
				<img id="imgID38"className="team-icon" onTouchEnd={restartFortuna}src={ft38}  alt="" />
				<img id="imgID39"className="team-icon" onTouchEnd={restartFortuna}src={ft39}  alt="" />
				<img id="imgID40"className="team-icon" onTouchEnd={restartFortuna}src={ft40}  alt="" />
				<img id="imgID41"className="team-icon" onTouchEnd={restartFortuna}src={ft41}  alt="" />
				<img id="imgID42"className="team-icon" onTouchEnd={restartFortuna}src={ft42}  alt="" />
				<img id="imgID43"className="team-icon" onTouchEnd={restartFortuna}src={ft43}  alt="" />
				<img id="imgID44"className="team-icon" onTouchEnd={restartFortuna}src={ft44}  alt="" />
				<img id="imgID45"className="team-icon" onTouchEnd={restartFortuna}src={ft45}  alt="" />
				<img id="imgID46"className="team-icon" onTouchEnd={restartFortuna}src={ft46}  alt="" />
				<img id="imgID47"className="team-icon" onTouchEnd={restartFortuna}src={ft47}  alt="" />
				<img id="imgID48"className="team-icon" onTouchEnd={restartFortuna}src={ft48}  alt="" />
				<img id="imgID49"className="team-icon" onTouchEnd={restartFortuna}src={ft49}  alt="" />
				<img id="imgID50"className="team-icon" onTouchEnd={restartFortuna}src={ft50}  alt="" />
				<img id="imgID51"className="team-icon" onTouchEnd={restartFortuna}src={ft51}  alt="" />
				<img id="imgID52"className="team-icon" onTouchEnd={restartFortuna}src={ft52}  alt="" />
				<img id="imgID53"className="team-icon" onTouchEnd={restartFortuna}src={ft53}  alt="" />
				<img id="imgID54"className="team-icon" onTouchEnd={restartFortuna}src={ft54}  alt="" />
				<img id="imgID55"className="team-icon" onTouchEnd={restartFortuna}src={ft55}  alt="" />
				<img id="imgID56"className="team-icon" onTouchEnd={restartFortuna}src={ft56}  alt="" />
				<img id="imgID57"className="team-icon" onTouchEnd={restartFortuna}src={ft57}  alt="" />
				<img id="imgID58"className="team-icon" onTouchEnd={restartFortuna}src={ft58}  alt="" />
				<img id="imgID59"className="team-icon" onTouchEnd={restartFortuna}src={ft59}  alt="" />
				<img id="imgID60"className="team-icon" onTouchEnd={restartFortuna}src={ft60}  alt="" />
				<img id="imgID61"className="team-icon" onTouchEnd={restartFortuna}src={ft61}  alt="" />
				<img id="imgID62"className="team-icon" onTouchEnd={restartFortuna}src={ft62}  alt="" />
				<img id="imgID63"className="team-icon" onTouchEnd={restartFortuna}src={ft63}  alt="" />
				</div>
			</div>
		)
	}

}

