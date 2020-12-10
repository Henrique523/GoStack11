import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

describe('Authenticate', () => {
  it('should to be able to authenticate user', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg@email.com',
      password: 'fhtg45gdfa34',
    })

    const response = await authenticateUser.execute({
      email: 'guilherme.hlg@email.com',
      password: 'fhtg45gdfa34',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not to be able to authenticate user with wrong password or email', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    await createUser.execute({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg@email.com',
      password: 'fhtg45gdfa34',
    })

    expect(
      authenticateUser.execute({
        email: 'guilherme.hlg@email.com',
        password: 'fhtgdfa34',
      })
    ).rejects.toBeInstanceOf(AppError)

    expect(
      authenticateUser.execute({
        email: 'guilhermed.hlg@email.com',
        password: 'fhtg45gdfa34',
      })
    ).rejects.toBeInstanceOf(AppError)

    expect(
      authenticateUser.execute({
        email: 'guilhermed.hlg@email.com',
        password: 'fhtg45fa34',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
