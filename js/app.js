$(document).ready(function () {
	$('.inputBox').submit(function(event) {
		event.preventDefault();
		searchTerm = $('#SearchInput').val();
		console.log(searchTerm);
		getResults(searchTerm);
	});
});

var searchTerm 

var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
	console.log(results);
};

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
			console.log(data);
			console.log(data.items);
		});

	var paramsGiantBomb = {
		api_key: '912260797eff36659697647070cb48136b0775e2',
		format: 'jsonp',
		query: searchTerm,
		//resources: 'games',
		//platforms: '21',
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
		//var errorElem = showError(error);
		//$('.search-results').append(errorElem);
	});
}

function showGiantBombResults(result) {
	console.log(result.results);
	var html = "";
	//var row = $('<div>', {"class":"row"});

	$.each(result.results, function(index, value) {
		var row = $('<div>', {"class":"row"});
		var col = $('<div>', {"class":"col-md-2"});
		col.append('<div class="search-returns-gamebomb"><img src=' + value.image.thumb_url + '><p>' + value.name + '</p></div>');
		row.append(col);
		if ((index + 1) % 5 == 0) {
			$('.search-results-gamebomb').append(row);
			var row = $('<div>', {"class":"row"}); 
		}; 

		if(row.children().length > 0) {
			$('.search-results-gamebomb').append(row);
		};
	});

	$('.row').each(function(index, row) {
		console.log(row);
		$(this).children('.col-md-2').first().addClass('col-md-offset-1');
	});

	var searchResults = showSearchResults(searchTerm, result.results.length);
		$('#search-results-number-gamebomb').html(searchResults);
	$('.search-results-gamebomb').html(html);
}

function showYouTubeResults(items) {
	console.log(items);
	var html = "";
	$.each(items, function(index, value) {
		html += '<div class="search-returns-youtube"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '"target="_blank""><img src=' + value.snippet.thumbnails.default.url + '></a><br>' + value.snippet.title + '<br></div>';
	});
	var searchResults = showSearchResults(searchTerm, items.length);
	$('#search-results-number-youtube').html(searchResults);
	$('.search-results-youtube').html(html);
}