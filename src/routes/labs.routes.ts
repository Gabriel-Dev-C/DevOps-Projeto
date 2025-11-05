import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { permit } from '../middlewares/role.middleware'
import { createLab, listLabs, getLab, updateLab, deleteLab } from '../controllers/labs.controller'

const router = Router()
router.get('/', authMiddleware, listLabs)
router.get('/:id', authMiddleware, getLab)
router.post('/', authMiddleware, permit('admin'), createLab)
router.put('/:id', authMiddleware, permit('admin'), updateLab)
router.delete('/:id', authMiddleware, permit('admin'), deleteLab)
export default router
