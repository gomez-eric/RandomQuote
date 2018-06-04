//https://talaikis.com/api/quotes/random/
// daquote ["Quote Will Go Here."]
// getQuote [BUTTON]

//Get color JavaScript Object //{"200" "10%" "10%" "1"};
var colorJSON = '{ "mainColor":"200" , "mainHue":"20", "secondHue":"20", "opacity":"1" }';
var objDaColor = JSON.parse(colorJSON);
// For tiwtter URL
var entireUrl = "";
// All jQuery Functionss

var thisWORK = function(){

  // This test is to retrieve data from the API
  $.getJSON("https://talaikis.com/api/quotes/random/", function(json) {
    // Get string into a variable
    var string = (JSON.stringify(json));
    // Convert string into object
    var obj = JSON.parse(string);
    // For icon
    var icon = "<span class=\"glyphicon glyphicon-comment\" aria-hidden=\"true\"></span>"
    $(".daQuote").html(obj.quote);
    $(".daAuthor").html(icon + " " + obj.author);

    var capCat = obj.cat.toUpperCase();
    $(".daCat").html(capCat);

    // For Main Color
    function randomColor() {
      min = Math.ceil(10);
      max = Math.floor(360);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    // For Hue Value
    function randomHueValue() {
      min = Math.ceil(40);
      max = Math.floor(45);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    // Make color for background
    function getColor() {
      var newColor = "";
      //hsla(200, 20%, 20%, 1)
      objDaColor.mainColor = randomColor();
      objDaColor.mainHue = randomHueValue();
      objDaColor.secondHue = objDaColor.mainHue-40 + "%";
      objDaColor.mainHue = objDaColor.mainHue + "%";
      newColor += "hsla(";
      newColor += objDaColor.mainColor+", ";
      newColor += objDaColor.mainHue+", ";
      newColor += objDaColor.mainHue+", ";
      newColor += objDaColor.opacity+")";
      console.log(newColor);
      return newColor;
    }
    // Make color for button
    function getBtnColor() {
      var newBtnColor = "";
      newBtnColor += "hsla(";
      newBtnColor += objDaColor.mainColor+", ";
      newBtnColor += objDaColor.secondHue+", ";
      newBtnColor += objDaColor.secondHue+", ";
      newBtnColor += objDaColor.opacity-.40 +")";
      console.log(newBtnColor);
      return newBtnColor;
    }
    // Make URL for tweet
    var theTweetUrl="https://twitter.com/intent/tweet?text=";
    var quoteArray = obj.quote.split(" ");
    var authorArray = obj.author.split(" ");
    entireUrl = theTweetUrl;
    entireUrl += quoteArray.join("+");
    entireUrl += "++-";
    entireUrl += authorArray.join("+");
    var tinyurl = "https://goo.gl/76YWfG";
    entireUrl += "++" + tinyurl;
    console.log(entireUrl);
    // Set the root colors
    $(':root').css({'--daColor': getColor()})
    $(':root').css({'--daBtnColor': getBtnColor()})
    $("#tweeterButton").show();
      });
}

$(document).ready(function() {
  /*$("body").addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass("animated fadeIn");
  });*/

  $("#tweeterButton").hide();

  //$("#getQuote").on("click", thisWORK);

  $("#getQuote").on("mousedown", thisWORK);


  $("#getQuote").mousedown();
  $(".jumbotron").addClass("animated bounceIn");

  $("body").keydown(function(e){
    if(e.which === 13){
        $("#getQuote").mousedown();
    }
  });

  $('#tweeterButton').click(function() {
    //window.location=entireUrl;
    window.open(entireUrl, '_blank');
  });



});
