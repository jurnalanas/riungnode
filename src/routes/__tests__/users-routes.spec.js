const userRoutes = require('../users-routes');

describe('posts router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/signup', method: 'post' },
      { path: '/login', method: 'post' },
    ]

    routes.forEach(route => {
      const match = userRoutes.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})
