var bestlist_menu, bestlist_add_eingabe = [], bestlist_create_form_add_button, bestlist_create_form_button, bestlist_title, bestlist_create_form_text,list_content, list_title, list_current, list_all, list_create_form, additem_button, list_eingabe = [], bestlist_create_form_input, bestlist_create_form_title_input, program_state;

var bestlist_add_form_text,
    bestlist_add_form_input,
    bestlist_add_form_title_input,
    bestlist_add_form_add_button,
    bestlist_add_form_button,
    doubles = {
        "items":[]
    },
    doubles_count = 0
    /*TMP_list_all*/;

if(window.location.href.match(/index/ig)){
   window.addEventListener("load", bestlist_start_home); 
}else if(window.location.href.match(/list/ig)){
    window.addEventListener("load", bestlist_start_list);
}

window.addEventListener("keydown", keyset);

function keyset(evt){
    if(evt.key == "Enter"){
        if(programm_state == "create_list"){
            //bestlist_create_add();
            bestlist_create();
        }else if(programm_state = "add_to_list"){
            bestlist_add_add();
        }
    }
}

function bestlist_start_list(){
    additem_button = document.getElementById("additem_button");
    list_create_form = document.getElementById("bestlist_create_form");
    bestlist_create_form_text = document.getElementById("bestlist_create_form_text");
    bestlist_create_form_input = document.getElementById("bestlist_create_form_input");
    bestlist_create_form_title_input = document.getElementById("bestlist_create_form_title_input");
    bestlist_create_form_add_button = document.getElementById("bestlist_create_form_add_button");
    bestlist_create_form_button = document.getElementById("bestlist_create_form_button");
    
    bestlist_add_form_text = document.getElementById("bestlist_add_form_text");
    bestlist_add_form_input = document.getElementById("bestlist_add_form_input");
    bestlist_add_form_title_input = document.getElementById("bestlist_add_form_title_input");
    bestlist_add_form_add_button = document.getElementById("bestlist_add_form_add_button");
    bestlist_add_form_button = document.getElementById("bestlist_add_form_button");
    list_add_form = document.getElementById("bestlist_add_form");

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
            sessionStorage.setItem("list_current_index", list_all.items.length);
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
            bestlist_menu.innerHTML = bestlist_menu.innerHTML +"<div class='card' value='"+ i +"' onclick='bestlist_open("+ temp +")'>"+ list_all.items[i].data.title +"</div>";
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
    list_add_form.style.display = "block";
}

function bestlist_add_add(){
    programm_state = "add_to_list";
    bestlist_add_eingabe.push(bestlist_add_form_input.value);
    //list_all.items[sessionStorage.getItem("list_current_index") - 1].content.push(bestlist_add_form_input.value);
    bestlist_add_form_input.value = "";
    build_edit_list();
}

function build_edit_list(){
    bestlist_add_form_text.innerHTML = "";
    for(i=0;i<bestlist_add_eingabe.length;i++){
        bestlist_add_form_text.innerHTML = bestlist_add_form_text.innerHTML +"<li onclick='bestlist_add_delete(this)' value='"+ i +"'>"+ bestlist_add_eingabe[i] +"</li>";
    }
    //bestlist_add_form_text.innerHTML = bestlist_add_form_text.innerHTML +"<li onclick='bestlist_add_delete(this)' value='"+ val_temp +"'>"+ bestlist_add_eingabe[bestlist_add_eingabe.length - 1] +"</li>";
}

function bestlist_add_delete(elem){
    var id = elem.value;
    console.log(id);
    bestlist_add_eingabe.splice(id, 1);
    console.log(bestlist_add_eingabe);
    build_edit_list();
}

function bestlist_add(){
    //doubles_check(bestlist_add_eingabe);
    for(i=0;i<bestlist_add_eingabe.length;i++){
        list_all.items[sessionStorage.getItem("list_current_index") - 1].content.push(bestlist_add_eingabe[i]);
    }
    //list_all.items[sessionStorage.getItem("list_current_index") - 1].content.push(bestlist_add_eingabe);
    console.log(list_all);
    localStorage.setItem("bestlist", JSON.stringify(list_all));
    bestlist_show(sessionStorage.getItem("list_current_index"));
    bestlist_add_eingabe = [];
}

var lol_tmp = 0;

function doubles_check(mode){
    console.log(list_all);
    lol_tmp++;
    /*for(i=0;i<eingabe.length;i++){
        for(j=0;j<eingabe.length;i++){
            if(eingabe[i] == eingabe[j]){
                console.error("ERROR");
            }
        }
        for(k=0;k<list_all.items[sessionStorage.getItem("list_current_index") - 1].content.length;k++){
            if(eingabe[i] == list_all.items[sessionStorage.getItem("list_current_index") - 1].content[k]){
                console.warn("ERROR");
            }
        }
    }*/
    if(mode != "repeat"){
        var TMP_list_all = list_all.items[sessionStorage.getItem("list_current_index") - 1].content;
    }else{
        var TMP_list_all = JSON.parse(sessionStorage.getItem("TMP_list_all"));
    }
    console.warn("Start");
    var listitems = TMP_list_all;
    for(i=0;i<listitems.length;i++){
        for(j=0;j<listitems.length;j++){
            if((listitems[i] == listitems[j]) && (i != j)){
                console.error("Doppelt: "+ i +" "+ j +" : "+ listitems[i] +", "+ listitems[j]);
                var tmp_i = i + doubles_count; 
                var tmp_j = j + doubles_count;
                console.log(i);
                console.log(j);
                console.log(doubles_count);
                console.log(tmp_i);
                console.log(tmp_j);
                list_content.getElementsByTagName("li")[tmp_i].style.color = "red";
                list_content.getElementsByTagName("li")[tmp_j].style.color = "red";
                console.log(TMP_list_all);
                console.log(listitems[i]);
                var doubles_current = doubles.items.length;
                doubles.items[doubles_current] = {};
                doubles.items[doubles_current].names = [listitems[i], listitems[j]];
                doubles.items[doubles_current].index1 = i;
                doubles.items[doubles_current].index2 = j;
                //doubles_count = doubles_count + 1;
                console.log(doubles);
                //TMP_list_all.splice(i,1);
                TMP_list_all[i] = Math.random();
                //listitems = TMP_list_all;
                sessionStorage.setItem("TMP_list_all", JSON.stringify(TMP_list_all));
                doubles_check("repeat");
                return;
            }
            console.log((listitems[i] == listitems[j]));
            if((j == (listitems.length - 1)) && (i == (listitems.length - 1))){
                console.warn("Fertig");
                doubles_count = 0;
                console.warn(list_all);
            }
        }
    }
}

function doubles_delete(){
    for(i=0;i<doubles.items.length;i++){
        list_all.items[sessionStorage.getItem("list_current_index") - 1].content.splice(doubles.items[i].index1,1,"DELETED");
        console.log(list_all.items[sessionStorage.getItem("list_current_index") - 1].content);
    }
    for(i=0;i<list_all.items[sessionStorage.getItem("list_current_index") - 1].content.length;i++){
        if(list_all.items[sessionStorage.getItem("list_current_index") - 1].content[i] == "DELETED"){
            list_all.items[sessionStorage.getItem("list_current_index") - 1].content.splice(i,1);
            i = i-1;
        };
    }
    localStorage.setItem("bestlist", JSON.stringify(list_all));
    doubles = {
        "items":[]
    };
    bestlist_show(sessionStorage.getItem("list_current_index"));
}

function bestlist_create_init(){
    programm_state = "create_list";
    additem_button.style.display = "none";
    bestlist_create_form_title_input.style.display = "block";
    list_create_form.style.display = "block";
    if(localStorage.getItem("bestlist")){}else{
        var list_template = {
            "items": [/*{
                "data":{},
                "content": []
            }*/]
        };
        localStorage.setItem("bestlist", JSON.stringify(list_template));
    }
    /*bestlist_create_form_add_button.setAttribute('onclick',"bestlist_create_add()");
    bestlist_create_form_button.setAttribute("onclick", "bestlist_create()");*/
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
    //console.log(index);
    additem_button.style.display = "block";
    list_create_form.style.display = "none";
    list_add_form.style.display = "none";
    index = index - 1;
    sessionStorage.setItem("list_site_mode", "show");
    programm_state = "show_list";
    list_all = JSON.parse(localStorage.getItem("bestlist"));
    list_content.innerHTML = "";
    list_title.innerHTML = list_all.items[index].data.title;
    for(i=0; i<list_all.items[index].content.length;i++){
        list_content.innerHTML = list_content.innerHTML +"<li onclick='bestlist_list_remove(this)' value='"+ i +"'>"+ list_all.items[index].content[i] +"</li>";
    }
}

function bestlist_list_remove(elem){
    console.warn("losche");
    console.log(elem.value);
    list_all.items[sessionStorage.getItem("list_current_index") - 1].content.splice(elem.value, 1);
    console.warn(list_all.items[sessionStorage.getItem("list_current_index") - 1].content);
    localStorage.setItem("bestlist", JSON.stringify(list_all));
    bestlist_show(sessionStorage.getItem("list_current_index"));
}

function bestlist_remove(elem){
    list_all.items.splice(sessionStorage.getItem("List_current_index") - 1, 1);
    localStorage.setItem("bestlist", JSON.stringify(list_all));
    window.location = "index.html";
}