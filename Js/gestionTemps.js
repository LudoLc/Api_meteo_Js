const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let option = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', option);
//console.log(jourActuel,ajd);

jourActuel = jourActuel.charAt(0).toLocaleUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;