function get_add(adress){
    return new Promise(resolve => {
    if(adress.search("https") == -1){
      adress = adress.replace("http", "https");
    }
    var requestURL = adress;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      var data_temp2 = request.response;
      resolve(data_temp2);
    }
  });
}
  
async function getData(adress){
    var data_temp = await get_add(adress);
    return data_temp;
}

async function catfact(){
    var cat_output = document.getElementById("cat_output");
    var data = await getData("https://catfact.ninja/fact");
    cat_output.innerHTML = data.fact;
}

async function bitcoin(){
    var bitcoin_output = document.getElementById("bitcoin_output");
    var data = await getData("https://api.coindesk.com/v1/bpi/currentprice.json");
    bitcoin_output.innerHTML = "Der Bitcoinkurs am "+ data.time.updated +" betragt "+ /*Math.round(data.bpi.EUR.rate_float)*/data.bpi.EUR.rate + data.bpi.EUR.symbol;
}

async function bored(){
    var bored_output = document.getElementById("bored_output");
    var data = await getData("http://www.boredapi.com/api/activity/");
    bored_output.innerHTML = "<p>"+ data.activity +"</p><p>Kosten: "+ data.price +"</p>";
}

async function joke(){
    var joke_output = document.getElementById("joke_output");
    var data = await getData("https://api.chucknorris.io/jokes/random");
    joke_output.innerHTML = data.value;
    console.log(data);
}

async function randuser(){
    var randuser_output = document.getElementById("randuser_output");
    var data = await getData("https://randomuser.me/api/");
    randuser_output.innerHTML = "<h4> "+ data.results[0].name.title +" "+ data.results[0].name.first +" "+ data.results[0].name.last +"</h4>"
    +"<img src='"+ data.results[0].picture.large+"'></img>"
    +"<p><b>Alter:</b> "+ data.results[0].dob.age +"</br>"
    +"<b>Geburtsdatum:</b> "+ data.results[0].dob.date +"</br>"
    +"<b>Geschlecht:</b> "+ data.results[0].gender +"</br>"
    +"<b>Email:</b> "+ data.results[0].email +"</br>"
    +"<b>Handy:</b> "+ data.results[0].cell +"</br>"
    +"<b>Telefon:</b> "+ data.results[0].phone +"</br>"
    +"<b>Adresse:</b> "+ data.results[0].location.street.name +" "+ data.results[0].location.street.number +", "+ data.results[0].location.postcode +" "+ data.results[0].location.city +", "+ data.results[0].location.state +", "+ data.results[0].location.country +"</br>"
    +"<b>Username:</b> "+ data.results[0].login.username +"</br>"
    +"<b>Passwort:</b> "+ data.results[0].login.password +"</br>"
    +"<b>Nationalitat:</b> "+ data.results[0].nat +"</br>";
    console.log(data);
}

var data_age, data_gender;

async function guess(){
    var guess_input = document.getElementById("guess_input");
    var guess_output = document.getElementById("guess_output");
    data_age = await getData("https://api.agify.io?name="+ guess_input.value);
    data_gender = await getData("https://api.genderize.io?name="+ guess_input.value);
    var data_nationality = await getData("https://api.nationalize.io?name="+ guess_input.value);
    console.log(data_age);
    console.log(data_gender);
    console.log(data_nationality);
    guess_output.innerHTML = "<h4>"+ data_age.name +"</h4>"
    +"<b>Alter: </b>"+ data_age.age +"<br>"
    +"<b>Geschlecht: </b>"+ data_gender.gender +" (Wahrscheinlichkeit: "+ data_gender.probability * 100 +"%)<br><b>Nationalitat: </b>";
    for(i=0;i<data_nationality.country.length;i++){
        data_country = await getData("https://restcountries.com/v3.1/alpha/"+ data_nationality.country[i].country_id);
        guess_output.innerHTML = guess_output.innerHTML +"<li>"+ data_country[0].name.official +" (Wahrscheinlichkeit: "+ Math.round(((data_nationality.country[i].probability * 100) + Number.EPSILON) * 100) / 100 +"%)</li>";
    }//https://restcountries.com/v3.1/alpha/CODE
    //guess_output.innerHTML = guess_output.innerHTML +"</ul>";
}

//https://rapidapi.com/weatherapi/api/weatherapi-com/

async function country(){
    var data = await getData("https://restcountries.com/v3.1/alpha/"+ document.getElementById("guess_input").value);
    console.log(data);
}

var datas;

function yt(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdd3fc1f2fmsh2b2e20aff4b7655p13a3fdjsn6bfe325132a9',
            'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };
    
    fetch('https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=_bM2ctSSSYI', options)
        .then(response => response.json())
        .then(response => yt_go(response))
        .catch(err => console.error(err));
}

function yt_go(response){
    console.log(response);
    datas = response;
}

function weather_load(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '467dffbfb2mshfa882a5ede5dc1dp1929bbjsnaf5b21ec31df',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q='+ document.getElementById("weather_input").value +"&days=3", options)
        .then(response => response.json())
        .then(response => weather(response))
        .catch(err => console.error(err));
}

function weather(response){
    console.log(response);
    var data = response;
    var weather_input = document.getElementById("weather_input");
    var weather_output = document.getElementById("weather_output");
    weather_output.innerHTML = "<h4>Das Aktuelle Wetter aus "+ data.location.name +" in "+ data.location.region +", "+ data.location.country +"</h4>"
    +"Stand: "+ data.current.last_updated +"<br>"
    +"<b>Beschreibung: </b>"+ data.current.condition.text +"<br>"
    +"<b>Temperatur: </b>"+ data.current.temp_c +"<br>"
    +"<b>gefuhlte Temperatur: </b>"+ data.current. feelslike_c +"<br>"
    +"<b>Luftfeuchtigkeit: </b>"+ data.current.humidity +"<br>"
    +"<b>Windgeschwindigkeit: </b>"+ data.current.wind_kph +"<br>"
    +"<b>Boengeschwindigkeit: </b>"+ data.current.gust_kph +"<br>"
    +"<b>Windrichtung: </b>"+ data.current.wind_degree +" "+ data.current.wind_dir +"<br>"
    +"<b>Luftdruck: </b>"+ data.current.pressure_mb +" mBar<br>"
    +"<b>UV: </b>"+ data.current.uv +"<br>"
    +"<b>Wolken: </b>"+ data.current.cloud +"<br>";
}