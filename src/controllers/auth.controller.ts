import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User'
import { signPayload } from '../utils/jwt'

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body
  const existing = await User.findOne({ where: { email } })
  if (existing) return res.status(400).json({ message: 'Email já cadastrado' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash, role: role || 'aluno' } as any)
  res.status(201).json({ id: user.id, email: user.email, name: user.name })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' })
  const token = signPayload({ id: user.id, email: user.email, role: user.role })
  res.json({ token })
}
