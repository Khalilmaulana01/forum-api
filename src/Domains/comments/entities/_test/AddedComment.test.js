const AddedComment = require('../AddedComment')

describe('AddedComment entities',  () => {
    it('should throw error when payload did not contain needed property',  () => {
        const payload = {
            id: 'comment_id-test',
            content: 'comment content test'
        }

        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    });

    it('should throw error when payload did not meet data type specification',  () => {
        const payload = {
            id: 1234,
            content: 'comment content test',
            owner: {},
        }

        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should create AddComment object correctly',  () => {
        const payload = {
            id: 'comment_id-test',
            content: 'comment content test',
            owner: 'dicoding',
        }

        const addedComment = new AddedComment(payload)

        expect(addedComment.id).toEqual(payload.id)
        expect(addedComment.content).toEqual(payload.content)
        expect(addedComment.owner).toEqual(payload.owner)
    });
});