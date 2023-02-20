class DetailComment {
	constructor(payload) {
		this._verifyPayload(payload);
		const { id, content, date, username, isDelete } = payload;
		this.id = id;
		this.content = content;
		this.date = date;
		this.username = username;
		this.isDelete = isDelete;
	}

	_verifyPayload({ id, content, date, username, isDelete }) {
		if (!id || !content || !date || !username) {
			throw new Error("DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
		}

		if (
			typeof id !== "string" ||
			typeof content !== "string" ||
			typeof date !== "string" ||
			typeof username !== "string" ||
			typeof isDelete !== "boolean"
		) {
			throw new Error("DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
		}
	}
}

module.exports = DetailComment;
