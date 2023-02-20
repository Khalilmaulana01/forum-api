const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const DeleteCommentUseCase = require("../../use_case/DeleteCommentUseCase");

describe("DeleteCommentUseCase", () => {
	it("should orchestrating the delete comment action correctly", async () => {
		const userId = "user-id_test";
		const threadId = "thread-id_test";
		const commentId = "comment-id_test";

		const mockThreadRepository = new ThreadRepository();
		const mockCommentRepository = new CommentRepository();

		mockThreadRepository.checkAvailabilityThread = jest
			.fn()
			.mockImplementation(() => Promise.resolve());
		mockCommentRepository.deleteComment = jest
			.fn()
			.mockImplementation(() => Promise.resolve());
		mockCommentRepository.verifyUserComment = jest
			.fn()
			.mockImplementation(() => Promise.resolve());

		// !!!!! NOTE !!!!!!
		mockCommentRepository.test = jest
			.fn()
			.mockImplementation(() => Promise.resolve());

		const deleteCommentUseCase = new DeleteCommentUseCase({
			threadRepository: mockThreadRepository,
			commentRepository: mockCommentRepository,
		});

		await expect(
			deleteCommentUseCase.execute(userId, threadId, commentId)
		).resolves.not.toThrowError();
		expect(mockThreadRepository.checkAvailabilityThread).toBeCalledWith(
			threadId
		);
		expect(mockCommentRepository.deleteComment).toBeCalledWith(
			userId,
			threadId,
			commentId
		);
		expect(mockCommentRepository.verifyUserComment).toBeCalledWith(
			userId,
			commentId
		);
	});
});
