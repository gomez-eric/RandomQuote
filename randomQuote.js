let color_object = { "mainColor":"200" , "mainHue":"20", "secondHue":"20", "opacity":"1" };
let twitter_url = "";
let apiurl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
//let apiurl = "http://quotes.stormconsultancy.co.uk/random.json";

var func_getQuote = function(){
  makingPal(); // Randomly generate colors
  // Set the root colors
  $(':root').css({'--daColor': get_hsla_color(color_object.mainHue, color_object.opacity)})
  $(':root').css({'--daBtnColor': get_hsla_color(color_object.secondHue, color_object.opacity-.40)})
  $("#tweeterButton").show();

  $.ajax({
    url: apiurl,
    dataType: 'jsonp',
    success: function(jsonp){
      var string = (JSON.stringify(jsonp));
      var obj = JSON.parse(string);
      console.log(obj);
      var icon = "<span class=\"glyphicon glyphicon-comment\" aria-hidden=\"true\"></span>"
      $(".quote").html(obj.quoteText);
      $(".author").html(icon + " " + obj.quoteAuthor);
      //$(".quoteID").html("ID:" + obj.id);

      // Make URL for tweet
      var theTweetUrl="https://twitter.com/intent/tweet?text=";
      var quoteArray = obj.quoteText.split(" ");
      var authorArray = obj.quoteAuthor.split(" ");
      twitter_url = theTweetUrl;
      twitter_url += quoteArray.join("+");
      twitter_url += "++-";
      twitter_url += authorArray.join("+");
      twitter_url += "++https://goo.gl/76YWfG";


      console.log(twitter_url);
    }
  });


}


$(document).ready(function() {
  $("#tweeterButton").hide();
  $("#getQuote").on("mousedown", func_getQuote);
  $("#getQuote").mousedown();
  $(".jumbotron").addClass("animated bounceIn");

  $("body").keydown(function(e){
    if(e.which === 13){
        $("#getQuote").mousedown();
    }
  });

  $('#tweeterButton').click(function() {
    window.open(twitter_url, '_blank');
  });

});


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

function makingPal(){
  color_object.mainColor = randomColor();
  color_object.mainHue = randomHueValue();
  color_object.secondHue = color_object.mainHue-40 + "%";
  color_object.mainHue = color_object.mainHue + "%";
}

// Make color for background
function get_hsla_color(x,y) {
  var color_return = "";
  //hsla(200, 20%, 20%, 1)
  color_return += "hsla(";
  color_return += color_object.mainColor+", ";
  color_return += x + ", " + x + ", ";
  color_return += y + ")";
  return color_return;
}
