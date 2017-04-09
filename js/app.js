//Initializing everything.
$(document).ready(function () {
	$('#giantbomb-header').hide();
	$('#youtube-header').hide();
	$('.inputBox').submit(function(event) {
		event.preventDefault();
		searchTerm = $('#SearchInput').val();
		getResults(searchTerm);
		$('#SearchInput').val('');
	});
});

var searchTerm 

//Write to HTML with search results.
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

//Sends and retrieves results from respective API.
var getResults = function(searchTerm) {

	var paramsYouTube = {
		part: 'snippet',
		key: 'AIzaSyBA2isVfGr3uYzEiI5uxCNiogM_sN4YuFE',
		q: searchTerm + 'nes',
		channelId: 'UCVi6ofFy7QyJJrZ9l0-fwbQ', 
		maxResults: 5,
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, paramsYouTube, function(data) {
			showYouTubeResults(data.items);
		});

	var paramsGiantBomb = {
		api_key: '912260797eff36659697647070cb48136b0775e2',
		format: 'jsonp',
		query: searchTerm,
		filter: "platforms:21,name:" + searchTerm + ",sort:asc",
		limit: '5',
		json_callback: 'showGiantBombResults',
	};

	$.ajax({
		url: "https://www.giantbomb.com/api/games",
		data: paramsGiantBomb,
		dataType: "jsonp",
		type: "GET",
	})

	.fail(function(jqXHR, error) {
		console.log(error);
	});
}

//Display GiantBomb results.
function showGiantBombResults(result) {
	var html = "";
	var row = $('<div>', {"class":"row"});
	$('#giantbomb-header').show();
	$('.search-results-gamebomb').empty();

	$.each(result.results, function(index, value) {
		var col = $('<div>', {"class":"col-md-2"});
		col.append('<div class="search-returns-gamebomb"><a href="' + value.site_detail_url + '"target="_blank""><img src=' + value.image.thumb_url + '></a><p>' + value.name + '</p></div>');
		row.append(col);
		if ((index + 1) % 5 == 0) {
			$('.search-results-gamebomb').append(row);
			row = $('<div>', {"class":"row"}); 
		}
	});

	if(row.children().length > 0) {
			$('.search-results-gamebomb').append(row);
		}

	$('.row').each(function(index, row) {
		$(this).children('.col-md-2').first().addClass('col-md-offset-1');

	});

	var searchResults = showSearchResults(searchTerm, result.results.length);
		$('#search-results-number-gamebomb').html(searchResults);
	
}

//Display YouTube results.
function showYouTubeResults(items) {
	var html = "";
	var row = $('<div>', {"class":"row"});
	$('#youtube-header').show();
	$('.search-results-youtube').empty();

	$.each(items, function(index, value) {
		var col = $('<div>', {"class":"col-md-2"});
		col.append('<div class="search-returns-youtube"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '"target="_blank""><img src=' + value.snippet.thumbnails.default.url + '></a><br>' + value.snippet.title + '</div>');
		row.append(col);
		if ((index + 1) % 5 == 0) {
			$('.search-results-youtube').append(row);
			row = $('<div>',{"class":"row"});
		}
	});

	if(row.children().length > 0) {
		$('.search-results-youtube').append(row);
	}

	$('.row').each(function(index, row) {
		$(this).children('.col-md-2').first().addClass('col-md-offest-1');
	});

	var searchResults = showSearchResults(searchTerm, items.length);
	$('#search-results-number-youtube').html(searchResults);
}