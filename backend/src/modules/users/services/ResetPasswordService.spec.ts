import ResetPasswordService from './ResetPasswordService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPassword: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider)
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
    })

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPassword.execute({ token, password: '123123' })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(updatedUser?.password).toBe('123123')
    expect(generateHash).toHaveBeenCalledWith('123123')
  })

  it('should not be able to reset the password with a wrong token', async () => {
    await expect(resetPassword.execute({ token: 'adfadfasdhf', password: '123123' })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with a wrong user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user')

    await expect(resetPassword.execute({ token, password: '123123' })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password if passed morte then two hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
