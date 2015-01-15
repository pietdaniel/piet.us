var linkSelector=Math.floor(Math.random()*10%5);
console.log(linkSelector)
console.log("Welcome to piet.us!")
$(document).ready(function() {
  $('#hello').hide();
  $('#code').hide()
  $('#weird').hide()

  $('#countdown').aTime({
    "font-size" : "16px",
  });
    $("#hello").fadeIn("slow",function(){
        $("#code").fadeIn(1200, function() {
                    $("#weird").delay(1600).fadeIn(14800);
                    if (linkSelector==0) {
                      $("#link").attr("href",'http://piet.us/game.html')
                    }
                    if (linkSelector==1) {
                      $("#link").attr("href",'http://piet.us/note/')
                    }
                    if (linkSelector==2) {
                      $("#link").attr("href",'http://piet.us/randomwalk/')
                    }
                    if (linkSelector==3) {
                      var imageSelector = Math.floor((Math.random()*100)%17+1)
                      $("#link").attr("href","glitched/"+imageSelector+".png") 
                    }
                    if (linkSelector==4) {
                      $("#link").attr("href",'http://piet.us/chat/')
                    }
                })
        })
    });
});
