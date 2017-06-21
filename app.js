var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-result-name" href="" target="_blank"></a> by <a class="js-user-name" href="" target="_blank"></a></h2>' +
     '<p>Number of watchers: <span class="js-watchers-count"></span></p>' +
    '<p>Number of open issues: <span class="js-issues-count"></span></p>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: "snippet",
    key:"AIzaSyAkcyPEneb19tm3J1BI-0mdjHkj65BXrxY",
    q: searchTerm
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, function(response){
    console.log(response);
  });
}

// change the parantheses
// Template string - function that recieves data
//response.items with snippets
//.map() throught html items
function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(items.snippet.title);
  template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);
  template.find(".js-watchers-count").text(result.watchers_count);
  template.find(".js-issues-count").text(result.open_issues);
  return template;
}

function displayYoutubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
