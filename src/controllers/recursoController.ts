import { Request, Response } from "express";
import { Recurso } from "../models/Recurso";

export const criarRecurso = async (req: Request, res: Response) => {
  try {
    const recurso = await Recurso.create(req.body);
    res.status(201).json(recurso);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar recurso", details: err });
  }
};

export const listarRecursos = async (_req: Request, res: Response) => {
  const recursos = await Recurso.findAll();
  res.json(recursos);
};

export const obterRecurso = async (req: Request, res: Response) => {
  const recurso = await Recurso.findByPk(req.params.id);
  if (!recurso) return res.status(404).json({ error: "Recurso não encontrado" });
  res.json(recurso);
};

export const atualizarRecurso = async (req: Request, res: Response) => {
  const recurso = await Recurso.findByPk(req.params.id);
  if (!recurso) return res.status(404).json({ error: "Recurso não encontrado" });
  await recurso.update(req.body);
  res.json(recurso);
};

export const excluirRecurso = async (req: Request, res: Response) => {
  const recurso = await Recurso.findByPk(req.params.id);
  if (!recurso) return res.status(404).json({ error: "Recurso não encontrado" });
  await recurso.destroy();
  res.json({ message: "Recurso excluído" });
};
