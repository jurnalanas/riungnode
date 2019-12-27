const postsRoutes = require('../posts-routes');

describe('posts router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/', method: 'post' },
      { path: '/:pid', method: 'get' },
      { path: '/:pid', method: 'delete' },
      { path: '/:pid', method: 'patch' },
      { path: '/user/:uid', method: 'get' },
    ]

    routes.forEach(route => {
      const match = postsRoutes.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})
