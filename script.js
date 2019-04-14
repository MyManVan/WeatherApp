window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span')
  let locationModal = document.querySelector('.location-modal')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`

      const api = `${proxy}https://api.darksky.net/forecast/74841ed3888020bd394e9a18e82694de/${lat},${long}`;

      locationModal.classList.add('hide');

      fetch(api)
        .then(response => {
          return response.json();

        })
        .then(data=>{
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from api
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
            //Formula for F -> C
            let celsius = (temperature - 32) * (5 / 9);
          //Set icon
          setIcons(icon, document.querySelector('.icon'));
          //add event listener for degree
            temperatureSection.addEventListener('click', () =>{
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(temperature);
              }
            });
        });
    });
  };


  function setIcons(icon, iconID) {
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
  }
});
