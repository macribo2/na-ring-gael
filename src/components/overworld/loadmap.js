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