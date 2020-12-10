import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

interface UserWithoutPassword {
  name: string
  email: string
  password?: string
  created_at?: Date
  updated_at?: Date
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user: UserWithoutPassword = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password
    delete user.created_at
    delete user.updated_at

    return response.json(user)
  }
}
