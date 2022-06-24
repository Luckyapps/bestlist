window.addEventListener("load", start);

var background, scroll_, exec_buffer = "play";

var box, box_top, box_active = false, box_top_init;

function start(){
    box = document.getElementById("box");
    background = document.getElementById("background");

    window.addEventListener("scroll", onscroll);
}

function onscroll(evt){
    if(exec_buffer == "play"){
        scroll_ = Math.round(window.scrollY);
        box_top = get_Style(box, "top");
        check_scrollstate(); 
    }
}

function check_scrollstate(){
    exec_buffer = "stop";
    //box
    if(box_active == true){
        if(box_top_init > scroll_){
            box_active = false;
            box.style.top = box_top_init +"px";
        }else{
            box.style.top = scroll_-1 +"px";
            if(box_top > 50 && box_top < 250){
                console.log("GO");
                box.style.left = box_top-50 +"px";
            }
        }
    }else{
        if(box_top < scroll_){
            box_active = true;
            box_top_init = box_top;
            check_scrollstate();
        }
    }
    exec_buffer = "play";
}

function get_Style(elem, property){
    var value = window.getComputedStyle(elem).getPropertyValue(property);
    value = parseInt(value);
    return value;
}