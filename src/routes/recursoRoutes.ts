import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  criarRecurso,
  listarRecursos,
  obterRecurso,
  atualizarRecurso,
  excluirRecurso,
} from "../controllers/recursoController";

const router = Router();

// todas as rotas exigem autenticação JWT
router.use(authMiddleware);

router.post("/", criarRecurso);
router.get("/", listarRecursos);
router.get("/:id", obterRecurso);
router.put("/:id", atualizarRecurso);
router.delete("/:id", excluirRecurso);

export default router;
