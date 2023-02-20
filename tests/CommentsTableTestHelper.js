/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
	async addComment({
		userId = "user-123",
		threadId = "thread-id_test",
		commentId = "comment-id_test",
		content = "comment content test",
	}) {
		const query = {
			text: "INSERT INTO comments(owner, thread, id, content) VALUES($1, $2, $3, $4) RETURNING id, content, owner",
			values: [userId, threadId, commentId, content],
		};

		await pool.query(query);
	},

	async findCommentById(id) {
		const query = {
			text: "SELECT * FROM comments WHERE id = $1",
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows;
	},

	async cleanTable() {
		await pool.query("DELETE FROM comments WHERE 1=1");
	},
};

module.exports = CommentsTableTestHelper;
