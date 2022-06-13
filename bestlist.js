var bestlist_menu, bestlist_title, bestlist_create_form_text,list_content, list_current, list_all, list_create_form, additem_button, list_eingabe = [], bestlist_create_form_input, program_state;

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
        }
    }
}

function bestlist_start_list(){
    list_create_form = document.getElementById("bestlist_create_form");
    additem_button = document.getElementById("additem_button");
    bestlist_create_form_text = document.getElementById("bestlist_create_form_text");
    bestlist_create_form_input = document.getElementById("bestlist_create_form_input");
    list_content = document.getElementById("list_content");
    if(sessionStorage.getItem("list_site_mode")){
        if(sessionStorage.getItem("list_site_mode") == "create"){
            bestlist_create_init();
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
            bestlist_menu = bestlist_menu.innerHTML +"<div class='card' value='"+ i +"'>"+ list_all.items[i].data.title +"</div>"
        }
        bestlist_menu.innerHTML = "Bestlist vorhanden";
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

function bestlist_add_init(){

}

function bestlist_create_init(){
    programm_state = "create_list";
    additem_button.style.display = "none";
    list_create_form.style.display = "block";
}

function bestlist_create_add(){
    list_eingabe.push(bestlist_create_form_input.value);
    bestlist_create_form_input.value = "";
    bestlist_create_form_text.innerHTML = list_eingabe.toString();
}

function bestlist_create(){
    var list_object_temp = {
        "data": {
            "title": "UNSET"
        },
        "content" : list_eingabe
    }
    reload_list(list_object_temp);
    additem_button.style.display = "block";
    list_create_form.style.display = "none";
    bestlist_show(list_all.items.length - 1);
}

function bestlist_show(index){
    sessionStorage.setItem("list_site_mode", "show");
    programm_state = "show_list";
    for(i=0; i<list_all.items[index].length;i++){
        list_content.innerHTML = list_content.innerHTML +"<li>"+ list_all.items[index].content[i] +"</li>";
    }
}