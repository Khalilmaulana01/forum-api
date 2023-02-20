const routes = (handler) => ([
    {
        method: 'GET',
        path: '/',
        handler: () => ({
            status: 'success',
            message: 'hello, this is forum API'
        }),
    },
    {
        method: 'POST',
        path: '/threads',
        handler: handler.postThreadHandler,
        options: {
            auth: 'forumapi_jwt',
        },
    },
    {
        method: 'GET',
        path: '/threads/{threadId}',
        handler: handler.getThreadHandler,
    },
])

module.exports = routes;