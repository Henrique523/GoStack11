interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'guilherme@wgdevelopment.com',
      name: 'Guilherme Henrique da WG Development',
    },
  },
} as IMailConfig
