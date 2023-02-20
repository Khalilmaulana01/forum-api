const AddComment = require("../../Domains/comments/entities/AddComment");

class AddCommentUseCase {
	constructor({ threadRepository, commentRepository }) {
		this._threadRepository = threadRepository;
		this._commentRepository = commentRepository;
	}

	async execute(userId, threadId, useCasePayload) {
		const addComment = new AddComment(userId, threadId, useCasePayload);
		await this._threadRepository.checkAvailabilityThread(threadId);
		return this._commentRepository.addComment(addComment);
	}
}

module.exports = AddCommentUseCase;
