var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div class="js-search-results">' +
    '<a class="js-thumbnail-link" href=""><img class="js-result-thumbnail" src=""></a>' +
      '<h3 class="js-video-title"></h3>' +
      '<p>Description: <span class="js-video-description"><span></p>' +
      '<p>More results from <a class="js-channel-link" href="">this channel</a></p>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: "snippet",
    key:"AIzaSyAkcyPEneb19tm3J1BI-0mdjHkj65BXrxY",
    q: searchTerm
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, function(response){
    console.log(response.items[0]);
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
  var videoID = item.id.videoId;
  var channelLink = item.snippet.channelTitle;
  var videoURL = 'https://www.youtube.com/watch?v='+videoID;
  var channelURL = 'https://www.youtube.com/user/'+channelLink;
  template.find(".js-result-thumbnail").attr("src", videoThumbnail);
  template.find(".js-video-title").text(videoTitle);
  template.find(".js-video-description").text(videoDescription);
  template.find(".js-thumbnail-link").attr("href", videoURL);
  template.find(".js-channel-link").attr("href", channelURL);
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

