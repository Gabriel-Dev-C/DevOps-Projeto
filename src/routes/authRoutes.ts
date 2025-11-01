import {Router} from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Token:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Autenticação na API de Alunos
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: teste@teste.com
 *                          password:
 *                              type: string
 *                              example: VaiCor$nthians
 *      responses:
 *          200:
 *              description: Login realizado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *          401:
 *              description: Credenciais Invalidas
 */
router.post("/login", (req, res) => authController.login(req, res));

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Cadastro de Login na API de Alunos
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                          - nome
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          nome:
 *                              type: string
 *      responses:
 *          201:
 *              description: Login cadastrado com sucesso
 *          400:
 *              description: Dados Invalidos
 */
router.post("/register", (req, res) => authController.register(req, res));

export default router;