$(document).ready(function(){
  $("#move").click(function(){
    $("#hand").empty()
    $("#game").empty()
    $.get("http://127.0.0.1:5000/rummikub/move", function(data, status){
      // alert("Data: " + data + "\nStatus: " + status);
      var data_parsed = JSON.parse(data)
      console.log(data_parsed)
      hand = data_parsed["Player"].sort(function(a, b) {
        a = a[0];
        b = b[0];

        return a < b ? -1 : (a > b ? 1 : 0);
      });
      gameboard = data_parsed["Gameboard"]

      for(i=0;i<hand.length; i++){
        element = hand[i]
        // console.log(element)
        $("#hand").append("<div class=\"gamechip\" style=\"color:"+element[1]+"\">"+element[0]+"</div>")
      }

      for(i=0;i<gameboard.length; i++) {
        street = gameboard[i]
        // console.log(street)
        $("#game").append("<div id=\"street_"+i+"\"></div>")
        for(j=0;j<street.length;j++){
          element = street[j]
          $("#street_"+i).append("<div class=\"gamechip\" style=\"color:" + element[1] + "\">" + element[0] + "</div>")
        }
        // $("#game").append("<div class=\"gamechip\" style=\"color:" + element[1] + "\">" + element[0] + "</div>")
      }
    });
    // $(this).hide();
  });
});
//restart game
$(document).ready(function(){
  $("#start").click(function(){
    $("#hand").empty()
    $("#game").empty()
    $.get("http://127.0.0.1:5000/rummikub/start", function(data, status){
      // alert("Data: " + data + "\nStatus: " + status);
      var data_parsed = JSON.parse(data)
      hand = data_parsed["Player"]
      gameboard = data_parsed["Gameboard"]

      for(i=0;i<hand.length; i++){
        element = hand[i]
        // console.log(element)
        $("#hand").append("<div class=\"gamechip\" style=\"color:"+element[1]+"\">"+element[0]+"</div>")
      }

      for(i=0;i<gameboard.length; i++) {
        street = gameboard[i]
        // console.log(street)
        $("#game").append("<div id=\"street_"+i+"\"></div>")
        for(j=0;j<street.length;j++){
          element = street[j]
          $("#street_"+i).append("<div class=\"gamechip\" style=\"color:" + element[1] + "\">" + element[0] + "</div>")
        }
        // $("#game").append("<div class=\"gamechip\" style=\"color:" + element[1] + "\">" + element[0] + "</div>")
      }
    });
    // $(this).hide();
  });
});
