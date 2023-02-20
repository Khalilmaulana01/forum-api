const ThreadRepository = require("../ThreadRepository");

describe("ThreadRepository interface", () => {
	it("should throw error when invoke abstract behavior", async () => {
		const threadRepository = new ThreadRepository();

		await expect(threadRepository.addThread({})).rejects.toThrowError(
			"THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED"
		);
		await expect(
			threadRepository.checkAvailabilityThread("thread-id_test")
		).rejects.toThrowError("THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED");
		await expect(
			threadRepository.getThreadById("thread-id_test")
		).rejects.toThrowError("THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED");
	});
});
