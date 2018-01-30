
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    //$body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location= %streetData%, %cityData%">');

    /*var streetStr = document.getElementById("street").value;*/
    /*var cityStr = document.getElementById("city").value;*/
    /*console.log(streetStr, cityStr);*/

    btn.onclick = function replaceData(){
        debugger;
        var backGroundImage = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=%streetData%, %cityData%">';
        var formattedBackGroundImage0 = backGroundImage.replace("%streetData%", document.getElementById("street").value);
        var formattedBackGroundImage1 = formattedBackGroundImage0.replace("%cityData%", document.getElementById("city").value);
        $body.append(formattedBackGroundImage1);

    };

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);