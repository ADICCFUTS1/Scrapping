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
  /*14*/ "international/club-friendly/",
  /*15*/ "spain/copa-del-rey/",
  /*16*/ "england/fa-cup/",
  /*17*/ "england/fa-community-shield/",
  /*17 "england/football-league-cup/",*/
  /*18*/ "spain/spanish-super-cup/",
  /*19*/ "germany/dfl-supercup/",
  /*20*/ "italy/coppa-italia/",
  /*21*/ "france/super-cup/",
  /*22*/ "international/fifa-club-world-cup/",
  /*23*/ "international/recopa-sudamericana/",
  /*24*/ "international/uefa-europa-conference-league/",
  /*25*/ "international/conmebol-uefa-cup-of-champions/",
  /*26*/ "international/uefa-super-cup/"
];
const global = [
  comps[7],
  comps[5] /*,
  comps[2] /*,
  comps[4],
  comps[5],
  comps[5],
  comps[6],
  comps[15],
  comps[5],*/
];

const Enlaces = [];
const url = comps[5];
const f = 12;
var c = 2;
console.log("el global es: " + global.length);

for (let as = 0; as <= global.length - 1; as++) {
  const SCRAPING_URL =
    "https://m.livesoccertv.com/es/competitions/" + global[as];
  //const SCRAPING_URL = "https://betsapi.com/l/" + url2;
  const NameComp = [];
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

    for (var i = 0; i <= f; i++) {
      resultsFiltrados.push(
        `${preResults[0 + i * 2]} - ${preResults[1 + i * 2]}`.replace(
          /\r?\n|\r/g,
          ""
        )
      );
      c = c + 1;
    }

    for (i = 0; i <= f; i++) {
      resultsdtFiltrados.push(`${predtResults[i]}`);
    }

    for (var swi = 0; swi <= resultsdtFiltrados.length; swi++) {
      switch (global[as]) {
        case "england/premier-league/":
          // code block
          NameComp.push("Premier League");
          break;
        case "spain/primera-division/":
          // code block
          NameComp.push("LaLiga");
          break;
        case "italy/serie-a/":
          // code block
          NameComp.push("Serie A");
          break;
        case "france/ligue-1/":
          // code block
          NameComp.push("Ligue 1");
          break;
        case "germany/bundesliga/":
          // code block
          NameComp.push("Bundesliga");
          break;
        case "argentina/primera-division/":
          // code block
          NameComp.push("Liga Profesional Argentina");
          break;
        case "colombia/primera-a/":
          // code block
          NameComp.push("Liga Dimayor Colombia");
          break;
        case "international/uefa-champions-league/":
          // code block
          NameComp.push("UEFA Champions League");
          break;
        case "international/uefa-europa-league/":
          // code block
          NameComp.push("UEFA Europa League");
          break;
        case "international/uefa-nations-league/":
          // code block
          NameComp.push("UEFA Nations League");
          break;
        case "international/friendly/":
          // code block
          NameComp.push("Amistoso");
          break;
        case "international/copa-libertadores/":
          // code block
          NameComp.push("Conmebol Libertadores");
          break;
        case "international/copa-sudamericana/":
          // code block
          NameComp.push("Conmebol Sudamericana");
          break;
        default:
          NameComp.push("Error");
        // code block
      }
    }

    var employees = {
      accounting: []
    };

    for (var i in resultsFiltrados) {
      var item = resultsFiltrados[i];

      employees.accounting.push({
        dt: resultsdtFiltrados[i],
        Partido: resultsFiltrados[i],
        Competicion: NameComp[i],
        Estadisticas:
          "https://apps-innova-redirects.blogspot.com/2020/03/no-disponible.html",
        Switch: 0,
        EnlaceMatchs: {
          valor1: "",
          valor2: "",
          valor3: "",
          valor4: "",
          valor5: "",
          valor6: ""
        }
      });
    }

    console.log(SCRAPING_URL);
    console.log(JSON.stringify(employees, null, 2));
  })();
}
