import { Request, Response } from 'express'
import { Reservation } from '../models/Reservation'
import { Lab } from '../models/Lab'
import { User } from '../models/User'
import { Op } from 'sequelize'

export async function listReservations(req: Request, res: Response) {
  const user = (req as any).user
  if (user.role === 'admin') {
    const all = await Reservation.findAll({ include: [User, Lab] })
    return res.json(all)
  }
  const mine = await Reservation.findAll({ where: { userId: user.id }, include: [Lab] })
  res.json(mine)
}

export async function getReservation(req: Request, res: Response) {
  const r = await Reservation.findByPk(req.params.id)
  if (!r) return res.status(404).json({ message: 'Reserva não encontrada' })
  res.json(r)
}

export async function createReservation(req: Request, res: Response) {
  const { labId, startAt, endAt } = req.body
  const user = (req as any).user

  const lab = await Lab.findByPk(labId)
  if (!lab) return res.status(400).json({ message: 'Lab inválido' })

  // overlap check
  const conflicts = await Reservation.count({
    where: {
      labId,
      [Op.not]: {
        [Op.or]: [
          { endAt: { [Op.lte]: new Date(startAt) } },
          { startAt: { [Op.gte]: new Date(endAt) } }
        ]
      }
    }
  })

  if (conflicts > 0) return res.status(400).json({ message: 'Horário indisponível' })

  const reservation = await Reservation.create({ labId, userId: user.id, startAt, endAt } as any)
  res.status(201).json(reservation)
}

export async function deleteReservation(req: Request, res: Response) {
  const r = await Reservation.findByPk(req.params.id)
  if (!r) return res.status(404).json({ message: 'Reserva não encontrada' })
  await r.destroy()
  res.status(204).send()
}
