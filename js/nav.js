//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function(e) {
	$("#main").load("home.html");
	$("nav a").click(function(event) {
		var text = event.target.text;
		console.log(text);

		$("nav li").removeClass("active");
		$(event.target).parent().addClass("active");

		$("#main").empty();
		$(".Chart").remove();
		switch(text) {
			case "Home":
				$("#main").load("home.html");
			case "Design #2":
				$("#main").load("design2.html");
				break;
		}
	})
});
//})