$("#nav-2").css("top" , "-60px");

var nav2IsHidden = true;

$(window).scroll(function(){
 //console.log($(window).scrollTop());
 if($(window).scrollTop() > 200 && nav2IsHidden){
     //show
     nav2IsHidden = false;
     console.log("show 2");
     $("#nav-2").animate({top:0},400);
 } else if ($(window).scrollTop() < 200 && !nav2IsHidden ){
     //hide
     nav2IsHidden = true;
     console.log('hide2');
     $("#nav-2").animate({top:"-60px"} , 400);
 }
});