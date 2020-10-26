//Récupération des éléments du DOM
let inputDate = document.getElementById("target");
let btn = document.getElementById("btn");
let dayShow = document.getElementById("day");
let hourShow = document.getElementById("hour");
let minuteShow = document.getElementById("minute");
let secodeShow = document.getElementById("seconde");
let saveDate = document.getElementById("saveDate");
let warning = document.getElementById("avertissement");

//Sauvegarde de la date entrée par l'utilisateur
let validateDate = inputDate.value;

//Declaration des fonctions

//Function
function decompte() {
  let dateTarget = new Date(validateDate).getTime();

  //Vérification qu'il y ai une date target de saisie
  if (!inputDate.value && !dateTarget) {
    dayShow.textContent = 0;
    hourShow.textContent = 0;
    minuteShow.textContent = 0;
    secodeShow.textContent = 0;
  } else {
    //Date du jour depuis le 1er Janvier 1970 00:00:00 UTC
    let today = new Date().getTime();

    //Date à atteindre en milliseconde depuis 1er Janvier 1970 00:00:00 UTC
    let countDown = dateTarget - today;

    // Si la date a atteindre est dépassée, on arrête l'intervale et affiche 'EXPIRED'
    if (countDown < 0) {
      warning.style.display = "block";
      dayShow.textContent = 0;
      hourShow.textContent = 0;
      minuteShow.textContent = 0;
      secodeShow.textContent = 0;
    } else {
      //Disparition de l'avertissement
      warning.style.display = "none";

      //Décomposer la différence en YY-MM-DD HH:MM:SS
      let dayDif = Math.floor(countDown / (1000 * 60 * 60 * 24));
      let hourDif = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minuteDif = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      let secondeDif = Math.floor((countDown % (1000 * 60)) / 1000);

      //Affichage des données
      dayShow.textContent = dayDif;
      verifS(dayDif, document.getElementById("dayUnits"));
      hourShow.textContent = hourDif;
      verifS(hourDif, document.getElementById("hourUnits"));
      minuteShow.textContent = minuteDif;
      verifS(minuteDif, document.getElementById("minuteUnits"));
      secodeShow.textContent = secondeDif;
      verifS(secondeDif, document.getElementById("secondeUnits"));
    }
  }
}

function verifS(data, unit) {
  if (data > 1) {
    unit.style.display = "inline";
  } else {
    unit.style.display = "none";
  }
}

//On vérifie s'il n'existe pas déjà une date enregistrée dans le localStorage
//Si oui validateDate prend la valeur
//Sinon init à 0
//La function se répète toute les secondes
function main() {
  if (localStorage.getItem("date")) {
    validateDate = localStorage.getItem("date");
  }
  setInterval(decompte, 1000);
}

// Init de la fonction main au lancement de la page
main();

//Modale Box
//Récupèration des éléments du DOM pour la modale Box
let modalBox = document.getElementById("modalBox");
let modalBtn = document.getElementById("modalBtn");
let closeBtn = document.getElementById("closeModal");

// Apparition et disparition de la modale Box
modalBtn.onclick = function () {
  modalBox.style.display = "block";
};
closeBtn.onclick = function () {
  modalBox.style.display = "none";
};
//Si l'utilisateur click en dehors de la modaleBox, elle disparait
window.onclick = function (event) {
  if (event.target == modalBox) {
    modalBox.style.display = "none";
  }
};

//Enregistrer la date lorsque l'user appuie sur le btn
btn.addEventListener("click", () => {
  validateDate = inputDate.value;
  //Si l'user veut sauver la date pour la récupérer quand il recharge la page
  if (saveDate.checked) {
    localStorage.setItem("date", validateDate);
  }
});
