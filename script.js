// the following commented code does work. Use it as a model for Chicken Coop.
// $.ajax({
// url: "https://rapidapi.p.rapidapi.com/games/Rise%20of%20the%20Tomb%20Raider?",
// method: "GET",
// headers: {
// "x-rapidapi-key": "a2b5d3b684mshabbf5412b1d3507p11b0a1jsnd2cd92016a40",
// "x-rapidapi-host": "chicken-coop.p.rapidapi.com"
// }
// }).then(calledGuy);

$(document).ready(function () {

    var listOfPlatforms = [];
    var listOfGenres = [];
    var listOfGames = [];
    var listOfChickens = []; // this is the one that will display the data

    var platformObject = {
        id: 0,
        name: "",
        pagenum: 1
    };

    var genreObject = {
        id: 0,
        name: "",
        pagenum: 1
    };

    var gamesObject = {
        id: 0,
        name: "",
        pic: "",
        index: 0
    };

    var chickenCoopDataObject = {
        games: gamesObject,
        description: "",
        genre: [],
        image: "",
        publisher: [],
        rating: "",
        releaseDate: "",
        score: 0,
        title: ""
    };

    var rapidKey = "a2b5d3b684mshabbf5412b1d3507p11b0a1jsnd2cd92016a40";
    var RAWGHost = "rawg-video-games-database.p.rapidapi.com";
    var queryURLRAWGPlatform = "https://rapidapi.p.rapidapi.com/platforms?";

    var queryGamesRAWG = "https://rapidapi.p.rapidapi.com/games?page_size=5" //&genres=4,51&platforms=21
    var queryURLRAWGGenre = "https://rapidapi.p.rapidapi.com/genres?";
    var chickenCoopURL = "https://rapidapi.p.rapidapi.com/games/";


    var headerParams = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "chicken-coop.p.rapidapi.com"
    }

    var headerParamsRAWG = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": RAWGHost
    }

    var headerParamsGenres = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": RAWGHost
    }

    getListOfGames(4, 4);
    function getListOfGames(genres, platforms) {
        var geturl = buildGamesURL(genres, platforms);

        $.ajax({
            url: geturl,
            method: "GET",
            headers: headerParamsRAWG

        }).then(calledGetGames)
            .then(getChickenCoopInfo);
    }


    function getChickenCoopInfo() {
        for (var i = 0; i < listOfGames.length; i++) {
            var item = listOfGames[i];
            var name = item.name;
            CallChickenCoop(name);
        }
    }

    function calledGetGames(response) {
        var result = response.results;
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var gamesObject1 = Object.create(gamesObject);
            gamesObject1.id = item.id;
            gamesObject1.name = item.name;
            gamesObject1.pic = item.clip.clip;
            gamesObject1.index = i; // put into chickenCoop when ready
            listOfGames.push(gamesObject1);
        }
    }

    function buildGamesURL(genres, platforms) {
        return queryGamesRAWG + "&genres=" + genres + "&platforms=" + platforms;
    }

    //getListOfPlatforms(queryURLRAWGPlatform);
    function getListOfPlatforms(platformurl) {
        $.ajax({
            url: platformurl,
            method: "GET",
            headers: headerParamsRAWG
        }).then(calledGetPlatforms);
    }

    function calledGetPlatforms(response) {
        var result = response.results;

        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var platformObject1 = Object.create(platformObject);
            platformObject1.id = item.id;
            platformObject1.name = item.name;

            listOfPlatforms.push(platformObject1);
        }

        if (response.next !== null) {
            getListOfPlatforms(queryURLRAWGPlatform + "page=2");
        }
    }

    //getListOfGenres(queryURLRAWGGenre);
    function getListOfGenres(genreurl) {
        $.ajax({
            url: genreurl,
            method: "GET",
            headers: headerParamsRAWG
        }).then(calledGetGenres);
    }

    function calledGetGenres(response) {
        var result = response.results;

        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var genreObject1 = Object.create(genreObject);
            genreObject1.id = item.id;
            genreObject1.name = item.name;

            listOfGenres.push(genreObject1);
        }
    }

    //buildURL();
    //CallChickenCoop();
    function buildURL(nameOfTheVideoGame) {
        var sampleVideo = "Rise of the Tomb Raider";
        var encoded = encodeURIComponent(/*sampleVideo*/ nameOfTheVideoGame);
        var queryURL = chickenCoopURL + encoded + "?";
        return queryURL;
    }

    function CallChickenCoop(nameOfTheVideoGame) {
        var queryURL = buildURL(nameOfTheVideoGame);
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: headerParams
        }).then(calledCC);
    }

    function calledCC(response) {
        var debug = 0;
        var item = response.result;

        if (item !== null) {
            var gotdata = Object.create(chickenCoopDataObject);
            var itemgames = findGame(item.title);

            gotdata.games = itemgames; // could be null

            gotdata.description = item.description;
            gotdata.genre = item.genre;
            gotdata.image = item.image;
            gotdata.publisher = item.publisher;
            gotdata.rating = item.rating;
            gotdata.score = item.score;
            gotdata.title = item.title;

            listOfChickens.push(gotdata);
        }
    }

    function findGame(chickenTitle) {
        var game = null;
        for (var i = 0; i < listOfGames.length; i++) {

            if (listOfGames[i].name.includes(chickenTitle)) {
                game = listOfGames[i];
                break;
            }
        }

        return game;
    }
});