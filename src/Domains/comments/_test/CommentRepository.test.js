const CommentRepository = require('../CommentRepository')

describe('CommentRepository interface',  () => {
    it('should throw error when invoke abstract behavior',  async () => {
        const commentRepository = new CommentRepository();

        await expect(commentRepository.addComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(commentRepository.verifyUserComment('', '')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(commentRepository.deleteComment('','','')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    });
});

