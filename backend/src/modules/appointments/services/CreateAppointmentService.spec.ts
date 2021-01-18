import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService
let fakeNotificationRepository: FakeNotificationRepository
let fakeCacheProvider: FakeCacheProvider

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationRepository = new FakeNotificationRepository()
    fakeCacheProvider = new FakeCacheProvider()
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '123123123',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123123')
  })

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime()
    })

    await createAppointment.execute({ date: appointmentDate, user_id: 'user-id', provider_id: 'provider-id' })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime()
    })

    await expect(
      createAppointment.execute({ date: appointmentDate, user_id: 'user-id', provider_id: 'provider-id' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('shouldn`t be able to repeat an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '123123123',
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123123',
        provider_id: '123123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a passed date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({ date: new Date(2020, 4, 10, 11), user_id: '123123', provider_id: '123123123' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({ date: new Date(2020, 4, 10, 13), user_id: '123123', provider_id: '123123' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment there is not between 8 a.m. and 5 p.m.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({ date: new Date(2020, 4, 11, 7), user_id: 'user_id', provider_id: 'provider_id' })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({ date: new Date(2020, 4, 11, 18), user_id: 'user_id', provider_id: 'provider_id' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
