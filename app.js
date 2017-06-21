var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div class="js-search-results">' +
    '<img class="js-result-thumbnail" src="">' +
      '<h3 class="js-video-title"></h3>' +
      //'<p>Number of views: <span class="js-video-views"></span></p>' +
      '<p>Description: <span class="js-video-description"><span></p>' +
  '</div>'
  //'<div>' +
    //'<h2>' +
    //'<a class="js-result-name" href="" target="_blank"></a> by <a class="js-user-name" href="" target="_blank"></a></h2>' +
    // '<p>Number of watchers: <span class="js-watchers-count"></span></p>' +
    //'<p>Number of open issues: <span class="js-issues-count"></span></p>' +
  //'</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: "snippet",
    key:"AIzaSyAkcyPEneb19tm3J1BI-0mdjHkj65BXrxY",
    q: searchTerm
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, function(response){
    displayYoutubeSearchData(response);
    
  });
}

function displayYoutubeSearchData(data) {
  var results = data.items.map(function(item) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}


function renderResult(item) {
  var template = $(RESULT_HTML_TEMPLATE);
  var videoThumbnail = item.snippet.thumbnails.default.url;
  var videoTitle = item.snippet.title;
  var videoDescription = item.snippet.description;
  template.find(".js-result-thumbnail").attr("src", videoThumbnail);
  template.find(".js-video-title").text(videoTitle);
  //template.find(".js-video-views").text(result.watchers_count);
  template.find(".js-video-description").text(videoDescription);
  return template;
}


function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var inputElement = $(event.currentTarget).find('.js-query');
    var inputValue = inputElement.val();
    getDataFromApi(inputValue, displayYoutubeSearchData);
    inputElement.val("");
  });
}

$(watchSubmit);

