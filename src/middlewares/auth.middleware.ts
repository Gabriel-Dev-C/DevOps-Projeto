import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: any
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'Token missing' })
  const [, token] = header.split(' ')
  try {
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
