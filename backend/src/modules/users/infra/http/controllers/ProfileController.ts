import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

interface UserWithoutPassword {
  name: string
  email: string
  password?: string
  created_at?: Date
  updated_at?: Date
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id })

    const userWithoutPassword: UserWithoutPassword = user

    delete userWithoutPassword.password
    delete userWithoutPassword.created_at
    delete userWithoutPassword.updated_at

    return response.json(userWithoutPassword)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, old_password, password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const profile: UserWithoutPassword = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    })

    delete profile.password
    delete profile.created_at
    delete profile.updated_at

    return response.json(profile)
  }
}
