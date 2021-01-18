import CreateUserService from './CreateUserService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeUserRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let fakeCacheProvider: FakeCacheProvider

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg@email.com',
      password: 'fhtg45gdfa34',
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('guilherme.hlg@email.com')
  })

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg.eng@email.com',
      password: 'fhtg45gdfa34',
    })

    await expect(
      createUser.execute({
        name: 'Guilherme Henrique',
        email: 'guilherme.hlg.eng@email.com',
        password: 'fhtg45gdfa34',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
