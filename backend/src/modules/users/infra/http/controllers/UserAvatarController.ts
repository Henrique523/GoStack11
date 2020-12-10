import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

interface UserWithoutPassword {
  name: string
  email: string
  password?: string
  created_at?: Date
  updated_at?: Date
}

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)
    const user: UserWithoutPassword = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password
    delete user.created_at
    delete user.updated_at

    return response.json(user)
  }
}
