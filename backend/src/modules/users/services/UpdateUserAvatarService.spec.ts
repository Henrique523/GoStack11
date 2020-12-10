import UpdateUserAvatarService from './UpdateUserAvatarService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider'

import AppError from '@shared/errors/AppError'

describe('UpdateUserAvatar', () => {
  it('should be able to update a new avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

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
    const fakeUserRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

    expect(
      updateUserAvatar.execute({
        user_id: 'usuario-nao-autenticado',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update an existing avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

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
