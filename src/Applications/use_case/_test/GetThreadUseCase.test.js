const GetThreadUseCase = require("../../use_case/GetThreadUseCase");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const DetailThread = require("../../../Domains/threads/entities/DetailThread");
const DetailComment = require("../../../Domains/comments/entities/DetailComment");

describe("GetThreadUseCase", () => {
	it("should orchestrating the GetThread action correctly", async () => {
		const expectedThread = new DetailThread({
			id: "thread-id_test",
			title: "thread title test",
			body: "thread body test",
			date: "2023-02-12 04:04:04.012345",
			username: "dicoding",
			comments: [
				new DetailComment({
					id: "comment-id_test-1",
					content: "comment content test",
					date: "2023-02-12 04:04:04.012345",
					username: "Khalil",
					isDelete: false,
				}),
				new DetailComment({
					id: "comment-_id_test-2",
					content: "reply comment content test",
					date: "2023-02-12 04:04:04.012345",
					username: "Maulana",
					isDelete: true,
				}),
			],
		});

		const mockThreadRepository = new ThreadRepository();

		mockThreadRepository.getThreadById = jest
			.fn()
			.mockImplementation(() => Promise.resolve(expectedThread));
		mockThreadRepository.checkAvailabilityThread = jest
			.fn()
			.mockImplementation(() => Promise.resolve());

		const getThreadUseCase = new GetThreadUseCase({
			threadRepository: mockThreadRepository,
		});

		const getThread = await getThreadUseCase.execute("thread-id_test");

		expect(getThread).toStrictEqual(expectedThread);
		expect(mockThreadRepository.getThreadById).toBeCalledWith("thread-id_test");
		expect(mockThreadRepository.checkAvailabilityThread).toBeCalled();
	});
});
