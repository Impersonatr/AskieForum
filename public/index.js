

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
