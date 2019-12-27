const commentRoutes = require('../comments-routes');

describe('posts router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'post' },
      { path: '/:cid', method: 'patch' },
      { path: '/:cid', method: 'get' },
      { path: '/:cid', method: 'delete' },
      { path: '/post/:pid', method: 'get' },
    ]

    routes.forEach(route => {
      const match = commentRoutes.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})
