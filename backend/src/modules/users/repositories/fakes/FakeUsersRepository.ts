import { uuid } from 'uuidv4'

import User from '@modules/users/infra/typeorm/entities/User'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class FakeUsersRepository implements IUserRepository {
  private users: User[] = []

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { id: uuid(), email, name, password })
    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users.splice(findIndex, 1, Object.assign({}, user))

    return user
  }
}

export default FakeUsersRepository
