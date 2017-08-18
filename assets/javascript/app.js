//CW
$(document).ready(function(){
///////////////////////////////////////////////
///////////////////////////////////////////////

	$("#game").hide();
	$("#final").hide();

	////////////////////////////////////////
	//variables

	var index = 0;
	var match = 0;
	var incorrect = 0;

	var countdownTimer = {
		time : 10,
		reset: function() {
			this.time = 10;
			$('#timer').html('<h3>' + this.time + ' seconds remaining</h3>');
		},
		start: function() {
			counter = setInterval(countdownTimer.count, 1000);	
		},
		stop: function() {
			clearInterval(counter);
		},
		count: function() {
			countdownTimer.time--;
			if (countdownTimer.time >= 0) {
				$('#timer').html('<h3>' + countdownTimer.time + ' seconds remaining</h3>');
			} else {
				index++;
				incorrect++;
				countdownTimer.reset();
				if (index < content.length) {
					loadQ(index);
				} else {
					endSequence(match);
				}
			}
		} /*count*/
	}; /*countdownTimer*/

	//array of objects with question, answer and answer index properties
	var content = [
		{
			q: "Who was the first president under Articles of Confederation in 1781?",
			a: ["George Washington", " John Hanson", " Jefferson Davis", " Thomas Jefferson"],
			aI: 1
		},
		{
			q: "What company developed the arcade game Street Fighter?",
			a: ["Nintendo", "Sega", "Capcom", "Konami"],
			aI: 2
		},
		{
			q: "When was the Constitution ratified?",
			a: ["1787", "1776", "1781", "1777", "1789"],
			aI: 0
		},
		{
			q: "How many strings does a typical pedal or concert Harp have?",
			a: ["38", "50", "40", "47"],
			aI: 3
		}
		/*{
		q: "",
		a: ["", "", "", ""],
		aI:
		}*/
	]; //end content

	//end variables
	/////////////////////////////////////////////

	////////////////////////////////
	// functions

	//loads the html buttons with content
	function loadQ(i) {
		countdownTimer.reset();
		$("#question").html("<span>" + content[i].q + "</span");
		$("#buttonA").html("<div>" + content[i].a[0] + "</div>");
		$("#buttonB").html("<div>" + content[i].a[1] + "</div>");
		$("#buttonC").html("<div>" + content[i].a[2] + "</div>");
		$("#buttonD").html("<div>" + content[i].a[3] + "</div>");	
	}

	//passes in match and incorrect
	function endSequence(y) {
		countdownTimer.stop();
		$("#game").hide();
		$("#final").show();
		$("#score").html("<div> You scored " + y + " out of 4 correct </div>");
		$("#score").show();
		$("#restart").show();
	}

	//end functions
	//////////////////////////////////////////////////

	/////////////////////////////////////////////////////////
	//event listeners


	$("#start").on("click", function() {
		$("#title").hide();
		countdownTimer.start();
		$("#game").show();
		loadQ(index);
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
		console.log(content.aI);
		if (UI === content[index].aI) {
			match++
		}

		//starts next Question
		index++;
		if (index < content.length) {
			loadQ(index);	
		} else {
			endSequence(match);
		}
	});// option button event listener 

	$("#reset").on("click", function() {
		index = 0;
		match = 0;
		$("#final").hide();
		$("#restart").hide();
		countdownTimer.start();
		$("#game").show();
		loadQ(index);
	});

	//end event listeners
	//////////////////////////////////////////////////

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
});//end document on ready

