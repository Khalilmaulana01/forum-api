class GetThreadUseCase {
	constructor({ threadRepository }) {
		this._threadRepository = threadRepository;
	}

	async execute(threadId) {
		await this._threadRepository.checkAvailabilityThread(threadId);
		const detailThread = await this._threadRepository.getThreadById(threadId);
		detailThread.comments.forEach((part, index, commentArrays) => {
			if (part.isDelete) {
				commentArrays[index].content = "**komentar telah dihapus**";
			}
			delete commentArrays[index].isDelete;
		});
		return detailThread;
	}
}

module.exports = GetThreadUseCase;
