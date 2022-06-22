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