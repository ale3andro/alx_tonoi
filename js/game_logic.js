/** FROM https://www.kevinleary.net/javascript-get-url-parameters/
 * JavaScript Get URL Parameter
 * 
 * @param String prop The specific URL parameter you want to retreive the value for
 * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
 */
function getUrlParams( prop ) {
    var params = {};
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var definitions = search.split( '&' );
  
    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );
  
    return ( prop && prop in params ) ? params[ prop ] : params;
  }

function checker(argument, id) {
    if (argument==0) {
        $("#letter"+id).css('color', 'red');
    }
    else {
        if (++counter==words.length){
            $( "#alx_word" ).html("<img src='img/happy_robot.gif' />");
        }
        else {
            $("#letter"+id).css('color', 'green');
            $( "#alx_word" ).hide( "fade", {}, 500, function() {
                next_round(words[counter]);
            });
        }
    }
}

function change_tonos(letter) {
    var letters = [
        ['ά', 'α'],
        ['έ', 'ε'],
        ['ή', 'η'],
        ['ί', 'ι'],
        ['ό', 'ο'],
        ['ύ', 'υ'],
        ['ώ', 'ω']
      ]; 
      for (var j=0; j<letters.length; j++) {
          if (letters[j][0]==letter) 
            return letters[j][1];
      }
      return letter;
}
var words = [];
var counter=0;

function next_round(word) {
    $("#alx_word").html('');
    for (var i=0; i<word.length; i++) {
        if (change_tonos(word[i])==word[i]) 
            $("#alx_word").append("<span class='letter' id='letter" + i + "' onclick='checker(0, " + i + ");'>" + change_tonos(word[i]) + "</span>");
        else
            $("#alx_word").append("<span class='letter' id='letter" + i + "' onclick='checker(1, " + i + ");'>" + change_tonos(word[i]) + "</span>");
    }
    $( "#alx_word" ).removeAttr( "style" ).hide().fadeIn();
}

$( document ).ready(function() {

    $(".nodrag").on("dragstart", function() {
    return false; // Prevents dragging
  });

  if (!('id' in getUrlParams())) {
    $.ajax(
    {   url: "activities/all_activities",
        type: "GET",
        dataType: "text",
        success: function(result) {
            $('#alx_title').html('<h1>Διαθέσιμες δραστηριότητες<h1><br />');
            console.log(result);
            var alldata = result.split('\n');
            for (var i=0; i<alldata.length; i+=2) {
                activity_id = alldata[i].split(".")[0];
                if (alldata[i]!='') {
                    activity_title = alldata[i+1].substring(1, alldata[i+1].length-1);
                    let url = activity_title + ' | <a href="?id=' + activity_id + '">εδώ</a>.<br />';
                    $('#alx_title').html( $('#alx_title').html() + url);
                    console.log(url);
                }
            }
        },
        error: function(xhr, status, error) {
            console.log('FaIlUrE');
            console.log(xhr, status, error);
        } 
    });
    return; 
  } else {
    $.ajax(
    {   
        url: "activities/" + getUrlParams('id') + ".json",
        success: function(data) {
            $('#alx_title').html(data['title']);
            words=data['words'].split('|');
            next_round(words[counter]);
        },
        error: function(xhr, status, error) {
            window.location.href = "http://sxoleio.pw/alx_code/alx_tonoi/";
        } 
        });
  }    
});