import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

interface UserOnlyIdNameAndEmail {
  id: string
  email: string
  password?: string
  created_at?: Date
  updated_at?: Date
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({ email, password })

    const userOnlyIdNameAndEmail: UserOnlyIdNameAndEmail = Object.assign({}, user)

    delete userOnlyIdNameAndEmail.created_at
    delete userOnlyIdNameAndEmail.updated_at
    delete userOnlyIdNameAndEmail.password

    return response.json({ userOnlyIdNameAndEmail, token })
  }
}
