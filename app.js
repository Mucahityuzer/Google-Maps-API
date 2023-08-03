let latitude, longitude="";

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else{
    alert("Der Standort kann nicht vom Browser abgerufen werden...");
}

function onSuccess(position){
     latitude = position.coords.latitude;
     longitude = position.coords.longitude;



    const api_key="7b14380af9ca489abf8c33bc8ea638e9";
    const url = ` https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

    fetch(url)
       .then(response => response.json())
       .then(result => {
          let details = result.results[0].components;

          let {country, postcode, province} = details;

          document.getElementById("results").innerHTML = `
                <p>ülke:${country}</p>
                <p>post code:${postcode}</p>
                <p>region:${province}</p>
          
          `;

          initMap();
       });
}

function onError(error){
    if(error.code === 1){
        alert("Der Zugriff wurde verweigert.");
    
    } else if(error.code === 2){
        alert("Der Standort konnte nicht ermittelt werden.");
    } else{
        alert("Es ist ein Fehler aufgetreten.");
    }
}
let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    zoom: 8,
  });
  const marker = google.maps.Marker({
    map: map,
    position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    
  });
}

