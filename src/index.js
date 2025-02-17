import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PlayerProvider } from'./components/player-context/playerContext'
import App from './App';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dunaree from './components/locations/ulster/Cavan/dunaree';

import GameOver from './components/game-over/GameOver';
import Baile from './components/locations/baile';
import ChessLike from './components/ChessLike/chessLike2';
import PucaLoic2 from './components/ChessLike/chessLike3';
import PucaChase0 from './components/pucaChase/pucaChase0';
import BallyGamBoy from './components/BallyGamBoy/BallyGamBoy-with-rot';
import BallyGamWest from './components/BallyGamBoy/BallyGamWest';
import BallyGamBoat from './components/BallyGamBoat/BallyGamBoat';
import FairyLand from './components/FairyLand/FairyLand';
import BallyTown from './components/BallyTown/BallyTown';
import BallyNeo from './components/BallyNeo/BallyNeo';
import Poem0 from './components/poem-0/poem-0';
import BallyMurphius from './components/BallyMurphius/BallyMurphius';
import Kilcash from './components/locations/connacht/Galway/kilcash';
import Cave0 from './components/locations/cave0';
import Nagels from './components/locations/munster/Cork/nagles';
import Arklow from './components/locations/leinster/Wicklow/arklow';
import CrystalCaves0 from './components/locations/leinster/Wicklow/CrystalCaves0';
import GenericLocation from './components/GenericLocations/generic-locations';
import {Rings4} from './components/Rings/Rings4';
import {Rings5} from './components/Rings/Rings5';
import {fenianBranches} from './components/Rings/fenianBranches';

               
const ChessLikeWrapper = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // State to track loading


  useEffect(() => {

    
    // This effect runs once when the component mounts
    const timeoutId = setTimeout(() => {
      setIsLoaded(true); // Set to true after 2 seconds to simulate loading

      // Set shouldRefresh to true after 2 seconds
      // setShouldRefresh(true);
    }, 2000);

    // Cleanup function to clear the timeout in case the component unmounts
    return () => clearTimeout(timeoutId);

    if (!isLoaded) {
      // return <LoadingScene />; // Show loading scene until assets are loaded
    }
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <>
      <PlayerProvider>
        <Switch>
        <Route path="/pucachase0" render={() => (
            <>
              <PucaChase0 />
              {shouldRefresh && <PucaChase0 />}
            </>

          )}
           />

          <Route path="/pucaloic" render={() => (
            <>
              <ChessLike />
              {shouldRefresh && <ChessLike />}
            </>

          )}
           />

<Route path="/pucaloic2" render={() => (
            <>
              <PucaLoic2 />
              {shouldRefresh && <PucaLoic2 />}
            </>

          )}
           />

<Route path="/ulster/cavan/dunaree" render={() => (
            <>
              <Dunaree />
              {shouldRefresh && <Dunaree />}
            </>

          )}
           />
<Route path="/cave0"component={Cave0}/>
           
      <Route path="/rings4" component={Rings4 } />
      <Route path="/rings5" component={Rings5 } />
      <Route path="/rings8" component={fenianBranches } />
      <Route path="/baile" component={Baile } />



      <Route path="/gameOver" component={GameOver} />
      <Route path="/ballygamboy" component={BallyGamBoy} />
      <Route path="/ballygamwest" component={BallyGamWest} />
      <Route path="/ballygamboat" component={BallyGamBoat} />
      <Route path="/fairyland" component={FairyLand} />
      <Route path="/ballytown" component={BallyTown} />
      <Route path="/ballyneo" component={BallyNeo} />
      <Route path="/poem-0" component={Poem0} />
      <Route path="/ballymurphius" component={BallyMurphius} />

      <Route path="/connacht/galway/kilcash"component={Kilcash}/>
<Route path="/connacht/galway/carraroe"component={GenericLocation}/>
<Route path="/connacht/galway/pollapuca"component={GenericLocation}/>
<Route path="/connacht/galway/spiddal"component={GenericLocation}/>
<Route path="/connacht/galway/inismaan"component={GenericLocation}/>
<Route path="/connacht/leitrim/drumshanbo"component={GenericLocation}/>
<Route path="/connacht/leitrim/aughnasheelan"component={GenericLocation}/>
<Route path="/connacht/leitrim/feenagh"component={GenericLocation}/>
<Route path="/connacht/leitrim/dromod"component={GenericLocation}/>
<Route path="/connacht/leitrim/garvagh"component={GenericLocation}/>
<Route path="/connacht/mayo/killala"component={GenericLocation}/>
<Route path="/connacht/mayo/castlebar"component={GenericLocation}/>
<Route path="/connacht/mayo/newport"component={GenericLocation}/>
<Route path="/connacht/mayo/killary"component={GenericLocation}/>
<Route path="/connacht/mayo/cong"component={GenericLocation}/>
<Route path="/connacht/mayo/lissatava"component={GenericLocation}/>
<Route path="/connacht/roscommon/cloodfad"component={GenericLocation}/>
<Route path="/connacht/roscommon/ballintober"component={GenericLocation}/>
<Route path="/connacht/roscommon/bofin"component={GenericLocation}/>
<Route path="/connacht/roscommon/scramog"component={GenericLocation}/>
<Route path="/connacht/roscommon/boderg"component={GenericLocation}/>
<Route path="/connacht/roscommon/cornafulla "component={GenericLocation}/>
<Route path="/connacht/sligo/bellanagarrigeeny"component={GenericLocation}/>
<Route path="/connacht/sligo/mullaghmore"component={GenericLocation}/>
<Route path="/connacht/sligo/keshcorran"component={GenericLocation}/>
<Route path="/connacht/sligo/eabha"component={GenericLocation}/>
<Route path="/connacht/sligo/ballydawley"component={GenericLocation}/>
<Route path="/connacht/sligo/tobercurry"component={GenericLocation}/>
<Route path="/leinster/dublin/finglas"component={GenericLocation}/>
<Route path="/leinster/dublin/clondalkin"component={GenericLocation}/>
<Route path="/leinster/dublin/clontarf"component={GenericLocation}/>
<Route path="/leinster/dublin/howth"component={GenericLocation}/>
<Route path="/leinster/dublin/dun-laoghaire"component={GenericLocation}/>
<Route path="/leinster/dublin/dalkey"component={GenericLocation}/>
<Route path="/leinster/westmeath/collinstown"component={GenericLocation}/>
<Route path="/leinster/westmeath/raharney"component={GenericLocation}/>
<Route path="/leinster/westmeath/tullynally"component={GenericLocation}/>
<Route path="/leinster/westmeath/corlis"component={GenericLocation}/>
<Route path="/leinster/westmeath/kilbeggan"component={GenericLocation}/>
<Route path="/leinster/westmeath/mullingar"component={GenericLocation}/>
<Route path="/leinster/carlow/ballymurphy"component={GenericLocation}/>
<Route path="/leinster/carlow/Hackerstown"component={GenericLocation}/>
<Route path="/leinster/carlow/borris"component={GenericLocation}/>
<Route path="/leinster/carlow/myshall"component={GenericLocation}/>
<Route path="/leinster/carlow/kildavin"component={GenericLocation}/>
<Route path="/leinster/carlow/kilderrig"component={GenericLocation}/>
<Route path="/leinster/kildare/Carbury"component={GenericLocation}/>
<Route path="/leinster/kildare/Sallins"component={GenericLocation}/>
<Route path="/leinster/kildare/allenwood"component={GenericLocation}/>
<Route path="/leinster/kildare/maynooth"component={GenericLocation}/>
<Route path="/leinster/kildare/the-curragh"component={GenericLocation}/>
<Route path="/leinster/kildare/leixlip"component={GenericLocation}/>
<Route path="/leinster/kilkenny/chuffys-grange"component={GenericLocation}/>
<Route path="/leinster/kilkenny/thomastown"component={GenericLocation}/>
<Route path="/leinster/kilkenny/windgap"component={GenericLocation}/>
<Route path="/leinster/kilkenny/dungarvin"component={GenericLocation}/>
<Route path="/leinster/kilkenny/pilltown"component={GenericLocation}/>
<Route path="/leinster/kilkenny/slieverue"component={GenericLocation}/>
<Route path="/leinster/laois/errill"component={GenericLocation}/>
<Route path="/leinster/laois/durrow"component={GenericLocation}/>
<Route path="/leinster/laois/ballyfin"component={GenericLocation}/>
<Route path="/leinster/laois/cromaboo"component={GenericLocation}/>
<Route path="/leinster/laois/portarlington"component={GenericLocation}/>
<Route path="/leinster/laois/borris-in-ossory"component={GenericLocation}/>
<Route path="/leinster/longford/lisbrack"component={GenericLocation}/>
<Route path="/leinster/longford/mostrim"component={GenericLocation}/>
<Route path="/leinster/longford/granard"component={GenericLocation}/>
<Route path="/leinster/longford/cloondara"component={GenericLocation}/>
<Route path="/leinster/longford/moydow"component={GenericLocation}/>
<Route path="/leinster/longford/carrigboy"component={GenericLocation}/>
<Route path="/leinster/louth/dundalk"component={GenericLocation}/>
<Route path="/leinster/louth/greenore"component={GenericLocation}/>
<Route path="/leinster/louth/clogherhead]"component={GenericLocation}/>
<Route path="/leinster/louth/ardee"component={GenericLocation}/>
<Route path="/leinster/louth/puckstown"component={GenericLocation}/>
<Route path="/leinster/louth/castle-bellingham"component={GenericLocation}/>
<Route path="/leinster/offaly/clonmacnoise"component={GenericLocation}/>
<Route path="/leinster/offaly/edenderry"component={GenericLocation}/>
<Route path="/leinster/offaly/birr"component={GenericLocation}/>
<Route path="/leinster/offaly/kinnitty"component={GenericLocation}/>
<Route path="/leinster/offaly/rathangan"component={GenericLocation}/>
<Route path="/leinster/offaly/shinrone"component={GenericLocation}/>
<Route path="/leinster/meath/"component={GenericLocation}/>
<Route path="/leinster/meath/rathcairn"component={GenericLocation}/>
<Route path="/leinster/meath/kilbride"component={GenericLocation}/>
<Route path="/leinster/meath/tara"component={GenericLocation}/>
<Route path="/leinster/meath/ballinabrackey"component={GenericLocation}/>
<Route path="/leinster/meath/fairyhouse"component={GenericLocation}/>
<Route path="/leinster/wexford/killinierin"component={GenericLocation}/>
<Route path="/leinster/wexford/enniscorthy"component={GenericLocation}/>
<Route path="/leinster/wexford/pollaphuca"component={GenericLocation}/>
<Route path="/leinster/wexford/mullinagore"component={GenericLocation}/>
<Route path="/leinster/wexford/owenduff"component={GenericLocation}/>
<Route path="/leinster/wexford/duncormick"component={GenericLocation}/>
<Route path="/leinster/wicklow/poll-a-puca"component={GenericLocation}/>     <Route path="/leinster/wicklow/grey-stones"component={GenericLocation}/>
<Route path="/leinster/wicklow/shillelagh"component={GenericLocation}/>
<Route path="/leinster/wicklow/donard"component={GenericLocation}/>
<Route path="/leinster/wicklow/arklow"component={Arklow}/>
<Route path="/leinster/wicklow/CrystalCaves0"component={CrystalCaves0}/>
<Route path="/leinster/wicklow/avoca"component={GenericLocation}/>
<Route path="/ulster/antrim/rathlin"component={GenericLocation}/>
<Route path="/ulster/antrim/dervock"component={GenericLocation}/>
<Route path="/ulster/antrim/ahoghill"component={GenericLocation}/>
<Route path="/ulster/antrim/cairn-maeve"component={GenericLocation}/>
<Route path="/ulster/antrim/carrickfergus"component={GenericLocation}/>
<Route path="/ulster/antrim/belfast"component={GenericLocation}/>
<Route path="/ulster/donegal/dunaff"component={GenericLocation}/>
<Route path="/ulster/donegal/ballyederowen"component={GenericLocation}/>
<Route path="/ulster/donegal/derryveagh"component={GenericLocation}/>
<Route path="/ulster/donegal/letterkenny"component={GenericLocation}/>
<Route path="/ulster/donegal/ballybofey"component={GenericLocation}/>
<Route path="/ulster/donegal/croaghgorm"component={GenericLocation}/>
<Route path="/ulster/fermanagh/paiteago"component={GenericLocation}/>
<Route path="/ulster/fermanagh/garrison"component={GenericLocation}/>
<Route path="/ulster/fermanagh/lisdearog"component={GenericLocation}/>
<Route path="/ulster/fermanagh/scribbagh"component={GenericLocation}/>
<Route path="/ulster/fermanagh/cethleann"component={GenericLocation}/>
<Route path="/ulster/derry/derry"component={GenericLocation}/>
<Route path="/ulter/derry/limavady"component={GenericLocation}/>
<Route path="/ulter/derry/maghera"component={GenericLocation}/>
<Route path="/ulter/derry/moneymore"component={GenericLocation}/>
<Route path="/ulter/derry/aghadowey"component={GenericLocation}/>
<Route path="/ulter/derry/shanmullagh"component={GenericLocation}/>
<Route path="/ulster/down/lurgan"component={GenericLocation}/>
<Route path="/ulster/down/lisburn"component={GenericLocation}/>
<Route path="/ulster/down/castlereagh"component={GenericLocation}/>
<Route path="/ulster/down/horeabbey"component={GenericLocation}/>
<Route path="/ulster/down/downpatrick"component={GenericLocation}/>
<Route path="/ulster/down/kilkeel"component={GenericLocation}/>
<Route path="/ulster/armagh/scotch-street"component={GenericLocation}/>
<Route path="/ulster/armagh/navan-fort"component={GenericLocation}/>
<Route path="/ulster/armagh/newtown"component={GenericLocation}/>
<Route path="/ulster/armagh/portadown"component={GenericLocation}/>
<Route path="/ulster/armagh/milltown"component={GenericLocation}/>
<Route path="/ulster/armagh/lislea"component={GenericLocation}/>
<Route path="/ulster/monaghan/emyvale"component={GenericLocation}/>
<Route path="/ulster/monaghan/clones"component={GenericLocation}/>
<Route path="/ulster/monaghan/rossmore"component={GenericLocation}/>
<Route path="/ulster/monaghan/scotshouse"component={GenericLocation}/>
<Route path="/ulster/monaghan/Creaghanroe"component={GenericLocation}/>
<Route path="/munster/clare/bunratty"component={GenericLocation}/>
<Route path="/munster/clare/black-head"component={GenericLocation}/>
<Route path="/munster/clare/feighroe"component={GenericLocation}/>
<Route path="/munster/clare/tullagh"component={GenericLocation}/>
<Route path="/munster/clare/kilruch"component={GenericLocation}/>
<Route path="/munster/clare/labasheeda"component={GenericLocation}/>
<Route path="/munster/kerry/cahersiveen"component={GenericLocation}/>
<Route path="/munster/kerry/dingle"component={GenericLocation}/>
<Route path="/munster/kerry/fairy-glen"component={GenericLocation}/>
<Route path="/munster/kerry/sliabh-mis"component={GenericLocation}/>
<Route path="/munster/kerry/black-stacks"component={GenericLocation}/>
<Route path="/munster/kerry/sneem"component={GenericLocation}/>
<Route path="/munster/cork/buttevant"component={GenericLocation}/>
<Route path="/munster/cork/nagels"component={Nagels}/>
<Route path="/munster/cork/glenville"component={GenericLocation}/>
<Route path="/munster/cork/bealnablath"component={GenericLocation}/>
<Route path="/munster/cork/kinsale"component={GenericLocation}/>
<Route path="/munster/cork/skibereen"component={GenericLocation}/>
<Route path="/munster/limerick/poallaskenry"component={GenericLocation}/>
<Route path="/munster/limerick/poulaphouca"component={GenericLocation}/>
<Route path="/munster/limerick/castleconnell"component={GenericLocation}/>
<Route path="/munster/limerick/ashford"component={GenericLocation}/>
<Route path="/munster/limerick/an-fheothanach"component={GenericLocation}/>
<Route path="/munster/limerick/bruree"component={GenericLocation}/>
<Route path="/munster/tipperary/roscrea"component={GenericLocation}/>
<Route path="/munster/tipperary/thurles"component={GenericLocation}/>
<Route path="/munster/tipperary/rosegreen"component={GenericLocation}/>
<Route path="/munster/tipperary/slievenamo"component={GenericLocation}/>
<Route path="/munster/tipperary/clonmel"component={GenericLocation}/>
<Route path="/munster/tipperary/nine-mile-house"component={GenericLocation}/>
<Route path="/munster/tipperary/comeragh-mountains"component={GenericLocation}/>
<Route path="/munster/tipperary/ballyduff"component={GenericLocation}/>
<Route path="/munster/tipperary/tallow"component={GenericLocation}/>
<Route path="/munster/tipperary/rathsasseragh"component={GenericLocation}/>
<Route path="/munster/tipperary/dungarvan"component={GenericLocation}/>
<Route path="/munster/tipperary/nenagh"component={GenericLocation}/>



      
      <Route path="/" component={App} />
        </Switch>
      </PlayerProvider>
    </>
  );
};

ReactDOM.render(
  <Router>
    <ChessLikeWrapper />
  </Router>,
  document.getElementById('root')
);
