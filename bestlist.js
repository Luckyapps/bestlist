var bestlist_menu,bestlist_create_form_add_button, bestlist_create_form_button, bestlist_title, bestlist_create_form_text,list_content, list_title, list_current, list_all, list_create_form, additem_button, list_eingabe = [], bestlist_create_form_input, bestlist_create_form_title_input, program_state;

if(window.location.href.match(/index/ig)){
   window.addEventListener("load", bestlist_start_home); 
}else if(window.location.href.match(/list/ig)){
    window.addEventListener("load", bestlist_start_list);
}

window.addEventListener("keydown", keyset);

function keyset(evt){
    if(evt.key == "Enter"){
        if(programm_state == "create_list"){
            bestlist_create_add();
        }else if(programm_state = "add_to_list"){
            bestlist_add_add();
        }
    }
}

function bestlist_start_list(){
    list_create_form = document.getElementById("bestlist_create_form");
    additem_button = document.getElementById("additem_button");
    bestlist_create_form_text = document.getElementById("bestlist_create_form_text");
    bestlist_create_form_input = document.getElementById("bestlist_create_form_input");
    bestlist_create_form_title_input = document.getElementById("bestlist_create_form_title_input");
    bestlist_create_form_add_button = document.getElementById("bestlist_create_form_add_button");
    bestlist_create_form_button = document.getElementById("bestlist_create_form_button");
    list_content = document.getElementById("list_content");
    list_title = document.getElementById("list_title");
    if(sessionStorage.getItem("list_site_mode")){
        if(sessionStorage.getItem("list_site_mode") == "create"){
            bestlist_create_init();
        }else if(sessionStorage.getItem("list_site_mode") == "show"){
            bestlist_show(sessionStorage.getItem("list_current_index"));
        }
    }
}

function bestlist_start_home(){
    bestlist_menu = document.getElementById("bestlist_menu_container");
    bestlist_load();
}

function reload_list(item){
    if(localStorage.getItem("bestlist")){
        list_all = JSON.parse(localStorage.getItem("bestlist"));
        console.log(list_all);
        if(item != null){
            console.log("item");
            list_all.items.push(item);
            console.log(list_all);
            localStorage.setItem("bestlist", JSON.stringify(list_all));
        }
    }else{
        var list_template = {
            "items": [/*{
                "data":{},
                "content": []
            }*/]
        };
        localStorage.setItem("bestlist", JSON.stringify(list_template));
        reload_list();
    }
}

function bestlist_load(){
    list_all = JSON.parse(localStorage.getItem("bestlist"));
    if(localStorage.getItem("bestlist")){
        console.log("Bestlist");
        for(i=0; i<list_all.items.length;i++){
            console.log("TESTLSKDJ");
            var temp = i + 1;
            bestlist_menu.innerHTML = bestlist_menu.innerHTML +"<div class='card' onclick='bestlist_open("+ temp +")'>"+ list_all.items[i].data.title +"</div>";
        }
    }else{
        console.log("noBestlist");
        bestlist_menu.innerHTML = "Keine Liste Vorhanden";
    }
}

function bestlist_new(){
    console.log("erstelle neue Liste");
    sessionStorage.setItem("list_site_mode", "create");
    window.location = "list.html";
}

function bestlist_open(index){
    sessionStorage.setItem("list_site_mode", "show");
    sessionStorage.setItem("list_current_index", index);
    window.location = "list.html";
}

function bestlist_add_init(){
    programm_state = "add_to_list";
    additem_button.style.display = "none";
    bestlist_create_form_title_input.style.display = "none";
    list_create_form.style.display = "block";
    bestlist_create_form_add_button.setAttribute('onclick',"bestlist_add_add()");
    bestlist_create_form_button.setAttribute("onclick", "bestlist_add()");
}

function bestlist_add_add(){
    programm_state = "add_to_list";
    list_all.items[sessionStorage.getItem("list_current_index") - 1].content.push(bestlist_create_form_input.value);
    console.log(list_all);
    bestlist_create_form_input.value = "";
}

function bestlist_add(){
    localStorage.setItem("bestlist", JSON.stringify(list_all));
    bestlist_show(sessionStorage.getItem("list_current_index"));
}

function bestlist_create_init(){
    programm_state = "create_list";
    additem_button.style.display = "none";
    bestlist_create_form_title_input.style.display = "block";
    list_create_form.style.display = "block";
    bestlist_create_form_add_button.setAttribute('onclick',"bestlist_create_add()");
    bestlist_create_form_button.setAttribute("onclick", "bestlist_create()");
}

function bestlist_create_add(){
    list_eingabe.push(bestlist_create_form_input.value);
    bestlist_create_form_input.value = "";
    bestlist_create_form_text.innerHTML = list_eingabe.toString();
}

function bestlist_create(){
    var list_object_temp = {
        "data": {
            "title": bestlist_create_form_title_input.value
        },
        "content" : list_eingabe
    }
    reload_list(list_object_temp);
    bestlist_show(list_all.items.length);
    list_eingabe = [];
}

function bestlist_show(index){
    console.log(index);
    additem_button.style.display = "block";
    list_create_form.style.display = "none";
    console.log("GO");
    index = index - 1;
    sessionStorage.setItem("list_site_mode", "show");
    programm_state = "show_list";
    list_all = JSON.parse(localStorage.getItem("bestlist"));
    console.log("GOGOGOG");
    list_content.innerHTML = "";
    list_title.innerHTML = list_all.items[index].data.title;
    for(i=0; i<list_all.items[index].content.length;i++){
        console.log("GO");
        list_content.innerHTML = list_content.innerHTML +"<li>"+ list_all.items[index].content[i] +"</li>";
    }
}