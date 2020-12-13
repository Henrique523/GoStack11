import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

// import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    await this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, 'this is an email')
  }
}

export default SendForgotPasswordEmailService