$(document).ready(function () {
	$('.inputBox').submit(function(event) {
		event.preventDefault();
		var searchTerm = $('#SearchInput').val();
		console.log(searchTerm);
		getResults(searchTerm);
	});
});

function getResults(searchTerm) {
	var params = {
		api_key: '912260797eff36659697647070cb48136b0775e2',
		format: 'jsonp',
		query: searchTerm,
		resources: 'game',
		json_callback: 'showResults',
	};

	$.ajax({
		url: "http://www.giantbomb.com/api/search",
		data: params,
		dataType: "jsonp",
		type: "GET",
	})

	.done(function(data) {
		console.log(data);
	});
}

function showResults(result) {
	console.log(result);
}