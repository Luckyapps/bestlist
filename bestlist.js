var bestlist_menu, bestlist_title, list_current, list_all, list_create_form, additem_button;

if(window.location.href.match(/index/ig)){
   window.addEventListener("load", bestlist_start_home); 
}else if(window.location.href.match(/list/ig)){
    window.addEventListener("load", bestlist_start_list);
}

function bestlist_start_list(){
    list_create_form = document.getElementById("bestlist_create_form");
    additem_button = document.getElementById("additem_button");
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

function reload_list(){
    if(localStorage.getItem("bestlist")){
        list_all = localStorage.getItem("bestlist");
    }
}

function bestlist_load(){
    if(localStorage.getItem("bestlist")){
        console.log("Bestlist");
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

function bestlist_create_init(){
    additem_button.style.display = "none";
    list_create_form.style.display = "block";
}

function bestlist_create(){
    list_create_form.style.display = "none";
    additem_button.style.display = "block";
}