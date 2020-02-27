function checker(argument, id) {
    if (argument==0) {
        $("#letter"+id).css('color', 'red');
    }
    else {
        console.log(counter);
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
var words = ['Λεμόνι', 'Σοκολάτα', 'Μάθημα', 'Φαγητό', 'Φεγγάρι', 'Σαύρα', 'Φυστίκι', 'Παγωτό', 'Σαμπέρ', 'Ιωάννα', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'];
var counter=0;

function next_round(word) {
    $("#alx_word").html('');
    for (var i=0; i<word.length; i++) {
        if (change_tonos(word[i])==word[i]) 
            $("#alx_word").append("<span id='letter" + i + "' onclick='checker(0, " + i + ");'>" + change_tonos(word[i]) + "</span>");
        else
            $("#alx_word").append("<span id='letter" + i + "' onclick='checker(1, " + i + ");'>" + change_tonos(word[i]) + "</span>");
    }
    $( "#alx_word" ).removeAttr( "style" ).hide().fadeIn();
}

$( document ).ready(function() {
    next_round(words[counter]);
        
});