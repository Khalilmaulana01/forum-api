const AddThread = require('../AddThread')

describe('AddedThread entities',  () => {
    it('should throw error when "userId" is invalid',  () => {
        const userId = '';
        const payload = {
            title: 'thread title test',
            body: 'thread body test'
        }

        expect(() => new AddThread(userId, payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    });

    it('should throw error when "userId" did not meet data type specification',  () => {
        const userId = 1234;
        const payload = {
            title: 'thread title test',
            body: 'thread body test',
        }

        expect(() => new AddThread(userId, payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should throw error when "payload" did not contain needed property',  () => {
        const userId = 'user-id_test';
        const payload = {
            title: 'thread title test',
        }

        expect(() => new AddThread(userId, payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    });

    it('should throw error when "payload" did not meet data type specification',  () => {
        const userId = 'user-id_test';
        const payload = {
            title: 1234,
            body: 'thread body test'
        }

        expect(() => new AddThread(userId, payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    });

    it('should create AddedThread object correctly',  () => {
        const expectedUserId = 'user-id_test';
        const payload = {
            title: 'thread title test',
            body: 'thread body test'
        }

        const {userId, title, body} = new AddThread(expectedUserId, payload)

        expect(userId).toEqual(expectedUserId)
        expect(title).toEqual(title)
        expect(body).toEqual(body)
    });
});