$(document).ready(function () {
    //第一部分 設定元素
    var divs = $('.test');
    var dir = 'up'; // wheel scroll direction
    var div = 0; // current div
    // wheelDelta:-120和detail:3 代表向下滚动。wheelDelta:120和detail:-3代表向上滚动。
    
    $(document.body).on('DOMMouseScroll mousewheel', function (e) {
        //第二部分之一 設定偵測滾輪上下的方式 
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            dir = 'down';
        } else {
            dir = 'up';
        }
        // find currently visible div :
        //第二部分之二 設定偵測現在頁面的位置並用索引號表示1~6
        div = -1;
        divs.each(function(i){
            if (div<0 && ($(this).offset().top >= $(window).scrollTop())) {
                div = i;
            }
        });
        //console.log($(window).scrollTop());
        //第二部分之三 用滾輪方法控制頁面的加減
        if (dir == 'up' && div > 0) {
            div--;
        }
        if (dir == 'down' && div < divs.length) {
            div++;
        }
        console.log(div, dir, divs.length);
        //第二部分之四 也好動畫效果後，用.eq方法去將索引號代入，產生滑動效果。
        $('html,body').stop().animate({
            scrollTop: divs.eq(div).offset().top
        }, 500);
        return false;
    });
    $(window).resize(function () {
        $('html,body').scrollTop(divs.eq(div).offset().top);
    });
});


// // $(document).ready(function(){
// //     alert('x');
// // });

// var a = $('.section1');
// var b = $('.section2');
// var c = $('.section3');
// var d = $('.section4');
// var e = $('.section5');
// var f = $('.section6');

// a.remove();
// b.remove();
// c.remove();
// d.remove();
// e.remove();
// f.remove();

// var currentView;
// function showView(newView) {
//     if(currentView){
//         currentView.animate({left:"-100%"}, 400 , function(){
//             this.remove();
//         });
//     }
//     currentView = newView;
//     $('#pageContainer').append(currentView);
//     currentView.css({left:"100%"}).animate({left:0}, 400, function(){

//     });
// }

// $("#link-a").click(function(event){
//   showView(a);
// });
// $("#link-b").click(function(event){
//   showView(b);
// });
// $("#link-c").click(function(event){
//   showView(c);
// });
// $("#link-d").click(function(event){
//   showView(d);
// });
// $("#link-e").click(function(event){
//   showView(e);
// });
// $("#link-f").click(function(event){
//   showView(f);
// });



// 非FireFox浏览器是使用onmousewheel事件，而FireFox浏览器使用DOMMouseScroll事件。

// 非FireFox浏览器使用的是wheelDelta方法判断滚动方向，FireFox浏览器使用的是detail方法判断滚动方向。

      var switchTimer;
      
      
      $(document).ready(function(){
          
      
          // loading
          Pace.on('done',function(){
              setTimeout(function(){
                  $('#loading').fadeOut();
              }, 300);
          });
          setInterval(function(){
              var current = Number($('.pace-progress').attr('data-progress'));
              var w = $('#loading').width() * 0.46 * current / 100 ;
              $('#loading .speed-line').css('padding-left', w + 'px');
              $('#loading .speed-num').text(current);
              
          },100);
          
          
          
      
          // other
      
      
          var md = new MobileDetect(window.navigator.userAgent);
          if(md.mobile() != null){
              location.href = "mobile/";
          }
          
          var toNext = false;
      
          $('#fullpage').fullpage({
              scrollingSpeed: 500,
              onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
                  console.log('slide to ' + index + ' ' + nextSlideIndex);
                  if(index==1 && nextSlideIndex>=1){
                      $('.pagination').stop().fadeIn();
                      $('.pagi-item').removeClass('on').eq(1).addClass('on');
                  }else{
                      $('.pagination').stop().fadeOut();
                  }
                  /* pagination 切換*/
              },
              onLeave: function(index, nextIndex, direction){
                   console.log('section to ' + $('.fp-section').eq(nextIndex-1).find('.fp-slide').index($('.fp-slide.active')));
                   if(nextIndex>1 || (nextIndex==1 && $('.fp-section').eq(nextIndex-1).find('.fp-slide').index($('.fp-slide.active'))>=1)){
                      $('.pagination').stop().fadeIn();
                      $('.pagi-item').removeClass('on').eq(nextIndex).addClass('on');
                   }else{
                       $('.pagination').stop().fadeOut();
                   }
                  /* pagination 切換*/
      
      
                  $('.section').eq(index-1).addClass('leave');
                  var waitTo = 300;
                  
                  if(!toNext){
                      $('.section').eq(index-1).addClass('leaving');
                      window.setTimeout(function(){
                          toNext = true;
                          
                          $('.section').eq(nextIndex-1).addClass('to');
                          $('.section').removeClass('on');
                          if($('nav').attr('data-goslide') != undefined){
                              $.fn.fullpage.moveTo(nextIndex, Number($('nav').attr('data-goslide')));
                              $('nav').removeAttr('data-goslide');
                          }else{
                              $.fn.fullpage.moveTo(nextIndex);
                          }
                      },waitTo);
                      return false;
                  }
                  if(nextIndex==5){
                      clearInterval(switchTimer);
                      $('#sec_5 .sec-bg').css({
                          'background-image':'url(images/section_5_bg-1.jpg)'
                      }).attr('now-bg', 1);
                      
                      switchBg($('#sec_5 .sec-bg'), 'section_5_bg-', 4, 700, 6000);
                  }
                  if(nextIndex == 2){
      
                      
      
                      clearInterval(autoSlideTimer);
                      if(autoSlide) autoSlideTimer = setInterval(autoSlideFunc, 7000);
                  }
                  if(nextIndex == 4){
                      $('.series-block, .series-tabs li').removeClass('on');
                      $('.series-index').addClass('on');
                      
                  }
              },
              afterSlideLoad:function(anchorLink, index, slideAnchor, slideIndex){
                  /*console.log(index);
                  if($('.section.active').has('.fp-slides')){
                      ga('send', 'pageview', $('.section.active .active').attr('data-ga'));
                      console.log("'send', 'pageview', "+$('.section.active .active').attr('data-ga'));
                  }else{
                      ga('send', 'pageview', $('.section.active').attr('data-ga'));
                      console.log("'send', 'pageview', "+$('.section.active').attr('data-ga'));
                  }*/
                  ga('send', 'pageview', $('.section.active .slide.active').attr('data-ga'));
                  console.log("'send', 'pageview', "+$('.section.active .slide.active').attr('data-ga'));
      
                  if(index == 1 && slideIndex == 1) {
                      onVideoSlide = true;
                      $.fn.fullpage.setKeyboardScrolling(false, 'down');
                      playIntroSound();
                  }
                  else {
                      onVideoSlide = false;
                      $.fn.fullpage.setKeyboardScrolling(true, 'down');
                      onSpaceUp();
                      if(introAnimateCanPlay) {
                          if(!useLoopVideo) {
                              player[0].mute();
                          }
                          else {
                              player[0].muted = true;
                          }
                      }
                  }
              },
              afterLoad:function(anchorLink, index){
      
                  if(index == 1 && $('#sec_1-2').hasClass('active')) {
                      onVideoSlide = true;
                      $.fn.fullpage.setKeyboardScrolling(false, 'down');
                      playIntroSound();
                  }
                  else {
                      onVideoSlide = false;
                      $.fn.fullpage.setKeyboardScrolling(true, 'down');
                      onSpaceUp();
                      if(introAnimateCanPlay) {
                          if(!useLoopVideo) {
                              player[0].mute();
                          }
                          else {
                              player[0].muted = true;
                          }
                      }
                  }
      
      
                  toNext = false;
                  if(index==1 &&  indexVideo!=undefined && indexVideo.playVideo!=undefined ) {
                      indexVideo.mute();
                      indexVideo.playVideo();
                  };
                  $('.section').eq(index-1).addClass('on');
                  $('.section').removeClass('to').removeClass('leave').removeClass('leaving');
      
                  /* pageview ga */
                  if(index == 1){
                      ga('send', 'pageview', $('.section.active .slide.active').attr('data-ga'));
                      console.log("'send', 'pageview',  "+$('.section.active .slide.active').attr('data-ga'));
                  }else if(index == 2){
                      ga('send', 'pageview', 'PC_1.'+ nowHistory +'_History');
                      console.log("'send', 'pageview', '" + 'PC_1.'+ nowHistory +'_History' + "'");
                  }else if(index == 4){
                      ga('send', 'pageview', $('.section.active .series-block.on').attr('data-ga'));
                      console.log("'send', 'pageview',  "+$('.section.active .series-block.on').attr('data-ga'));
                  }else{
                      ga('send', 'pageview', $('.section.active').attr('data-ga'));
                      console.log("'send', 'pageview',  "+$('.section.active').attr('data-ga'));
                  }
                  
                  
                  
                  
              },
              afterRender: function(){
                  $('#sec_1-1 .go-btn').click(function(){
                      $.fn.fullpage.moveSlideRight();
                  });
                  $('.next-sec-btn').click(function(){
                      $.fn.fullpage.moveSectionDown();
                  });
              }
          });
          $('.cars-slider').on('init', function(event, slick){
              console.log('init');
              $('.slick-next').attr('data-ga-e', "ga('send', 'event', 'pc', 'click', 'PC_4.0_Select_Vehicle_Btn_Right');");
              $('.slick-prev').attr('data-ga-e', "ga('send', 'event', 'pc', 'click', 'PC_4.0_Select_Vehicle_Btn_Left');");
          });
          $('.cars-slider').slick({
              appendArrows: $('.cars-slider-wrap'),
              
          }).on('beforeChange',function(event, slick, currentSlide, nextSlide){
              console.log(nextSlide)
              var carname = $('.car-slide[data-slick-index="'+nextSlide+'"]').data('carname');
              $('.cars-display .car-name').hide().css('background-image','url(images/carname-'+carname+'.png)').fadeIn();
          });
          
      
      
      
          switchBg($('#sec_5 .sec-bg'), 'section_5_bg-', 4, 700, 3000);
      
      
          //menu
          $('.menu-btn').click(function(){
              $(this).toggleClass('open');
              $('nav').toggleClass('open');
      
              if($(this).hasClass('open')){
                  
                  /* logo click ga */
                  var code = 'PC_';
                  switch($('.section').index($('.section.on'))){
                      case 0:
                          if($('#sec_1-2').hasClass('active')){
                              code = 'PC_0.1';
                          }else{
                              code = 'PC_0.0';
                          }
                          
                      break;
                      case 1:
                          code = 'PC_1.' + nowHistory;
                      break;
                      case 3:
                          code = 'PC_3.' + $('.series-block').index($('.series-block.on'))
                      break;
                      default:
                          code = 'PC_' + $('.section').index($('.section.on')) + '.0';
                  }
                  ga('send', 'event', 'pc', 'click', code +'_Hamburger_Menu');
                  console.log("ga('send', 'event', 'pc', 'click', '"+ code +"_Hamburger_Menu')");
      
                  ga('send', 'pageview', 'PC_Menu_Expanded');
                  console.log("'send', 'pageview', 'PC_Menu_Expanded'");
      
              }else{
                  ga('send', 'pageview', 'PC_Close_Expanded_Menu');
                  console.log("'send', 'pageview', 'PC_Close_Expanded_Menu'");
              }
      
              
      
          });
          $('header .logo').click(function(){
              //$('.nav-btn').eq(0).click();
              $('nav').attr('data-goslide', '0');
              $.fn.fullpage.moveTo('SEC-0','0');
          });
          $('.nav-btn, .pagi-item a').click(function(){
              $('.menu-btn').removeClass('open');
              $('nav').removeClass('open');
      
              if($(this).is('nav .nav-btn')){
                  ga('send', 'pageview', 'PC_Close_Expanded_Menu');
                  console.log("'send', 'pageview', 'PC_Close_Expanded_Menu'");
              };
      
              if($(this).attr('data-slide') != undefined){
                  $('nav').attr('data-goslide', $(this).attr('data-slide'));
                  $.fn.fullpage.moveTo($(this).attr('data-sec'), Number($(this).attr('data-slide')));
              }else{
                  $.fn.fullpage.moveTo($(this).attr('data-sec'));
              }
              
              
          });
          //- $('.pagi-item').click(function(){
          //-     if($(this).attr('data-slide') != undefined){
          //-         $('nav').attr('data-goslide', $(this).attr('data-slide'));
          //-         $.fn.fullpage.moveTo($(this).attr('data-sec'), Number($(this).attr('data-slide')));
          //-     }else{
          //-         $.fn.fullpage.moveTo($(this).attr('data-sec'));
          //-     }
              
          //- });
      
      
          // 1.0 control
      
          var mouseDown = false;
          var tempMouse = {x:0,y:0};
          var nowMouse = {x:0,y:0};
          var start = 0;
          var startTime = 0;
          var endTime = 0;
          var endPos;
          var moveDir;
          var upGo = 0;
          var nowHistory = 0;
      
          var autoSlideTimer;
          var autoSlide = true;
      
          var hpara = $('.hparallax-wrap');
          var hparaContainer = hpara.find('.hparallax-container');
          hparaContainer.attr('data-x',0);
      
          
      
          // init objs
          
          $(window).resize(function(){
              hparaContainer.children().width(hpara.width());
              hparaContainer.width(hpara.width() * hparaContainer.children().length);
              start = hparaContainer.offset().left;
              updateMove(hparaContainer.offset().left);
              hparaContainer.animate({'transform':'translate('+hparaContainer.offset().left+',0)'}, 10, function(){
                  hparaContainer.children().each(function(){
                      //console.log($(this).offset());
                      $(this).attr('data-pos', ($(this).offset().left - hparaContainer.children().first().offset().left) * -1);
                  });
                  $('.timeline-arrow').each(function(){
                      var no = $(this).parent().attr('data-go');
                      var dis;
                      if(no < hparaContainer.children().length){
                          dis = hparaContainer.children().eq(no).offset().left - hparaContainer.children().eq(no-1).offset().left;
                          
                      }else{
                          dis = 0;
                      }
                      $(this).attr('data-dis', dis);
                  });
      
                  endPos = Number(hparaContainer.children().last().attr('data-pos'));
                  console.log(endPos);
                  updateMove(hparaContainer.offset().left);
              });
              
              //- hparaContainer.attr('data-x', hparaContainer.offset().left)
              //- start = hparaContainer.attr('data-x');
              //- hparaContainer.trigger('moving');
          }).resize();
          
          
      
          $('.history-nav-item').click(function(){
              hparaContainer.addClass('click-move');
              var go = $('.history-block').eq(Number($(this).attr('data-go')) - 1).attr('data-pos');
              go = Number(go);
              hparaContainer.css({'transform': 'translate('+go+'px,0)'});
              var tempX = hparaContainer.css('transform').split(/[()]/)[1];
              tempX = tempX.split(',')[4];
              clickMove();
              
              function clickMove(){
                  var nowX = hparaContainer.css('transform').split(/[()]/)[1];
                  nowX = nowX.split(',')[4];
                  //console.log(tempX+"    "+nowX);
                  if(tempX != nowX){
                      hparaContainer.trigger('moving');
                      //tempNum = nowX;
                      nowMouse.x = nowX;
                      hparaContainer.attr('data-x', nowX);
                      
                  }else{
                      
                  }
                  //console.log('clickmove')
                  if(parseInt(nowX) == parseInt(go)){
                      startMove = false;
                      hparaContainer.removeClass('click-move');
      
                      ga('send', 'pageview', 'PC_1.'+ nowHistory +'_History');
                      console.log("'send', 'pageview', '" + 'PC_1.'+ nowHistory +'_History' + "'");
      
                  }else if(hparaContainer.hasClass('click-move')){
                      requestAnimationFrame(clickMove);
                  }
                  
              }
          });
      
          $(window).on('keyup', function(e){
              if(e.keyCode == 39 && !hparaContainer.hasClass('click-move')){
                  if(nowHistory < 6) $('.history-nav-btn').eq(nowHistory+1).click();
              }else if(e.keyCode == 37 && !hparaContainer.hasClass('click-move')){
                  if(nowHistory >0) $('.history-nav-btn').eq(nowHistory-1).click();
              }
          });
          
          
      
          hparaContainer.on('moving', function(){
              var blocks = $(this).children();
              var pace;
              var timeline;
              blocks.each(function(i, item){
                  
                  var block = $(this);
                  var container = $(this).parent();
                  pace = block.offset().left / container.parent().width();
                  if(Math.abs(pace)<=1.3){
                      $(this).find('*[data-ratio]').each(function(){
                          if($(this).attr('data-left') == undefined) $(this).attr('data-left', parseInt($(this).css('margin-left')));
                          var oriMargin = Number($(this).attr('data-left'));
                          var ratio = Number($(this).attr('data-ratio'));
                          
                          var fixPos = parseInt($(this).css('left')) * (ratio-1) * pace;
                          //var tempOpacity = $(this).attr('data-opacity').split(',');
                          var opPace = block.offset().left / (container.parent().width() * Math.abs(ratio-1));
                          
                          //var fixOp = (1-Math.abs(opPace));
                          //console.log(fixPos);
                          if($(this).parents('.history-block').offset().left>=0){
                              $(this).css({
                                  'opacity': (1-Math.abs(opPace)),
                                  'margin-left': (oriMargin) + (fixPos)+'px'
                              });
                          }
                      });
                      
                      var nowBlock = $('.history-block').index($('.history-block.on'));
                      var nowArrow = $('.timeline-arrow').eq(i);
                      $('.timeline-arrow').hide();
                      $('.timeline-arrow').eq(nowBlock).show();
                      //var tempStep = Number(nowArrow.attr('data-dis')) / nowArrow.parent().width();
                      var arrowPace;
                      
                      if(i>=6){
                          nowArrow.hide();
                          arrowPace = -1 - block.prev().offset().left /  (block.offset().left - block.prev().offset().left);
                          //console.log(i+"_______"+arrowPace);
                      }else{
                          arrowPace = 1 - block.next().offset().left /  (block.next().offset().left - block.offset().left);
                      }
                      var arrowScale = arrowPace * 5;
                      
                      if(arrowScale >= 1) arrowScale = 1;
                      if(arrowPace >= 0.8) arrowScale = (1 - arrowPace) * 5;
                      nowArrow.css({
                          'transform': 'translate(' + ((nowArrow.parent().width()) * arrowPace ) + 'px, 0) scale('+(arrowScale)+')'
                      });
                      if(!hparaContainer.hasClass('click-move')){
                      
                          if(moveDir == 'prev' && arrowPace <= -.3 && arrowPace > -1){
                              //$('.history-nav-item[data-go="'+ (nowBlock+1) +'"] a').click();
                              upGo = i;
                              console.log('half prev1 ' + (upGo));
                              //mouseDown = false;
                          }else if(moveDir == 'prev' && arrowPace > -.3 && arrowPace <=0){
                              upGo = i+1;
                              console.log('half next1 ' + (upGo));
                          }
                          
                          if(moveDir == 'next' && arrowPace >= .3 && arrowPace < 1){
                              //console.log(i + "__" + arrowPace);
                              //$('.history-nav-item[data-go="'+ (nowBlock+2) +'"] a').click();
                              upGo = i+2;
                              console.log(' half next2 ' + (i+2));
                              //mouseDown = false;
                          }else if(moveDir == 'next' && arrowPace < .3 && arrowPace >= 0){
                              upGo = i+1;
                              console.log('half prev2 ' + (i+1));
                          }
                          
                      }
                  }
                  
      
                  if(($(this).offset().left)<=5){
                      $('.history-block').removeClass('on');
                      $(this).addClass('on');
                      $('.history-nav-item').removeClass('on');
                      $('.history-nav-item').eq(i).addClass('on');
                      nowHistory = i;
                  }
      
                  
                  
      
              });
      
              
          });
      
          // drag scroll & 簡易慣性移動
          
          hpara.on('mousedown', function(e){
              
               e.preventDefault();
               autoSlide = false;
              mouseDown = true;
              tempMouse = {
                  x: e.pageX,
                  y: e.pageY
              }
              nowMouse = {
                  x: e.pageX,
                  y: e.pageY
              }
              startTime = new Date().getTime();
              hparaContainer.removeClass('click-move');
              start = hparaContainer.attr('data-x');
              
          });
          
          $(window).on('mousemove', function(e){
              e.preventDefault();
             
              if(mouseDown){
                  var moveTo = 0;
                  nowMouse = {
                      x: e.pageX,
                      y: e.pageY
                  }
                  
                  moveTo = Number(start) + (nowMouse.x - tempMouse.x);
                  //console.log(hparaContainer.children().last())
                  if(moveTo >= 0){
                      moveTo = 0;
                  }else if(moveTo <= endPos){
                      //console.log(endPos);
                      moveTo = endPos;
                  }
                  
                  //console.log('moveTo2 '+moveTo)
                  updateMove(moveTo);
                  
              }
              
              
          });
      
          function updateMove(moveTo){
              if(moveTo >= Number(hparaContainer.attr('data-x'))){
                  moveDir = 'prev';
              }else{
                  moveDir = 'next';
              }
              hparaContainer.css({
                  'transform': 'translate('+moveTo+'px,0)'
              });
              hparaContainer.attr('data-x',moveTo);
              hparaContainer.trigger('moving');
              
                  
              
          }
          var speed;
          $(window).on('mouseup', function(e){
              
              hparaContainer.addClass('tween');
              //endTime = new Date().getTime();
              //speed = ((nowMouse.x-tempMouse.x)/(endTime-startTime)) * 5;
              //console.log(speed);
              if(mouseDown){
                  
                  console.log(upGo - 1);
                  if(!hparaContainer.hasClass('click-move')) $('.history-nav-btn').eq(upGo - 1).click();
                  var f = 0.5;
                  //move();
                  function move(){
                      if(speed!=0) requestAnimationFrame(move);
                      if(speed>f){
                          speed -= f;
                      }else if(speed<(f*-1)){
                          speed += f;
                      }else{
                          speed = 0;
                          return;
                      }
                      //console.log(speed);
                      moveTo = Number(hparaContainer.attr('data-x')) + speed;
                      if(moveTo >= 0){
                          moveTo = 0;
                      }else if(moveTo <= Number(hparaContainer.children().last().attr('data-pos'))){
                          moveTo = Number(hparaContainer.children().last().attr('data-pos'));
                      }
                      updateMove(moveTo);
                  }
      
                  
                  tempMouse = {
                      x: e.pageX,
                      y: e.pageY
                  }
              }
              mouseDown = false;
              //- $('.history-container').addClass('tween');
              console.log('up')
          });
          hpara.on('mouseleave ', function(e){
              
              if(mouseDown) $('.history-nav-btn').eq(upGo - 1).click();
              mouseDown = false;
              //- endTime = new Date().getTime();
              //-  if(mouseDown){
              //-     //- mouseDown = false;
              //-     //- tempMouse = {
              //-     //-     x: nowMouse.x,
              //-     //-     y: nowMouse.y
              //-     //- }
              //-     moveTo = Number(start) + (nowMouse.x - tempMouse.x);
              //-     if(moveTo >= 0){
              //-         moveTo = 0;
              //-     }else if(moveTo <= Number(hparaContainer.children().last().attr('data-pos'))){
              //-         moveTo = Number(hparaContainer.children().last().attr('data-pos'));
              //-     }
              //-     updateMove(moveTo);
              //- }
              //- speed = 0;
              //- mouseDown = false;
              
              //- $('.history-container').addClass('tween');
          });
          // 間隔七秒移動
          function autoSlideFunc(){
              if($('.history-sec').hasClass('on') && !$('#loading').is(':visible') && autoSlide){
                  if(!hparaContainer.hasClass('click-move') && !mouseDown){
                      if(nowHistory < 6){
                          $('.history-nav-btn').eq(nowHistory+1).click();
                      }else{
                          $('.history-nav-btn').eq(0).click();
                      }
                      
                  }
              }
          }
          autoSlideTimer = setInterval(autoSlideFunc, 7000);
          $('.history-sec').on('mousedown',function(){
              autoSlide = false;
              //console.log('disable autoslide');
          })
      
      
      
      
          // 2.0
          $('.spec-ui').hover(function(){
              $('.spec-bg').addClass('over')
          },function(){
              $('.spec-bg').removeClass('over')
          });
          
          $('.spec-slider').on('init', function(event, slick){
              //console.log('init');
              $('.spec-slider-wrap .slick-next').attr('data-ga-e', "ga('send', 'event', 'pc', 'click', 'PC_2.0_Performance_Btn_Right');");
              $('.spec-slider-wrap .slick-prev').attr('data-ga-e', "ga('send', 'event', 'pc', 'click', 'PC_2.0_Performance_Btn_Left');");
          });
          $('.spec-slider').slick({
              appendArrows: $('.spec-slider-wrap'),
              
          });
          //- $('.spec-slider-wrap, .spec-ui').click(function(e){
          //-     //e.stopPropagation();
          //- })
          //- $('.spec-bg').not('.spec-btn').click(function(){
          //-     //if($('.spec-slider').hasClass('on')) $('.spec-slider').removeClass('on');
          //- });
          $('.close-spec-btn').click(function(){
              $('.spec-slider').removeClass('on');
          });
          $('.spec-btn').click(function(e){
              
              var go = $('.spec-btn').index($(this));
              
              if(go == $('.spec-slider').slick('slickCurrentSlide') && $('.spec-slider').hasClass('on')){
                  $('.spec-slider').removeClass('on');
              }else{
                  $('.spec-slider').addClass('on');
              }
              $('.spec-slider').slick('slickGoTo',go);
              //e.stopPropagation();
          });
      
      
          // 3.0
      
          $('.series-tabs a').click(function(){
      
              var thisgacode = $('.series-block').index($('.series-block.on')) + '_'+ $(this).attr('data-name').toUpperCase();
              
              ga('send', 'event', 'pc', 'click', 'PC_3.'+ thisgacode +'_Btn');
              console.log("ga('send', 'event', 'pc', 'click', 'PC_3." + thisgacode + "_Btn'");
      
              $('.series-block, .series-tabs li').removeClass('on');
              $('.series-block.series-' + $(this).attr('data-name')).addClass('on');
              $(this).parent().addClass('on');
      
              ga('send', 'pageview', $('.series-block.on').attr('data-ga'));
              console.log("ga('send', 'pageview', " + $('.series-block.on').attr('data-ga') + "'");
              
          });
      
          
      
          //表格相關
          $('.book-btn').click(function(){
              $('#msgBox,#errBox').hide();
              $('.popup02').show();
              $('.light-box-wrap').fadeIn();
              $('#uCar').val($(this).attr('data-car'));
              ga('send', 'pageview', 'PC_RS_Contact_Form');
              console.log("ga('send', 'pageview', 'PC_RS_Contact_Form'");
          });
          $('.light-box-wrap .check').click(function(){
              $('.light-box-wrap .check').removeClass('active');
              $(this).addClass('active');
          });
         $('.light-box-wrap .close-btn').click(function(){
              if($(this).parent().is('#errBox')) {
                  $('#errBox').fadeOut();
                  return;
              }
              $('.light-box-wrap').fadeOut();
              //-console.log($(this).parent().attr('id'))
              if($(this).parent().is('#msgBox')) {
                  $('nav').attr('data-goslide', '0');
                  $.fn.fullpage.moveTo('SEC-0','0');//$('.nav-btn').eq(0).click();
              }
          });
          $('.popup02 .sub-btn').click(function(e){
              e.preventDefault();
              if($('#uPhone').val().length > 0 && !$('#uPhone').val().match(/^09[0-9]{8}$/)) {
                  $('#errBox .title').text('手機號碼格式錯誤');
                  $('#errBox').fadeIn();
                  return;
              }
              if($('#uEmail').val().length > 0 && !$('#uEmail').val().match(/^[^@]+@[^@.]+(\.[^@.])*\.[^@.]{2,}$/)) {
                  $('#errBox .title').text('電子信箱格式錯誤');
                  $('#errBox').fadeIn();
                  return;
              }
              $.ajax({
                  url: './api.php?submit',
                  method: 'POST',
                  data: {
                      name: $('#uName').val(),
                      age: $('#uAge').val(),
                      tel: $('#uPhone').val(),
                      gender: $('.check_line .active').data('value'),
                      email: $('#uEmail').val(),
                      recarstyle: $('#uCar').val()
                  }
              }).done(function(data) {
                  if(data && data.success == 1) {
                      $('.popup02,#errBox').fadeOut();
                      $('#msgBox').fadeIn();
                      return;
                  }
                  if(data && data.success == 0) {
                      $('#errBox .title').text(data.msg);
                      $('#errBox').fadeIn();
                      return;
                  }
                  $('#errBox .title').text('網路連線失敗，請再試一次');
                  $('#errBox').fadeIn();
              }).fail(function() {
                  $('#errBox .title').text('網路連線失敗，請再試一次');
                  $('#errBox').fadeIn();
              });
              //-$('.popup02,#errBox').fadeOut();
              //-$('#msgBox').fadeIn();
          });
      
      
          
      });
      
      
      
      
      
      function switchBg(secBg, bgName, bgNum, speed, delay){
          secBg.attr('now-bg','1');
          switchTimer = setInterval(function(){
              var nextBg = Number(secBg.attr('now-bg')) + 1;
              if(nextBg>bgNum) nextBg = 1;
              var bgUrl = 'images/' + bgName + nextBg + '.jpg';
              secBg.fadeOut(speed, function(){
                  secBg.css({
                      'background-image':'url('+bgUrl+')'
                  }).attr('now-bg', nextBg);
                  secBg.fadeIn(speed);
              });
          },delay);
      }
    </script>