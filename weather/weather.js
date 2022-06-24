window.addEventListener("load", init_weather);

var data, input, container;

var loc, head_tmp, desc, img_head;

function init_weather(){
    input = document.getElementById("input");
    loc = document.getElementById("loc");
    head_tmp = document.getElementById("head_tmp");
    desc = document.getElementById("desc");
    img_head = document.getElementById("img_head");
    container = document.getElementById("container");
    window.addEventListener("keydown", keytest);
}

function keytest(evt){
    if(evt.key == "Enter"){
        load();
    }
}

function load(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '467dffbfb2mshfa882a5ede5dc1dp1929bbjsnaf5b21ec31df',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q='+ input.value +"&days=3", options)
        .then(response => response.json())
        .then(response => setdata(response))
        .catch(err => console.error(err));
}

function setdata(response){
    data = response;
    console.log(data);
    start_weather()
}

function start_weather(){
    loc.innerHTML = data.location.name +" in "+ data.location.region +", "+ data.location.country;
    img_head.src = "https:"+ data.current.condition.icon;
    head_tmp.innerHTML = data.current.temp_c +"ºC | gefuhlt: "+ data.current.feelslike_c +"ºC";
    desc.innerHTML = data.current.condition.text;

    container.classList = "";
}