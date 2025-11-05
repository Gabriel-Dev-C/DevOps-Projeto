import { Request, Response } from 'express'
import { Lab } from '../models/Lab'

export async function listLabs(req: Request, res: Response) {
  const labs = await Lab.findAll()
  res.json(labs)
}

export async function getLab(req: Request, res: Response) {
  const lab = await Lab.findByPk(req.params.id)
  if (!lab) return res.status(404).json({ message: 'Lab não encontrado' })
  res.json(lab)
}

export async function createLab(req: Request, res: Response) {
  const lab = await Lab.create(req.body as any)
  res.status(201).json(lab)
}

export async function updateLab(req: Request, res: Response) {
  const lab = await Lab.findByPk(req.params.id)
  if (!lab) return res.status(404).json({ message: 'Lab não encontrado' })
  await lab.update(req.body)
  res.json(lab)
}

export async function deleteLab(req: Request, res: Response) {
  const lab = await Lab.findByPk(req.params.id)
  if (!lab) return res.status(404).json({ message: 'Lab não encontrado' })
  await lab.destroy()
  res.status(204).send()
}
