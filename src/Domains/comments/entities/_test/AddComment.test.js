const AddComment = require('../AddComment')

describe('AddComment entities',  () => {
    it('should throw error when "userId" did not contain needed property',  () => {
        const userId = '';
        const threadId = 'thread-id_test';
        const payload = {
            content: 'comment content test'
        };

        expect(() => new AddComment(userId, threadId, payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    });

    it('should throw error when "userId" did not meet data type specification',  () => {
        const userId = 1234;
        const threadId = 'thread-id_test';
        const payload = {
            content: 'comment content test'
        }

        expect(() => new AddComment(userId, threadId, payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should throw error when "threadId" did not contain needed property',  () => {
        const userId = 'user-id_test';
        const threadId = '';
        const payload = {
            content: 'comment content test',
        }

        expect(() => new AddComment(userId, threadId, payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    });

    it('should throw error when "threadId" did not meet data type specification',  () => {
        const userId = 'user-id_test';
        const threadId = 1234;
        const payload = {
            content: 'comment content test'
        }

        expect(() => new AddComment(userId, threadId, payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should throw error when "payload" did not contain needed property', () => {
        const userId = 'user-id_test';
        const threadId = 'thread-id_test';
        const payload = {}

        expect(() => new AddComment(userId, threadId, payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')

    });


    it('should throw error when "payload" did not meet data type specification',  () => {
        const userId = 'user-id_test';
        const threadId = 'thread-id_test';
        const payload = {
            content: 1234,
        }

        expect(() => new AddComment(userId, threadId, payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should create addComment object correctly',  () => {
        const expectedUserId = 'user-id_test';
        const expectedThreadId = 'thread-id_test';
        const payload = {
            content: 'comment content test'
        }

        const { userId, threadId, content } = new AddComment(expectedUserId, expectedThreadId, payload)

        expect(userId).toEqual(expectedUserId)
        expect(threadId).toEqual(expectedThreadId)
        expect(content).toEqual(payload.content)
    });
});
