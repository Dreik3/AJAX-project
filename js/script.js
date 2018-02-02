
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

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ', '+ cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location= ' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //my solution on background
/*    btn.onclick = function replaceData(){
        debugger;
        var backGroundImage = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=%streetData%, %cityData%">';
        var formattedBackGroundImage0 = backGroundImage.replace("%streetData%", document.getElementById("street").value);
        var formattedBackGroundImage1 = formattedBackGroundImage0.replace("%cityData%", document.getElementById("city").value);
        $body.append(formattedBackGroundImage1);
    };*/

    // NYTimes AJAX request
    var articles = [];
    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
                     cityStr + "&sort=newest&api-key=f86c9602f8fb402fbd09ba323bfbe585";

    $.getJSON(nytimesUrl, function(data){
        /*console.log(data.response);*/
        $nytHeaderElem.text("New York Times Artices About " + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="articles"> <a href="' + article.web_url + '">' +
                            article.headline.main + '</a><p>' + article.snippet + '</p></li>');
        };
    })
    .error(function(){
        $nytHeaderElem.text("New York Times Artices Could Not Be Loaded");
    });
    var articleStr="";
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
                  + cityStr + '&format=json&callback=wikiCallback';
    //Wikipedia AJAX reequest
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response){
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++){
                console.log(response);
                articleStr = articleList[i];
                var url = "https://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li> <a href=' + url + '">' +
                            articleStr + '</a></li>');
            };

        }
    });







    return false;
};

$('#form-container').submit(loadData);