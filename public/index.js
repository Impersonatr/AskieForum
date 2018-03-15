

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

function hideForumAdd() {
    var element1 = document.getElementById("joinForum");
    var element2 = document.getElementById("createForum");
    element1.classList.remove('join-forum-container');
    element2.classList.remove('create-forum-container');
    element1.classList.add('hidden');
    element2.classList.add('hidden');
    
}
function unhideForumAdd() {
    var element1 = document.getElementById("joinForum");
    var element2 = document.getElementById("createForum");
    element1.classList.remove('hidden');
    element2.classList.remove('hidden');
    element1.classList.add('join-forum-container');
    element2.classList.add('create-forum-container');
    
}

function validateSignupForm() {

    var inputs = [
        document.forms["signupForm"]["fName"].value,
        document.forms["signupForm"]["lName"].value,
        document.forms["signupForm"]["Email"].value,
        document.forms["signupForm"]["username"].value,
        document.forms["signupForm"]["password"].value,
        document.forms["signupForm"]["confirm"].value
    ];

    var elements = [
        document.getElementById("sfName"),
        document.getElementById("slName"),
        document.getElementById("sEmail"),
        document.getElementById("susername"),
        document.getElementById("spassword"),
        document.getElementById("sconfirm")
    ];

    // Change color of empty fields and revert for non-empty fields
    var filled = true;
    for (var i = 0; i < inputs.length; i++)
    {
        if (inputs[i] == "")
        {
            elements[i].classList.add('empty');
            filled = false;
        }
        else
        {
            elements[i].classList.remove('empty');
        }
    }
    // Remove unmatch class if password and confirm are the same
    if (inputs[5] == inputs[4])
    {
        elements[4].classList.remove('unmatch');
        elements[5].classList.remove('unmatch');
    }
    // If at least one required field is unfilled, then alert
    if (!filled)
    {
        alert("One or more of the signup fields or empty.  Please fill them!");
    } // Add unmatch class if password and confirm are not the same
    else if (inputs[5] != inputs[4])
    {
        alert("Password and Confirm do not match!");
        elements[4].classList.add('unmatch');
        elements[5].classList.add('unmatch');
        filled = false;
    }
    return filled;
}

function validateLoginForm() {
    var user = document.forms["loginForm"]["username"].value;
    var pass = document.forms["loginForm"]["password"].value;

    var filled = true;
    if (user == "") {
        var element = document.getElementById("username");
        element.classList.add('empty');
        filled = false;
    }
    else
    {
        var element = document.getElementById("username");
        element.classList.remove('empty');
    }
    if (pass == "") {
    	var element = document.getElementById("password");
        element.classList.add('empty');
        filled = false;
    }
    else
    {
        var element = document.getElementById("password");
        element.classList.remove('empty');
    }
    if (!filled)
    {
        alert("One or more of the required fields are empty!");
    }
    return filled;
}

function validateJoinForm() {
    var code = document.forms["joinForm"]["joinPasscode"].value;
    
    if (code == "") {
    	alert("You need to enter a passcode");
        return false;
    }
}

function validateCreateForm() {
    var fName = document.forms["createForm"]["fName"].value;
    var cName = document.forms["createForm"]["cName"].value;
	var code = document.forms["createForm"]["fInCode"].value;

    if (fName == "") {
        alert("Form must have a name!");
        return false;
    }
    if (cName == "") {
    	alert("Class name must be filled out");
        return false;
    }
	if (code == "") {
    	alert("Forum must have a code");
        return false;
    }
}
