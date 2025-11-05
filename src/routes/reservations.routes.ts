import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createReservation, listReservations, getReservation, deleteReservation } from '../controllers/reservations.controller'

const router = Router()
router.get('/', authMiddleware, listReservations)
router.post('/', authMiddleware, createReservation)
router.get('/:id', authMiddleware, getReservation)
router.delete('/:id', authMiddleware, deleteReservation)
export default router
