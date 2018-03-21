if(document.querySelector('.CreateUser') != null){
    var CreateUser =  document.querySelector('.CreateUser');
    CreateUser.addEventListener('submit', (e) => {
        console.log('Creating user...');
        e.preventDefault();
        const firstName = CreateUser.querySelector('.firstName').value;
        const lastName = CreateUser.querySelector('.lastName').value;
        const username = CreateUser.querySelector('.username').value;
        const password = CreateUser.querySelector('.password').value;
        post('/createUser', { firstName, lastName, username, password });
        CreateUser.reset();
    });
}

if(document.querySelector('.Login') != null){
    var Login = document.querySelector('.Login');
    Login.addEventListener('submit', (e) => {
        console.log('Attempting login...');
        e.preventDefault();
        const username = Login.querySelector('.username').value;
        const password = Login.querySelector('.password').value;
        post('/login', { username, password })
            .then(({ status }) => {
                if(status == 200) alert('Logged in successfully!');
                else alert('Invalid login credentials.');
            });
    });
}

if(document.querySelector('.JoinForum') != null){
    var JoinForum = document.querySelector('.JoinForum');
    JoinForum.addEventListener('submit', (e) => {
        console.log('Attempting to join forum...');
        e.preventDefault();
        const passcode = JoinForum.querySelector('.passcode').value;
        post('/joinForum', { passcode })
            .then(({ status }) => {
                if(status == 200) alert('Successfully joined forum!');
                else alert('Invalid forum passcode.');
            });
    });
}

if(document.querySelector('.CreateForum') != null){
    var CreateForum = document.querySelector('.CreateForum');
    CreateForum.addEventListener('submit', (e) => {
        console.log('Creating forum...');
        e.preventDefault();
        const forumName = CreateForum.querySelector('.forumName').value;
        const className = CreateForum.querySelector('.className').value;
        const classCode = CreateForum.querySelector('.classCode').value;
        const classLocation = CreateForum.querySelector('.classLocation').value;
        post('/createForum', { forumName, className, classCode, classLocation });
        CreateForum.reset();
    });
}

if(document.querySelector('.PostQuestion') != null){
    var PostQuestion = document.querySelector('.PostQuestion');
    PostQuestion.addEventListener('submit', (e) => {
        console.log('Posting question...');
        e.preventDefault();
        const title = PostQuestion.querySelector('.question-title-input').value;
        const body = PostQuestion.querySelector('.question-text-input').value;
        const anonymous = PostQuestion.querySelector('.anonymous-checkbox').checked;
        var urgency = PostQuestion.querySelector('.question-urgent').value;
        if(urgency == '-') urgency = 0
        post('/postQuestion', { title, body, anonymous, urgency });
    });
}

if(document.querySelector('.postAnswer') != null){
    var postAnswer = document.querySelector('.postAnswer');
    postAnswer.addEventListener('submit', (e) => {
        console('Posting response...');
        e.preventDefault();
        const body = postAnswer.querySelector('.question-text-input').value;
        const anonymous = postAnswer.querySelector('.anonymous-checkbox').checked;
        post('/postAnswer', { body, anonymous });
    });
}

function post(path, data){
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

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