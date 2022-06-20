window.addEventListener("load", starthack);
var body, randNum, counter = 0;

async function starthack(){
    body = document.body;
    var hackbox = document.getElementById("hackbox");
    console.log(body);
    randNum = Math.floor(Math.random() * 10) + 1;
    for(i=10; i>9; i++){
        //console.log(randNum);
        for(j=0;j<10;j++){
            hackbox.innerHTML += Math.round(Math.random()) +" ";
            if(counter == randNum){
                hackbox.innerHTML += "<font color='red'>"+ Math.round(Math.random()) +"</font> ";
                counter = 0;
                //randNum = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
                randNum = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
            }
        }
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(0.00001);
        counter++;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}