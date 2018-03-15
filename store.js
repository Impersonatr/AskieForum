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

	createForum ({ forumID, forumName, className, classCode, classLocation }){
		console.log(`Add forum ${forumName}`);
		return knex('forum').insert({
			forumID,
			forumName,
			className,
			classCode,
			creationDate,
			classLocation
		});
	},

	authenticateForum ({ passcode }){
		console.log(`Trying to join forum using passcode ${passcode}`);
		return knex('forum').where({ forumID })
			.then(([forum]) => {
				if(!forum) return { success: false };
				return { success: forumID == forum.forumID };
			});
	}
}