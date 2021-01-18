import AuthenticateUserService from './AuthenticateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService

describe('Authenticate', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to authenticate user', async () => {
    const user = await fakeUserRepository.create({
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
    await fakeUserRepository.create({
      name: 'Guilherme Henrique',
      email: 'guilherme.hlg@email.com',
      password: 'fhtg45gdfa34',
    })

    await expect(
      authenticateUser.execute({
        email: 'guilherme.hlg@email.com',
        password: 'fhtgdfa34',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      authenticateUser.execute({
        email: 'guilhermed.hlg@email.com',
        password: 'fhtg45gdfa34',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      authenticateUser.execute({
        email: 'guilhermed.hlg@email.com',
        password: 'fhtg45fa34',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
