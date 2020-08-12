$(document).ready(function(){
  $("#move").click(function(){
    $("#hand").empty()
    $("#game").empty()
    $.get("http://127.0.0.1:5000/rummikub/move", function(data, status){
      display(data, status);
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
      display(data, status);
    });
    // $(this).hide();
  });
});

//add new empty street
$(document).ready(function(){
  $("#add_street").click(function(){
    $("#game").append("<div id=\"street_"+i+"\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" class=\"street\"></div>")
    i++;
  });
});

//draw new chip
$(document).ready(function(){
  $("#draw").click(function(){
    $("#hand").empty()
    $("#game").empty()
    $.get("http://127.0.0.1:5000/rummikub/draw", function(data, status){
      display(data, status);
    });
    // $(this).hide();
  });
});

//end turn and send gameboard and hand to server
$(document).ready(function(){
  $("#send_gameboard").click(function(){
    let streets = [];
    $('#game').children().each(function () {
      var $currentElement = $(this);
      console.log(this.id); // "this" is the current element in the loop
      let street = [];
      $currentElement.children().each(function(){
        console.log(this.id);
        chip = this.id.split("_");
        if(chip.length != 4){
          console.log("Incorrect length"+chip);
          return;
        }
        street.push([parseInt(chip[1]),chip[2],parseInt(chip[3])]);
      });
      streets.push(street);
    });
    console.log(streets);
    //hand
    let hand = [];
    $('#hand').children().each(function(){
      console.log(this.id);
      chip = this.id.split("_");
      if(chip.length != 4){
        console.log("Incorrect length"+chip);
        return;
      }
      hand.push([parseInt(chip[1]),chip[2],parseInt(chip[3])]);
    });
    console.log(hand);
    let result = { "Player": hand, "Gameboard": streets };
    var myJSON = JSON.stringify(result);
    console.log(myJSON);
    $.post( "http://127.0.0.1:5000/rummikub/receive", {'move': myJSON} , function( data ) {
      alert(data);
    });
  });
});

function display(data, status){

    // console.log("Data: " + data + "\nStatus: " + status);
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
      $("#hand").append("<div id=\"dragdiv_"+element[0]+"_"+element[1]+"_"+element[2]+"\" draggable=\"true\" ondragstart=\"drag(event)\" class=\"gamechip\" style=\"color:"+element[1]+"\">"+element[0]+"</div>")
    }

    for(i=0;i<gameboard.length; i++) {
      street = gameboard[i]
      // console.log(street)
      $("#game").append("<div id=\"street_"+i+"\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\"></div>")
      for(j=0;j<street.length;j++){
        element = street[j]
        $("#street_"+i).append("<div id=\"dragdiv_"+element[0]+"_"+element[1]+"_"+element[2]+"\" draggable=\"true\" ondragstart=\"drag(event)\" class=\"gamechip\" style=\"color:" + element[1] + "\">" + element[0] + "</div>")
      }
      // $("#game").append("<div class=\"gamechip\" style=\"color:" + element[1] + "\">" + element[0] + "</div>")
    }
  }
