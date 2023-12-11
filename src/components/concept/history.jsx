/* eslint-disable no-sparse-arrays */
import $ from 'jquery'
var slide = 0;
var firstPoemSlide = 7;
var lastPoemSlide = 11;
let lastSlide = 21;
let spencer1 = 19;
let spencer2 = 19;







// import TypeWriting from 'typewriting'?;
let textBottom = [

    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,

    `Fadó fadó...`,

    `mac`,
    `file`,
    `oileán`,

    `stoirm`,
    `Dán Amergín`,

    `comhrac aonair`,
    `<img src="../img/About1/eye.png">`,


    `1169 AD`,
    `Strong Bow`,
    `An Pháil`,
    `1580 AD`,
    `A Veue of the present state of Irelande`,
    `A Veue of the present state of Irelande`,

    `<span style="font-family:aonchlo"><b>Uladh</b></span>`,
    `<span style="font-family:aonchlo"><b>An Teanga</b></span>`,
    `<img src="../img/About1/seabhac.png">`,
    `<img src="../img/About1/seabhac.png">`,




];

let topTeacs0 = [

    `Fadó fado...`,
    `Ón treabh Ibírach 'Míl Espáine'
     a dtagann na Gael,
     de réir na finscéalíochta. 
    `,
    `Bhí seachtar ag Galamh mac Bile mac Brath Míl Espáine,`,

    `File agus draoí dunne den seachtar,<br/> 
    Amergin Glúingel Míl Espáine.`,

    `Thóg Amergín ar aistear mara go hOileann na Tuaithe Dé Danann a muintir.`,

    `Chas draoithe Dé Danann na Mílaoisigh síar le stoirm dríochta`,

    `Ach bhí bua na filíochta ag Amergin...`,
    `<span style="font-family:aonchlo;font-weight: 900;">Am gaeth i m-muir <br/>
Am tond trethan<br/>
Am fuaim mara...</span>
`,
    `<span style="font-family:aonchlo;font-weight: 900;">Am dam seċt ndirend <br/>
Am séig i n-aill<br/>
Am dér gréne<br/>
Am cain lubai...</span>
`,

    `<span style=" font-family:aonchlo;font-weight: 900;">Am bri danae<br/>
Am bri i fodb fras feoċtu<br/>
Am dé delbas do ċind codnu...</span>
`,
    `<span style=" font-family:aonchlo;font-weight: 900;">...Cáinte im gai<br/> 
cainte gaiṫe.</span>
`,

`
Chiúnaigh an stoirm.
Bris na Míl Espáinaigh 
ar forsaí Dé Dannan.
`,
    `Cúlaigh na Túithe 
agus lonnaigh na Mílaoisigh in Éireann.
Bin tús cíannta Gaelach, de réir an finscéalíocht.`,

    `I <span style="color:palegoldenrod">1169 AD</span>, Lorg Rí theistithe Diarmait Mac Murchada cabhair galamhas Normánach chun éirí amach Laighean a chuir faoi chois.`
    ,
    `Tapaidh Anraí II an deis úinéireacht a maíomh ar na ionnaíthe treascartha. Sin mar a thosnaigh 800 blíain Sasannachas in Éireann.`
    ,

    `In aineoinn fachtasíocht mílata na cheadta blíana,
Faoí 1500AD, Ní raibh ríal Sassana ach  i bheidhm tímpeal  caisleán Átha Cliath.`
    ,

    `
<span style="color:palegoldenrod">1580AD</span> <br/>
Slad Tiarna Grey de Wilton forsaí Gaelach Idálach agus Spánach i Ard na Caithne in Corca Dhuibhne.`
    ,
    `Bhí an file Edmund Spencer i finné an slad. Mínigh sé dá Bhanríonn  :`
    ,

    `"Soe that the speach being Irish, 
the hart must needes be Irishe; 
for out of the aboundance of the hart, 
the tonge speaketh"<br/>
<h6>A Veue of The Present State of Ireland</h6>`
    ,
    `Briseadh ar daingeannacha na Gael i <span style="color:goldenrod">1607AD</span>.
    Díbríodh na Taoisaigh, 
    agus bin an ord ársa Gaelach 
   briste ar deireadh.`,

    `Tá rogha Gaelach aisghabhtha againn ar bhonn prionsabal oideachas agus dlí`,
    `But what of the heart when the tongue is Gaelic?`

];
let topTeacs1 = [
    `Vor langer, langer Zeit...<br/><br/> <p id="deepl">übersetzt von Deepl-Translator</p>`,
    `
    Der Legende nach,
    Gälische Menschen steigen ab
    von einem iberischen Stamm
    genannt die Milesianer. 
    `,
    `Breogán von Brath
    von Bile Galamh Míl Espáine
    hatte sieben Söhne 
    `,
    ` Einer von ihnen
      hieß
    <br/>Amergin<br/>
    der Hellen Knie*<br/>
    Soldat von Spanien <br/>
    <br/>
<h5 > *Geburt des Liedes </h5>
    
    `,
    `Amergin 
   und die Milesier
   auf der Reise zur Insel
    der Stamm der Dé Dannan`,
    `Die Druiden von Dé Danann 
    hob einen magischen Sturm 
     
    Expedition Amergin vor dem Erreichen des Landes. 
    `,
    `Aber Amergin hatte die Kraft der Poesie`,

    `<h5>Ich bin der Wind, der auf dem Meer atmet<br/>
  Ich bin die Welle des Ozeans<br/>
  Ich bin das Murmeln der Wogen</h5>`,

    `<h5>Ich bin Hirsch von sieben Zinken<br/>
  Ich bin ein Falke auf einer Klippe<br/>
  Ich bin ein Strahl der Sonne<br/>
  Ich bin die schönste aller Pflanzen</h5>`,

    , `<h5>Ich bin ein Wort der Wissenschaft<br/>
   Ich bin die Spitze der Lanze der Schlacht</h5>`,
    `<h5>...(Ich bin) ein Lied auf einem Speer<br/>
   ein Zauber der Winde.</h5>`
    ,
    `Die Könige von Dé Danann 
wurden in Einzelkampf getötet.
 von den Söhnen von Míl Espáine.`

    ,

    `Der Dé Danann 
zog sich in die Erde zurück,
und seit Tausenden von Jahren 
Gälische Zivilisation 
blühte in Irland auf.`
    ,

    `In <span style="color:white">1169 CE</span>, forderte der abgesetzte König Diarmait Mac Murchada normannische Söldner auf, die Rebellion in Leinster niederzuschlagen.`
    ,
    `König Heinrich II. von England benutzte dies, um die eroberten Städte zu erklären 
Kronland. So begannen 800 Jahre englischer Herrschaft in Irland.`
    ,

    `Um 1500 n. Chr., trotz jahrhundertelanger militärischer Kampagnen,
Englisches Recht existierte nur rund um das Dubliner Schloss.`
    ,

    `
Belagerte gälische italienische und spanische Truppen wurden bei Ard na Caithne in Corca Dhuibhne von Lord Grey de Wilton abgeschlachtet.`
    ,
    `Nach dem 'Grey faith'-Massaker schrieb Edmund Spencer an Königin Elizebeth und erklärte, warum die Iren sich weiterhin der englischen Herrschaft widersetzten: `
    ,


    `"Sooo, dass die Rede irisch ist, 
der Hirsch muss Irishe sein; 
denn aus dem Überfluss des Hirsches 
die Tonge spricht"<br/>
<h6>Eine Warteschlange des gegenwärtigen Staates Irland</h6>`
    ,
    `Die letzten Hochburgen des gälischen Irland fielen, und als die letzten Ulster Häuptlinge ins Exil gezwungen wurden, endete die gälische Ordnung.`,


    `Edmund Spencer lag falsch.
    Das Herz kann irisch sein, während die Zunge Englisch spricht. 

    `,
    `Aber wenn die Zunge gälisch ist, was sagt das Herz?

    `


]
let topTeacs3 = [
    

        `Long long ago...`,
        `
        Według legendy,
        Gaeliccy ludzie wywodzą się
        od iberyjskiego plemienia
        zwanego Milesianami. 
        `,
        `Breogán syn Brath
        syn Bile Galamh Míl Espáine
        miał siedmiu synów 
        `,
        `Jeden z nich
          został nazwany
        <br/>Amergin <br/>
        z Jasnych Kolan<span">*</span><br/>
        Żołnierz Hiszpanii <br/>.
        <br/>
    <h5 > *Rodziny Pieśni </h5>
        
        `,
        `Amergin 
       i Milezyjczycy
       podróżowali na wyspę
        plemienia Dé Dannan.`,
        `Druidzi z Dé Danann 
        wywołali magiczną burzę.
        by powstrzymać ekspedycję Amergina 
        ekspedycji Amergina przed dotarciem do lądu. 
        `,
        `Ale Amergín miał moc poezji`,
    
        `"Jestem wiatrem, który oddycha na morzu
      Jestem falą oceanu<br/>
      Jestem szmerem fal`,
    
        `"Jestem jeleniem o siedmiu zębach
      Jestem jastrzębiem na klifie<br/>
      Jestem promieniem słońca<br/>
      Jestem najpiękniejszą z roślin`,
    
        `Jestem słowem nauki<br/>
       Jestem czubkiem lancy bojowej`,
        `...(jestem) Pieśnią na włóczni<br/>
       zaklęciem wiatrów.`
        ,
        `Królowie Dé Danann 
    zostali zabici w pojedynczej walce
     przez synów Míla Espáine'a.`
    
        ,
    
        `"Dé Danannowie 
    wycofali się w głąb ziemi,
    i przez tysiące lat 
    cywilizacja gaelicka 
    rozkwitała w Irlandii.`
        ,
    
        `W <span style="color:white">1169 CE</span>, obalony król Diarmait Mac Murchada poprosił normańskich najemników o stłumienie rebelii w Leinsterze.`
        ,
        `Król Anglii Henryk II wykorzystał to do ogłoszenia podbitych miast 
    ziemiami koronnymi. Tak zaczęło się 800 lat angielskiego panowania w Irlandii.`
        ,
    
        `Do roku 1500, pomimo wieków kampanii wojskowych,
    angielskie prawo istniało tylko wokół zamku w Dublinie.`
        ,
    
        `
    Oblężone gaelickie siły włoskie i hiszpańskie zostały wyrżnięte w Ard na Caithne w Corca Dhuibhne, przez lorda Grey de Wilton.`
        ,
        `Po masakrze "Szarej wiary", Edmund Spencer napisał do królowej Elizebeth, i wyjaśnił dlaczego Irlandczycy wciąż opierają się angielskiemu panowaniu:`
        ,
    
    
        `"Tak, że mowa jest irlandzka, 
    serce musi być irlandzkie; 
    for out of the aboundance of the hart, 
    the tonge speaketh"<br/>.
    <h6>A Veue of The Present State of Ireland</h6>`
        ,
        `Ostatnie twierdze gaelickiej Irlandii upadły, a ostatni wodzowie Ulsteru zostali zmuszeni do wygnania, tak zakończył się gaelicki porządek`,
    
    
        `Edmund Spencer się mylił.
        Serce może być irlandzkie, podczas gdy język mówi po angielsku. 
    
        `,
        `Gdy język jest gaelicki, co mówi serce?
        
       
        </p> </span>`,
    
    
    
    
    
    
    
    
    `Przetłumaczono z www.DeepL.com/Translator (wersja darmowa)`


];

let topTeacs2 = [

    `Long long ago...`,
    `
    According to legend,
    Gaelic people descend
    from an Iberian tribe
    called the Milesians. 
    `,
    `Breogán son of Brath
    son of Bile Galamh Míl Espáine
    had seven sons 
    `,
    `    One of whom
      was named
    <br/>Amergin <br/>
    of the Bright Knees<span ">*</span><br/>
    Soldier of Spain <br/>
    <br/>
<h5 >    *Birth of Song  </h5>
    
    `,
    `Amergin 
   and the Milesians
   voyaged to the island of
    the Dé Dannan tribe.`,
    `The druids of Dé Danann 
    raised a magical storm
    to keep Amergín’s 
    expedition from reaching land. 
    `,
    `But Amergín had powers of poetry`,

    `I am the wind which breaths upon the sea<br/>
  I am the wave of the ocean<br/>
  I am the murmur of the billows`,

    `I am Stag of Seven Tines<br/>
  I am a Hawk on a Cliff<br/>
  I am a beam of the sun<br/>
  I am the fairest of plants`,

    `I am a word of science<br/>
   I am the point of the lance of battle`,
    `...(I am) a Song on a Spear<br/>
   an Enchantment of Winds.`
    ,
    `The kings of Dé Danann 
were killed in single combat
 by the sons of Míl Espáine.`

    ,

    `The Dé Danann 
retreated into the Earth,
and for thousands of years 
Gaelic civilization 
flourished in Ireland.`
    ,

    `In <span style="color:white">1169 CE</span>, deposed King Diarmait Mac Murchada solicited Norman Mercenaries to quell rebellion in Leinster.`
    ,
    `King Henry II of England used this to declare the conquered cities 
crown-land. So began 800 years of English rule in Ireland.`
    ,

    `By 1500 AD, despite centuries of military campaigning,
English law existed only around Dublin Castle.`
    ,

    `
Beseiged Gaelic Italian and Spanish forces were slaughtered at Ard na Caithne in Corca Dhuibhne, by lord Grey de Wilton.`
    ,
    `After the 'Grey faith' massacre, Edmund Spencer wrote to Queen Elizebeth, and explained why the Irish kept resisting English rule:`
    ,


    `"Soe that the speach being Irish, 
the hart must needes be Irishe; 
for out of the aboundance of the hart, 
the tonge speaketh"<br/>
<h6>A Veue of The Present State of Ireland</h6>`
    ,
    `Gaelic Ireland's final strongholds fell and as the last Ulster chieftains were forced into exile, So ended the Gaelic order.`,


    `Edmund Spencer was wrong.
    The heart can be Irish, whilst the tongue speaks English. 

    `,
    `When the tongue is Gaelic, what speaketh the heart ?
    
   
    </p> </span>`,








];



let images = [
    `placeHolder0.png`,
    `placeHolder0.png`,
    `a.png`,
    `fi.png`,
    `b.png`,
    `c.png`,
    `amergin.png`,
    `rún.png`,
    ``,
    ``,
    ``,
    ``,
    `calm.png`,//storm calmed
    `g.png`,

    `king.gif`, //1169AD
    `norman.png`,
    `pale.png`,
    `ard.png`,
    `spencer.png`,
    `spencer.png`,
    `chief.png`,
    `f.png`,

    `seabhac.png`,
    `seabhac.png`
]

let teacsGo = topTeacs1;
let teacsÓ = topTeacs0;
let teangaTop = 0;
let teangaTo = 1;
$('#ó').on('touchend', function () {


    teangaTop++;
    if (teangaTop === 3) {
        teangaTop = 0;
    }
    switch (teangaTop) {

        case 0:
            $('#anÓImgFéin').attr('src', './img/btn-icons/0.png');
            teacsÓ = topTeacs0;

            console.log($('#anÓImgFéin').attr('src')
            )

            
            $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);

            break;


        case 1:
            $('#anÓImgFéin').attr('src', './img/btn-icons/1.png');
            teacsÓ = topTeacs1;
            $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);

            break;
        case 2:

            $('#anÓImgFéin').attr('src', './img/btn-icons/2.png');
            teacsÓ = topTeacs2;
            $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);

            break;
            default:break;
    }
    // alert(teangaTop)


});
$('#go').on('touchend', function () {


    teangaTo++;

    if (teangaTo === 3) {
        teangaTo = 0;
    }
    switch (teangaTo) {

        case 0:
            $('#anGoImgFéin').attr('src', './img/btn-icons/0.png');
            teacsGo = topTeacs0;

            break;


        case 1:
            $('#anGoImgFéin').attr('src', './img/btn-icons/1.png');
            teacsGo = topTeacs1;

            break;
        case 2:

            $('#anGoImgFéin').attr('src', './img/btn-icons/2.png');
            teacsGo = topTeacs2;

            break;
default:break;
        }
    // alert(teangaTop)


});


$('#next').on('touchend', function () {
    slide++;
    // refresh()
})

$('#prev').on('touchend', function () {
    if (slide === 0) {
    }
    slide--;
})


$(document).ready(function () {
    $('#shield-holder').on('touchstart', function () {
        // $('#shield-holder').css("background-image", "url('../img/glow.png')")
        $('.shiroi').fadeOut();
        $('#top-content').fadeOut();
        setTimeout(function () {
            $('#top-content').css('slow')

            $('#top').empty().append(`<h4 id="top-content">${teacsGo[slide]}</h4>`);
            $('#top').css('color', 'white')
            $('#top-content').fadeIn('slow')

        }, 100);

    });

    $('#shield-holder').on('touchend', function () {


        $('#top-content').fadeOut();
        setTimeout(function () {

            $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);
            $('#top').css('color', 'color:rgb(143, 125, 48)');
            $('#top-content').fadeIn('slow')

        }, 100);

    });

function    refresh(){
        if (slide < 0) {
            slide = 0;
        }

        if (slide === 0) {
            $('.flegs').fadeIn();
            $('#middle-hist').empty().css('background-image', `url('../img/ciorcal2.png')`);
            $('#middle-hist').fadeIn();

        }
        if (slide >= 1) {
            $('.flegs').fadeOut();

        }


        if (slide === lastSlide) {
            // $('#dev').fadeIn();


        } else {
            $('#dev').fadeOut();

        }

        if (slide === firstPoemSlide - 1) {
            // $('#middle-hist').fadeOut();
            alert();
            // $('#middle-hist').removeClass('sea');

        }
        if (slide >= firstPoemSlide && slide <= lastPoemSlide) {
            $('#middle-hist').empty()
            // $('#middle-hist').addClass('sea');
            $('#middle-hist').empty().css('background-image', `url('../img/About1/rún.png')`);
            // $('#middle-hist').css('margin-left','50px');

            $('#middle-hist').fadeIn();

            // $('#top-content').fadeOut();
            // $('#bottom-content').fadeOut();
            setTimeout(function () {

                $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);
                $('#top-content').fadeIn('slow')
                // $('#bottom').empty().append(`<h4 id="bottom-content">${textBottom[slide]}</h4>`);
                // $('#bottom-content').fadeIn('fast')

            }, 600);
        }
        else if (slide === spencer1 || slide === spencer2) {

            // $('#top-content').fadeOut();

            // $('#middle').fadeOut();
            // $('#bottom-content').fadeOut();
            // $('#middle').css('background-image', `url('../img/About1/${images[slide]}')`);

            setTimeout(function () {

                // $('#middle').removeClass('sea');
                $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);
                console.log(images[slide]);
                console.log(slide);

                // $('#top-content').fadeIn('slow')


                $('#bottom').empty().append(`<h4 id="bottom-content">${textBottom[slide]}</h4>`);
                $('#bottom-content').fadeIn('slow')
                // $('#middle').fadeIn('slow')

            }, 600);
        }
        else {

            $('#top-content').fadeOut();
            // $('#middle').fadeOut();
            // $('#bottom-content').fadeOut();

            setTimeout(function () {

                $('#middle').removeClass('sea');
                $('#top').empty().append(`<h4 id="top-content">${teacsÓ[slide]}</h4>`);
                console.log(images[slide]);
                console.log(slide);

                $('#top-content').fadeIn('slow')

                $('#middle-hist').empty().css('background-image', `url('../img/About1/${images[slide]}')`);

                // $('#bottom').empty().append(`<h4 id="bottom-content">${textBottom[slide]}</h4>`);
                // $('#bottom-content').fadeIn('slow')
                // $('#middle').fadeIn('slow')

            }, 600);
        }



        // $('#middle-content').fadeIn()

        // $('#bottom').append(`<h2 id="bottom-content">${textBottom[slide]}</h2>`)


    }

});