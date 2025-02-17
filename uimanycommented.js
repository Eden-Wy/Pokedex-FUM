//import {pokeAPI} from "./modules/network.js";
//
////Warum brauche ich das? Was macht es?
////const cards = document.querySelector(".cards");
//
//export const pokeData = async () => {
//    const data = await pokeAPI();
//    console.log(data);
//    if (!data || data.length === 0) {
//        throw new Error ("Data not found");
//    }
////Bis hierhin funktioniert es. Kein Problem. Wir haben hier jetzt die PokeAPI und stellen sicher, daß sie auch wirklich geladen wird.
////Als nächstes ein forEach, um durch alle Einträge durchzugehen und ALLE Pokemon abzurufen (Gotta catch 'em all!).
//
////Das System macht automatisch diesen forEach. Es wird schon wissen, warum...
////Das hier bereitet Probleme. Entweder habe ich am Anfang zu viele Klammern und der Pfeil geht nicht, oder ich habe zu wenige Klammern und das Ende spinnt. Was nun?
//data.forEach(async (element) => {
//    const result = await fetch(element.url); //Ja, den fetch von was denn? Wer ist denn hier das element?
//    if (!result.ok)
//        throw new Error("No Network Response");
//    //Die folgenden Zeilen machen Schwierigkeiten. Sie sind irgendwie Teil aber auch nicht Teil?
//    //Echt, keine Ahnung. Es ist gleich 1:00 morgens und ich habe keine Ahnung.
//    }) //Hat diese Klammer das Problem..behoben?!?! 
////} //Hier endet die Funktion. Vielleicht entferne ich die Klammer einfach...
////Scheint auszureichen. Klammer entfernt, Problem behoben.
//
////Hier fehlt etwas, aber ich weiß nicht, was es ist. Ich erinnere mich vage daran, daß ich die JSON, die ich unten abrufe, hier etablieren muß. Richtig?
//
//const pokemon = await result.json();     //Damit speichern wir dann das jeweilige Ergebnis. Möglicherweise.
//
////ES IST EIN WUNDERVOLLER MORGEN UND HIER MUß DIE FUNKTION BEGINNEN!!! Update: Glaube, bin falsch. Argh. Update V2: Problem durch Klammerentfernung behoben.
//
//const cardigan = document.createElement("div");
//cardigan.classname =
//    "w-[100px] bg-red-500"
//
////Auf dem Papier sollte das die Karten als tatsächliche Karten dann einfügen.
////Die Symbole + und \ sind notwendig, damit der Code in mehreren Zeilen geschrieben werden kann. Sagt jemand, der sich damit auskennt.
//cardigan.innerHTML = `<p>${pokemon.name}</p>
//<p>Height: ${pokemon.height}</p>
//<p>Weight: ${pokemon.weight}</p>
//<p>Type: ${pokemon.type}</p>
//<div><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></div>`
////Irgendwo fehlt ein function oder ich habe sonst irgendetwas falsch gemacht. Das System will functions.
//
//document.getElementById("cards").appendChild(cardigan);
//
//} //Ich habe irgendwie den Anfang verloren, und jetzt sitzt hier diese einsame Klammer.
////Muß den Anfang finden, vielleicht löst das sogar die Probleme mit den Bildern.
////Ein Problem für Zukunfts-Ich, nicht Gegenwarts-und-übermüdet-Ich.
//
//pokeData();