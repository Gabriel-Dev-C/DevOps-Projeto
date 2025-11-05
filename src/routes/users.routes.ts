import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { permit } from '../middlewares/role.middleware'
import { listUsers } from '../controllers/users.controller'

const router = Router()
router.get('/', authMiddleware, permit('admin'), listUsers)
export default router
