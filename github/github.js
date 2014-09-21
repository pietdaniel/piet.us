$(document).ready(function() {
  // total = []
  // $.get( "https://api.github.com/events?page=1", function( data ) {
  //   total = total.concat(data)
  //   $.get( "https://api.github.com/events?page=2", function( data ) {
  //     total = total.concat(data)
  //     $.get( "https://api.github.com/events?page=3", function( data ) {
  //       total = total.concat(data)
  //       console.log(total)
  //     });
  //   });
  // });

  function q(i, acc) {
    if (i != 0) {
      console.log(i);
      $.get( "https://api.github.com/events?page="+i, function( data ) {
        acc = acc.concat(data);
        q(i-1, acc)
      });
    } else {
      console.log(acc)
      return acc
    }
  }

  totals = q(10,[])
  console.log(totals)
});
