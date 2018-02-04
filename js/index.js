$(document).ready(function() {
  $("a").mouseover(function(data) {
    $(data.target).animate({
      marginLeft:"0.2in",
    }, 400);
  });

  $("a").mouseout(function(data) {
    $(data.target).animate({
      marginLeft:"0.0in",
    }, 400);
  });
});
