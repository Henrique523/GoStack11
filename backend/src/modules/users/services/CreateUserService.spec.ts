import CreateUserService from './CreateUserService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg@email.com',
      password: 'fhtg45gdfa34',
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('guilherme.hlg@email.com')
  })

  it('should not be able to create two users with the same email', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    await createUser.execute({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg.eng@email.com',
      password: 'fhtg45gdfa34',
    })

    expect(
      createUser.execute({
        name: 'Guilherme Henrique',
        email: 'guilherme.hlg.eng@email.com',
        password: 'fhtg45gdfa34',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
