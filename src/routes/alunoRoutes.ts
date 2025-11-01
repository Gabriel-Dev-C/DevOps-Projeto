import {Router} from "express";
import {AlunoController} from "../controllers/alunoController";
import { authMiddleware } from "../middlewares/auth";

const alunoRouter = Router();
const aluno = new AlunoController();

 alunoRouter.use(authMiddleware);

/**
 * @swagger
 * components:
 *  schemas:
 *      Aluno:
 *          type: object
 *          required:
 *              - ra
 *              - nome
 *              - email
 *          properties:
 *              ra:
 *                  type: string
 *                  description: identificador escolar
 *              nome:
 *                  type: string
 *                  description: nome do aluno
 *              email:
 *                  type: string
 *                  description: e-mail do aluno
 */

/**
 * @swagger
 * /aluno:
 *  get:
 *      summary: Lista todos os alunos
 *      tags: [Alunos]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de alunos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Aluno'
 *          401:
 *              description: Token não informado
 */
alunoRouter.get("/", (req, res) => aluno.get(req, res));

/**
 * @swagger
 * /aluno:
 *  post:
 *      summary: Criar um aluno
 *      tags: [Alunos]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Aluno'
 *      responses:
 *          201:
 *              description: Aluno Criado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Aluno'
 *          401:
 *              description: Token não informado
 */
alunoRouter.post("/", (req, res) => aluno.create(req, res));

/**
 * @swagger
 * /aluno/{ra}:
 *  put:
 *      summary: Atualiza um aluno
 *      tags: [Alunos]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: ra
 *            schema:
 *              type: string
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *          200:
 *              description: Aluno atualizado com Sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Aluno'
 *          404:
 *              description: Aluno não encontrado
 *          401:
 *              description: Token não informado
 */
alunoRouter.put("/:ra", (req, res) => aluno.update(req, res));
export default alunoRouter;