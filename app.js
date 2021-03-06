let villeChoisi;

function erreur() {
  villeChoisi = 'paris';
  recupererTemp(villeChoisi);
}

if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition((position) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=ce22a50a7aa8b692c7352a57c6b0135d&units=metric`;

    console.log(url);

    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let res = requete.response;

          document.querySelector('#ville').textContent = res.name;
          document.querySelector('#temperature_label').textContent =
            res.main.temp;
        }
      }
    };
  }, erreur);
} else {
  villeChoisi = 'Paris';
  recupererTemp(villeChoisi);
}

let changerVille = document.querySelector('#changer');

changerVille.addEventListener('click', demanderVille);

function recupererTemp(ville) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=ce22a50a7aa8b692c7352a57c6b0135d&units=metric`;

  let requete = new XMLHttpRequest();
  requete.open('GET', url);
  requete.responseType = 'json';
  requete.send();

  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let res = requete.response;

        document.querySelector('#ville').textContent = res.name;
        document.querySelector('#temperature_label').textContent =
          res.main.temp;
      }
    }
  };
}
