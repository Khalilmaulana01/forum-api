const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const GetThreadUseCase = require("../../../../Applications/use_case/GetThreadUseCase");

class ThreadHandler {
	constructor(container) {
		this._container = container;
		this.postThreadHandler = this.postThreadHandler.bind(this);
		this.getThreadHandler = this.getThreadHandler.bind(this);
	}

	async postThreadHandler(request, h) {
		const { id } = request.auth.credentials;
		const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
		const addedThread = await addThreadUseCase.execute(id, request.payload);

		const response = h.response({
			status: "success",
			data: {
				addedThread,
			},
		});
		response.code(201);
		return response;
	}

	async getThreadHandler(request, h) {
		const { threadId } = request.params;
		const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
		const thread = await getThreadUseCase.execute(threadId);

		return h.response({
			status: "success",
			data: {
				thread,
			},
		});
	}
}

module.exports = ThreadHandler;
