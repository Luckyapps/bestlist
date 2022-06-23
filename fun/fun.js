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