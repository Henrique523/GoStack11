import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentControler = new AppointmentController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentControler.create)
appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
