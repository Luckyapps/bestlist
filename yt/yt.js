var input, output, vid_name, vid_desc, vid_links, input_data;

window.addEventListener("keydown", keytest);

function keytest(evt){
    if(evt.key == "Enter"){
        yt_start();
    }
}

function yt_start(){
    input = document.getElementById("input");
    output = document.getElementById("output");
    vid_name = document.getElementById("vid_name");
    vid_desc = document.getElementById("vid_desc");
    vid_links = document.getElementById("vid_links");
    vid_keyw = document.getElementById("vid_keyw");
    vid_aut = document.getElementById("vid_aut");
    vid_leng= document.getElementById("vid_leng");

    input_data = input.value;

    if(input_data.lastIndexOf("?v=") != -1){
        video_id = input_data.substring(input_data.lastIndexOf("?v=") + 3);
    }else{
        video_id = input_data.substring(input_data.lastIndexOf("be/") + 3);
    }
    load_data();
}

function load_data(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdd3fc1f2fmsh2b2e20aff4b7655p13a3fdjsn6bfe325132a9',
            'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };
    
    fetch('https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id='+ video_id, options)
        .then(response => response.json())
        .then(response => yt_go(response))
        .catch(err => console.error(err));
}

function yt_go(response){
    console.log(response);
    vid_name.innerHTML = response.title;
    vid_desc.innerHTML = response.description;
    vid_keyw.innerHTML = response.keywords;
    vid_aut.innerHTML = response.author;
    vid_leng.innerHTML = response.length;

    var linklist = Object.keys(response.link);

    vid_links.innerHTML = "";

    for(i=0;i<linklist.length;i++){
        console.log(response.link[linklist[i]]);
        vid_links.innerHTML = vid_links.innerHTML +"<div><a href='"+ response.link[linklist[i]][0] +"'>"
        + response.link[linklist[i]][3]
        +" | "+ response.link[linklist[i]][1]
        +" | "+ response.link[linklist[i]][2]
        +" | "+ response.link[linklist[i]][4]
        +"</a></div>";
    }

    output.classList.remove("invisible");
}