const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const pool = require("../../database/postgres/pool");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");

describe("/threads endpoint", () => {
	afterAll(async () => {
		await UsersTableTestHelper.cleanTable();
		await pool.end();
	});

	afterEach(async () => {
		await ThreadsTableTestHelper.cleanTable();
	});

	describe("when POST /threads", () => {
		it("should response 201 and persisted thread", async () => {
			const payload = {
				title: "thread title test",
				body: "thread body test",
			};

			const accessToken = await ServerTestHelper.getAccessToken("user-123");
			const server = await createServer(container);

			const response = await server.inject({
				method: "POST",
				url: "/threads",
				payload,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const responseJson = JSON.parse(response.payload);
			expect(response.statusCode).toEqual(201);
			expect(responseJson.status).toEqual("success");
			expect(responseJson.data.addedThread).toBeDefined();
		});
	});

	describe("when GET /threads/{threadId}", () => {
		it("should response 200 and get detail thread", async () => {
			const server = await createServer(container);
			await ThreadsTableTestHelper.addThread({
				id: "thread-123",
				owner: "user-123",
			});
			await CommentsTableTestHelper.addComment({
				userId: "user-123",
				threadId: "thread-123",
			});

			const response = await server.inject({
				method: "GET",
				url: "/threads/thread-123",
			});

			const responseJson = JSON.parse(response.payload);
			expect(response.statusCode).toEqual(200);
			expect(responseJson.status).toEqual("success");
			expect(responseJson.data.thread).toBeDefined();
			expect(responseJson.data.thread.comments).toBeDefined();
		});

		it("should response 404 when thread not found", async () => {
			const server = await createServer(container);
			const response = await server.inject({
				method: "GET",
				url: "/threads/thread-1234",
			});

			const responseJson = JSON.parse(response.payload);
			expect(response.statusCode).toEqual(404);
			expect(responseJson.status).toEqual("fail");
			expect(responseJson.message).toEqual(
				"thread dengan id: thread-1234 tidak ada"
			);
		});
	});
});
