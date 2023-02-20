const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const AddComment = require('../../../Domains/comments/entities/AddComment')
const AddedComment = require('../../../Domains/comments/entities/AddedComment')
const AddCommentUseCase = require('../AddCommentUseCase')

describe('AddCommentUseCase',  () => {
    it('should orchestrating the AddComment Action correctly', async () => {
        const userId = 'user-id_test';
        const threadId = 'thread-id_test';
        const useCasePayload = {
            content: 'comment content test'
        }

        const expectedAddedComment = new AddedComment({
            id: 'comment-id_test',
            content: useCasePayload.content,
            owner: userId,
        });

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve())
        mockCommentRepository.addComment = jest.fn(() => Promise.resolve(
            new AddedComment({
                id: 'comment-id_test',
                content: useCasePayload.content,
                owner: userId,
            })
        ));

        const addCommentUseCase = new AddCommentUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        })

        const addComment = await addCommentUseCase.execute(userId, threadId, useCasePayload)

        expect(addComment).toStrictEqual(expectedAddedComment)
        expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment(userId, threadId, useCasePayload))
        expect(mockThreadRepository.checkAvailabilityThread).toBeCalledWith(threadId)
    });
});