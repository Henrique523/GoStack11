import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let listProviderMonthAvailability: ListProviderMonthAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository)
  })

  it('should be able to list the month availability provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 8, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 9, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 10, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 11, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 12, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 13, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 14, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 15, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 16, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 17, 0, 0),
      user_id: 'user',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 21, 8, 0, 0),
      user_id: 'user',
    })

    const availability = await listProviderMonthAvailability.execute({ provider_id: 'provider', year: 2020, month: 6 })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    )
  })
})
