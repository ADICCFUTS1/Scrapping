var http = require("http");
let fs = require("fs");

const axios = require("axios");
const cheerio = require("cheerio");

const comps = [
  /*0*/ "england/premier-league/",
  /*1*/ "spain/primera-division/",
  /*2*/ "italy/serie-a/",
  /*3*/ "france/ligue-1/",
  /*4*/ "germany/bundesliga/",
  /*5*/ "argentina/primera-division/",
  /*6*/ "colombia/primera-a/",
  /*7*/ "international/uefa-champions-league/",
  /*8*/ "international/uefa-europa-league/",
  /*9*/ "international/uefa-nations-league/",
  /*10*/ "international/world-cup-qualifying/",
  /*11*/ "england/football-league-cup/",
  /*12*/ "international/copa-libertadores/",
  /*13*/ "international/copa-sudamericana/",
  /*14*/ "international/friendly/",
  /*15*/ "spain/copa-del-rey/",
  /*16*/ "england/fa-cup/",
  /*17*/ "england/football-league-cup/",
  /*18*/ "spain/spanish-super-cup/",
  /*19*/ "england/fa-cup/",
  /*20*/ "italy/coppa-italia/",
  /*21*/ "france/coupe-de-france/",
  /*22*/ "international/fifa-club-world-cup/",
  /*23*/ "international/recopa-sudamericana/",
  /*24*/ "international/uefa-europa-conference-league/"
];
const global = [
  comps[12],
  comps[13] /*,
  comps[5],
  comps[19],
  comps[3],
  comps[6],
  comps[6],
  comps[15],
  comps[5],*/
];
const url = comps[5];
const f = 20;
var c = 2;
console.log("el global es: " + global.length);

for (var as = 0; as <= global.length - 1; as++) {
  const SCRAPING_URL =
    "https://m.livesoccertv.com/es/competitions/" + global[as];
  //const SCRAPING_URL = "https://betsapi.com/l/" + url2;

  (async () => {
    const response = await axios
      .get(SCRAPING_URL)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const results = [];
    const title = [];

    if (response) {
      const $ = cheerio.load(response);

      $("div.b_match_team").each(function () {
        results.push($(this).text());
      });

      /*$("a").each(function () {
      results.push($(this).text());
    });*/

      /*$("div").each(function (i, e) {
      let links = $(e).attr("data-timestamp");

      console.log(links);
    });*/

      //console.log(e);

      $("div").each(function (i, e) {
        title.push($(e).attr("data-timestamp"));
      });
    }
    const preResults = results.filter((data) => data !== "");
    const predtResults = title.filter((data) => data !== undefined);

    const resultsFiltrados = [];
    const resultsdtFiltrados = [];

    for (var i = 0; i <= f + 1; i++) {
      resultsFiltrados.push(
        `${preResults[0 + i * 2]} - ${preResults[1 + i * 2]}`.replace(
          /\r?\n|\r/g,
          ""
        )
      );
      c = c + 1;
    }
    /*var sumas = [67, 68];
  for (var i = 0; i <= f + 1; i++) {
    resultsFiltrados.push(`${preResults[sumas[0]]} - ${preResults[sumas[1]]}`);
    sumas[0] = sumas[0] + 3;
    sumas[1] = sumas[1] + 3;
  }*/

    for (i = 0; i <= c - 1; i++) {
      resultsdtFiltrados.push(`${predtResults[i]}`);
    }

    //the server object listens on port 8080
    function log(socket, data) {
      console.log(resultsFiltrados);
      socket.emit("message", resultsFiltrados);
    }
    console.log(SCRAPING_URL);
    console.log(resultsdtFiltrados);
    console.log(resultsFiltrados);
    console.log(c);
  })();
}
