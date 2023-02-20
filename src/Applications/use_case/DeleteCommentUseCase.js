class DeleteCommentUseCase {
	constructor({ threadRepository, commentRepository }) {
		this._threadRepository = threadRepository;
		this._commentRepository = commentRepository;
	}

	async execute(userId, threadId, commentId) {
		await this._threadRepository.checkAvailabilityThread(threadId);
		await this._commentRepository.deleteComment(userId, threadId, commentId);
		await this._commentRepository.verifyUserComment(userId, commentId);
	}
}

module.exports = DeleteCommentUseCase;
