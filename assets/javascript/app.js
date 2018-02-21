$(document).ready(function(){
///////////////////////////////////////////////

	$("#game").hide();
	$("#final").hide();
	$("#solution").hide();

	////////////////////////////////////////
	//variables
	var X;
	var index = 0;
	var match = 0;
	var countdownTimer = {
		time : 15,
		reset: function() {
			this.time = 15;
			$('#timer').html('<h3> <span id="timeNum"> ' + this.time + '</span> seconds remaining </h3>');
		},
		start: function() {
			counter = setInterval(countdownTimer.count, 1000);	
		},
		stop: function() {
			clearInterval(counter);
		},
		count: function() {
			countdownTimer.time--;
			if (countdownTimer.time > 0) {
				$('#timer').html('<h3><span id="timeNum">' + countdownTimer.time + '</span> seconds remaining</h3>');
			} else {
				wrong();
				index++;
				if (index < content.length) {
					loadQ(index);
				} else {
					X = setTimeout(function() {
						endSequence(match);
					}, 2000);
				}
			}
		} /*count*/
	}; /*countdownTimer*/

	//array of objects with question, answer and answer index properties
	var content = [
		{
			q: "Who was the first president under Articles of Confederation in 1781?",
			a: ["George Washington", " John Hanson", " Jefferson Davis", " John Adams"],
			aI: 1
		},
		{
			q: "How many meters are in a mile?",
			a: ["1500", "1760", "1609", "5280"],
			aI: 2
		},
		{
			q: "Which one does not belong?",
			a: ["Squirtle", "Charmander", "Bulbasaur", "Lexar"],
			aI: 3
		},
		{
			q: 'Who sings the song "I Kissed a Girl"?',
			a: ["Carly Rae Jepsen", "Miley Cyrus", "Ke$ha", "Katy Perry"],
			aI: 3
		},
		{
			q: "How many members are there in the US congress?",
			a: ["100", "535", "435", "Depends on Year"],
			aI: 1
		},
		{
			q: "What company developed the arcade game Street Fighter?",
			a: ["Nintendo", "Sega", "Capcom", "Konami"],
			aI: 2
		},
		{
			q: "When was the Constitution ratified?",
			a: ["1787", "1776", "1781", "1789"],
			aI: 0
		},
		{
			q: "How many strings does a typical pedal or concert Harp have?",
			a: ["38", "50", "40", "47"],
			aI: 3
		},
		{
			q: "In addition to Courage and Wisdom, What is the final piece of the Triforce?",
			a: ["Power", "Link", "The Force", "Serenity"],
			aI: 0
		},
		{
			q: "A Rubiks cube has 26 visable pieces, how many border only two sides?",
			a: ["12", "8", "26", "6"],
			aI: 0
		}
	]; //end content

	//end variables
	/////////////////////////////////////////////

	////////////////////////////////
	// functions

	// starts a new game
	function init(){
		index = 0;
		match = 0;
		$("#game").show();
		countdownTimer.start();
		loadQ(index);
	}

	//loads the html buttons with content
	function loadQ(i) {
		countdownTimer.reset();
		$("#question").html("<span>" + content[i].q + "</span");
		$("#buttonA").html("<div>" + content[i].a[0] + "</div>");
		$("#buttonB").html("<div>" + content[i].a[1] + "</div>");
		$("#buttonC").html("<div>" + content[i].a[2] + "</div>");
		$("#buttonD").html("<div>" + content[i].a[3] + "</div>");	
	}

	function wrong(){
		countdownTimer.stop();
		$("#game").hide();
		$("#solution").html("<div> Wrong! The answer was " + content[index].a[content[index].aI] + ".</div>");
		$("#solution").show();
		X = setTimeout(function() {
			countdownTimer.start();
			$("#game").show();
			$("#solution").hide();
		}, 2000);
	}

	function right() {
		match++
		countdownTimer.stop();
		$("#game").hide();
		$("#solution").html("<div> Correct! The answer was " + content[index].a[content[index].aI] + ".</div>");
		$("#solution").show();
		X = setTimeout(function() {
			countdownTimer.start();
			$("#game").show();
			$("#solution").hide();
		}, 2000);
	}

	//passes in match and incorrect
	function endSequence(y) {
		clearTimeout(X);
		countdownTimer.stop();
		$("#game").hide();
		$("#solution").hide();
		$("#final").show();
		$("#score").html("<div> You scored " + y + " out of " + content.length + " correct. </div>");
		$("#score").show();
	}

	//end functions
	//////////////////////////////////////////////////

	/////////////////////////////////////////////////////////
	//event listeners

	$("#start").on("click", function() {
		$("#title").hide();
		init();
	});

	$('.optionButton').on('click', function() {

		//sets the user input to an index number so we can compare to answer
		var UI;
		if(this.id == "buttonA") {
			UI = 0;
		} else if(this.id == "buttonB") {
			UI = 1;
		} else if(this.id == "buttonC") {
			UI = 2;
		} else if(this.id == "buttonD") {
			UI = 3;
		}

		//checks answer
		if (UI === content[index].aI) {
			right();
		} else { wrong();}

		//starts next Question
		index++;
		if (index < content.length) {
			loadQ(index);	
		} else {
			X = setTimeout(function() {
				endSequence(match);
			}, 2000);
		}
	});// option button event listener 

	$("#reset").on("click", function() {
		$("#final").hide();
		init();
	});

	//end event listeners
	//////////////////////////////////////////////////

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
});//end document on ready