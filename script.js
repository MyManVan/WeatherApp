window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let dateSummary = document.querySelector('.date-summary');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  let locationModal = document.querySelector('.location-modal');
  let degreeDiv = document.querySelector('.degree');
  let preview = document.getElementById('preview');
  let previewList = preview.getElementsByTagName("li");
  let weekList = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  let currentDay = new Date().toLocaleDateString("en-US", {weekday: 'long'});
  const temperatureSpanPreview = document.querySelector('.ul li span');


  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  let dateModified = new Date().toLocaleDateString("en-US", options);

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
          dateSummary.textContent = dateModified;
            //Formula for F -> C
            let celsius = (temperature - 32) * (5 / 9);
          //Set icon
          setIcons(icon, document.querySelector('.icon'));
          //add event listener for degree
/*
            degreeDiv.addEventListener('click', () =>{
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureSpanPreview.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureSpanPreview.textContent = "F";
                temperatureDegree.textContent = Math.floor(temperature);
              }
            });*/
            //adds day per preview box
            for (i = 0; i < previewList.length; i++) {
              for (o = 0; o < weekList.length; o++) {
                if (currentDay == weekList[o]) {
                  if (o + 1 + i > 6) {
                    previewList[i].childNodes[0].textContent = weekList[o + 1 + i - 7];
                    previewList[i].childNodes[1].textContent = Math.floor((data.daily.data[i].temperatureMax + data.daily.data[i].temperatureMin)/2);
                    setIcons(data.daily.data[i].icon, document.querySelector('.icon' + (i + 1)));
                  } else {
                    previewList[i].childNodes[0].textContent = weekList[o + 1 + i];
                    previewList[i].childNodes[1].textContent = Math.floor((data.daily.data[i].temperatureMax + data.daily.data[i].temperatureMin)/2);
                    setIcons(data.daily.data[i].icon, document.querySelector('.icon' + (i + 1)));
                  };
                };
              };
            };
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
