const knex = require('knex')(require('./knexfile'));

module.exports = {
	createUser ({ firstName, lastName, username, password }){
		console.log(`Add user ${username} with password ${password}`);
		return knex('user').insert({
			firstName,
			lastName,
			username,
			password
		}).debug()
	},

	authenticateUser ({ username, password }){
		console.log(`Authenticating user ${username}`);
		return knex('user').where({ username })
			.then(([user]) => {
				if(!user) return { success: false };
				return { success: password == user.password };
			});
	},

	createForum ({ forumName, className, classCode, classLocation }){
		console.log(`Add forum ${forumName}`);
		var creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
		var hostID = 1;
		return knex('forum').insert({
			forumName,
			className,
			classCode,
			creationDate,
			classLocation,
			hostID
		});
	},

	authenticateForum ({ passcode }){
		console.log(`Trying to join forum using passcode ${passcode}`);
		return knex('forum').where({ passcode })
			.then(([forum]) => {
				if(!forum) return { success: false };
				return { success: passcode == forum.classCode };
			});
	},

	postQuestion ({ title, body, anonymous, urgency }){
		console.log(`Trying to post a question`);
		var postTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
		return knex('question').insert({
			title,
			postTime,
			body,
			anonymous,
			urgency
		}).debug();
	},

	postAnswer ({ body, anonymous }){
		console.log(`Trying to post an answer`);
		var postTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
		return knex('response').insert({
			postTime,
			body,
			anonymous
		}).debug();
	}
}