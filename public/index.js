

function unhideForumQuestionPost() {
	var element = document.getElementById("forum-question-post");
	hideForumAnswerPost();
	element.classList.remove('hidden');
}

function hideForumQuestionPost() {
	var element = document.getElementById("forum-question-post");
	element.classList.add('hidden');
}

function unhideForumAnswerPost() {
	var element = document.getElementById("forum-answer-post");
	hideForumQuestionPost();
	element.classList.remove('hidden');
}

function hideForumAnswerPost() {
	var element = document.getElementById("forum-answer-post");
	element.classList.add('hidden');
}

function validateSignupForm() {
    var user = document.forms["signupForm"]["username"].value;
    var first = document.forms["signupForm"]["fName"].value;
    var last = document.forms["signupForm"]["lName"].value;
    var email = document.forms["signupForm"]["Email"].value;
    var pass = document.forms["signupForm"]["password"].value;
    var conf = document.forms["signupForm"]["confirm"].value;
    if (first == "") {
    	alert("First Name must be filled out");
        return false;
    }
    if (last == "") {
    	alert("Last Name must be filled out");
        return false;
    }
    if (email== "") {
    	alert("Email must be filled out");
        return false;
    }
    if (user == "") {
        alert("Username must be filled out");
        return false;
    }
    if (pass == "") {
    	alert("Password must be filled out");
        return false;
    }
    if (pass != conf) {
    	alert("Passwords don't match!");
        return false;
    }
}

function validateLoginForm() {
    var user = document.forms["loginForm"]["username"].value;
    var pass = document.forms["loginForm"]["password"].value;

    if (user == "") {
        alert("Username must be filled out");
        return false;
    }
    if (pass == "") {
    	alert("Password must be filled out");
        return false;
    }
}
