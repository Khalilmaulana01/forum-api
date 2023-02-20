const pool = require('../../database/postgres/pool')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const AddThread = require('../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')

describe('ThreadRepositoryPostgres',  () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
    })

    afterAll(async () => {
        await pool.end();
    })

    describe('addThread function',  () => {
        it('should persist AddThread and return thread correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding',
            })

            const addThread = new AddThread('user-id_test', {
                title: 'thread title test',
                body: 'thread body test',
            })

            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
            await threadRepositoryPostgres.addThread(addThread)

            const threads = await ThreadsTableTestHelper.findThreadById('thread-id_test')
            expect(threads).toHaveLength(1)
        });

        it('should return addedThread correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding'
            })

            const addThread = new AddThread('user-id_test', {
                title: 'thread title test',
                body: 'thread body test',
            })

            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            const addedThread = await threadRepositoryPostgres.addThread(addThread)
            expect(addedThread).toStrictEqual(new AddedThread({
                id: 'thread-id_test',
                title: 'thread title test',
                owner: 'user-id_test'
            }))
        });
    });

    describe('CheckAvailabilityThread',  () => {
        it('should throw error when given thread id not found', async () => {
            const threadId = 'thread-id_test';
            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            await expect(threadRepositoryPostgres.checkAvailabilityThread(threadId)).rejects.toThrow(NotFoundError)
        });

        it('should not throw error when given thread id is found', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding'
            })

            const addThread = new AddThread('user-id_test', {
                title: 'thread title test',
                body: 'thread body test'
            })

            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            await threadRepositoryPostgres.addThread(addThread)
            await expect(threadRepositoryPostgres.checkAvailabilityThread('thread-id_test')).resolves.not.toThrow(NotFoundError)
        });
    });

    describe('getThread function', () => {
        it('should return DetailThread correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding'
            });

            await ThreadsTableTestHelper.addThread({
                id: 'thread-id_test',
                title: 'thread title test',
                body: 'thread body test',
                owner: 'user-id_test',
            });

            await CommentsTableTestHelper.addComment({
                userId: 'user-id_test',
                threadId: 'thread-id_test',
                commentId: 'comment-id_test',
                content: 'comment content test',
            });
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
            const detailThread = await threadRepositoryPostgres.getThreadById('thread-id_test')

            expect(detailThread.id).toEqual('thread-id_test')
            expect(detailThread.title).toEqual('thread title test')
            expect(detailThread.body).toEqual('thread body test')
            expect(detailThread.date).toBeTruthy()
            expect(detailThread.username).toEqual('dicoding')
            expect(detailThread.comments).toHaveLength(1)
        });
    });
});