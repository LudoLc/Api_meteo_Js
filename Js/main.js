
import tabJoursEnOrdre from "./gestionTemps.js";

const CLEAPI = '2850ad1ef589ed409539e1111a088399';
let resultatAPI; 

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempsJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {


       // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert("Vous avez refusé l'accès à la géolocalisation, n'application ne peut pas fonctionner! Merci de le modifier")
    })
}

function AppelAPI(long,lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

        resultatAPI = data;
        temps.innerText = resultatAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`
        localisation.innerText = resultatAPI.timezone;

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;
            
            if(heureIncr > 24 ) {
                heure[i].innerText = `${heureIncr - 24 } h`;  
            } else if(heureIncr === 24 ) {
                heure[i].innerText = '00h'
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }

        //temp pour 3h 
        for(let j = 0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatAPI.hourly[j * 3].temp)}°`
        }

        // trois premiere lettres des jours 
        for(let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }

        for(let m = 0; m < 7; m++){
            tempsJoursDiv[m].innerText = `${Math.trunc(resultatAPI.daily[m + 1].temp.day)}°`
        }

        if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `img/jour/${resultatAPI.current.weather[0].icon}.svg`
        }else {
            (heureActuelle >= 6 && heureActuelle < 21)
                imgIcone.src = `img/nuit/${resultatAPI.current.weather[0].icon}.svg`
            }    
            
            
            chargementContainer.classList.add('disparition');
        
    })

}

