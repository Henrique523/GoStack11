import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController'

const appointmentsRouter = Router()
const appointmentControler = new AppointmentController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentControler.create)

export default appointmentsRouter
