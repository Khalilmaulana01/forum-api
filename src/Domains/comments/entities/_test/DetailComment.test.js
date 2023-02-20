const DetailComment = require('../DetailComment')

describe('DetailComment entities',  () => {
    it('should throw error when payload did not contain needed property',  () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            date: '2023-02-12 04:04:04.012345'
        };

        expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    });

    it('should throw error when payload did not meet data type specification',  () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            date: '2023-02-12 04:04:04.012345',
            username: 'dicoding',
            isDelete: 'no'
        }

        expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should create commentDetails object correctly',  () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            date: '2023-02-12 04:04:04.012345',
            username: 'dicoding',
            isDelete: false
        }

        const detailComment = new DetailComment(payload)

        expect(detailComment.id).toEqual(payload.id)
        expect(detailComment.content).toEqual(payload.content)
        expect(detailComment.date).toEqual(payload.date)
        expect(detailComment.username).toEqual(payload.username)
        expect(detailComment.isDelete).toEqual(payload.isDelete)
    });
});