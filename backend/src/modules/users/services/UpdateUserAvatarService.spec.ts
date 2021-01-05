import UpdateUserAvatarService from './UpdateUserAvatarService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)
  })

  it('should be able to update a new avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Guilherme Henrique',
      email: 'guilherme@email.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to change an avatar', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'usuario-nao-autenticado',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update an existing avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUserRepository.create({
      name: 'Guilherme Henrique',
      email: 'guilherme@email.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
