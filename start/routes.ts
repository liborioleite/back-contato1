import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('index', 'UsersController.index')
  Route.post('store', 'UsersController.store')
})
