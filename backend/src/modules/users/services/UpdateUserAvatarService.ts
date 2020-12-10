import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('DiskStorageProvider')
    private diskStorageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated can change avatar.', 401)
    }

    if (user.avatar) {
      await this.diskStorageProvider.deleteFile(user.avatar)
    }

    const filename = await this.diskStorageProvider.saveFile(avatarFilename)

    user.avatar = filename
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
