# Plano de Aula: Implementação de Banco de Dados com Sequelize e SQLite

## 📚 Objetivos da Aula
- Migrar de dados em memória para persistência com SQLite
- Implementar padrão Repository e Service
- Configurar Sequelize ORM com TypeScript
- Aplicar boas práticas de arquitetura em camadas

## 🏗️ Arquitetura Final
```
src/
├── config/
│   ├── database.ts          # Configuração do banco
│   └── swagger.ts
├── models/
│   ├── Aluno.ts            # Modelo de dados - Aluno
│   └── User.ts             # Modelo de dados - Usuário
├── repositories/
│   ├── AlunoRepository.ts  # Camada de acesso aos dados - Aluno
│   └── UserRepository.ts   # Camada de acesso aos dados - User
├── services/
│   ├── AlunoService.ts     # Regras de negócio - Aluno
│   └── AuthService.ts      # Regras de negócio - Auth
├── controllers/
│   ├── alunoController.ts  # Controladores HTTP - Aluno
│   └── AuthController.ts   # Controladores HTTP - Auth
└── routes/
    ├── alunoRoutes.ts
    └── authRoutes.ts
```

## 📋 Pré-requisitos
- Node.js instalado
- Projeto TypeScript configurado
- Conhecimento básico de TypeScript/JavaScript

## 🚀 Passo a Passo

### 1. Instalação das Dependências

Execute no terminal:
```bash
npm install sequelize sqlite3
npm install --save-dev sequelize-cli
```

**O que cada pacote faz:**
- `sequelize`: ORM (Object-Relational Mapping) para JavaScript/TypeScript
- `sqlite3`: Driver para banco SQLite
- `sequelize-cli`: Ferramenta de linha de comando para migrations

### 2. Criar Estrutura de Diretórios

```bash
mkdir -p src/models
mkdir -p src/repositories
mkdir -p src/services
```

### 3. Configuração do Banco de Dados

**Arquivo:** `src/config/database.ts`
```typescript
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco de dados conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }
};
```

**Explicação:**
- `dialect: 'sqlite'`: Define que usaremos SQLite
- `storage`: Arquivo onde o banco será salvo
- `logging: false`: Desabilita logs SQL no console
- `sync()`: Cria as tabelas automaticamente

### 4. Modelos de Dados

#### 4.1 Modelo Aluno
**Arquivo:** `src/models/Aluno.ts`
```typescript
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface AlunoAttributes {
  id?: number;
  ra: string;
  nome: string;
  email: string;
}

export class Aluno extends Model<AlunoAttributes> implements AlunoAttributes {
  public id!: number;
  public ra!: string;
  public nome!: string;
  public email!: string;
}

Aluno.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ra: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Aluno',
  tableName: 'alunos'
});
```

**Explicação:**
- `Model<AlunoAttributes>`: Herda funcionalidades do Sequelize
- `DataTypes`: Define tipos de dados SQL
- `autoIncrement: true`: ID incrementa automaticamente
- `unique: true`: RA deve ser único
- `allowNull: false`: Campo obrigatório

#### 4.2 Modelo User
**Arquivo:** `src/models/User.ts`
```typescript
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id?: number;
  nome: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});
```

### 5. Camadas Repository

#### 5.1 Aluno Repository
**Arquivo:** `src/repositories/AlunoRepository.ts`
```typescript
import { Aluno, AlunoAttributes } from '../models/Aluno';

export class AlunoRepository {
  async findAll(): Promise<Aluno[]> {
    return await Aluno.findAll();
  }

  async findByRa(ra: string): Promise<Aluno | null> {
    return await Aluno.findOne({ where: { ra } });
  }

  async create(alunoData: Omit<AlunoAttributes, 'id'>): Promise<Aluno> {
    return await Aluno.create(alunoData);
  }

  async update(ra: string, alunoData: Partial<AlunoAttributes>): Promise<Aluno | null> {
    const aluno = await this.findByRa(ra);
    if (!aluno) return null;
    
    await aluno.update(alunoData);
    return aluno;
  }

  async delete(ra: string): Promise<boolean> {
    const result = await Aluno.destroy({ where: { ra } });
    return result > 0;
  }
}
```

**Explicação:**
- Repository: Padrão que encapsula acesso aos dados
- `Omit<AlunoAttributes, 'id'>`: Remove 'id' do tipo (auto-gerado)
- `Partial<AlunoAttributes>`: Todos os campos opcionais para update
- `findOne({ where: { ra } })`: Busca por condição específica

#### 5.2 User Repository
**Arquivo:** `src/repositories/UserRepository.ts`
```typescript
import { User, UserAttributes } from '../models/User';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async create(userData: Omit<UserAttributes, 'id'>): Promise<User> {
    return await User.create(userData);
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
}
```

### 6. Camadas Service

#### 6.1 Aluno Service
**Arquivo:** `src/services/AlunoService.ts`
```typescript
import { AlunoRepository } from '../repositories/AlunoRepository';
import { AlunoAttributes } from '../models/Aluno';

export class AlunoService {
  private alunoRepository: AlunoRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  async getAllAlunos() {
    return await this.alunoRepository.findAll();
  }

  async createAluno(alunoData: Omit<AlunoAttributes, 'id'>) {
    const existingAluno = await this.alunoRepository.findByRa(alunoData.ra);
    if (existingAluno) {
      throw new Error('RA já existe');
    }
    return await this.alunoRepository.create(alunoData);
  }

  async updateAluno(ra: string, alunoData: Partial<AlunoAttributes>) {
    const aluno = await this.alunoRepository.update(ra, alunoData);
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
    return aluno;
  }

  async deleteAluno(ra: string) {
    const deleted = await this.alunoRepository.delete(ra);
    if (!deleted) {
      throw new Error('Aluno não encontrado');
    }
    return { message: 'Aluno removido com sucesso' };
  }
}
```

**Explicação:**
- Service: Contém regras de negócio
- Validações (RA duplicado, aluno não encontrado)
- Abstrai complexidade do Repository para o Controller

#### 6.2 Auth Service
**Arquivo:** `src/services/AuthService.ts`
```typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { UserAttributes } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPix';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: Omit<UserAttributes, 'id'>) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return { message: 'Usuário criado com sucesso' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Acesso não autorizado');
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.nome },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token };
  }
}
```

### 7. Atualizar Controllers

#### 7.1 Aluno Controller
**Arquivo:** `src/controllers/alunoController.ts`
```typescript
import { Request, Response } from "express";
import { AlunoService } from "../services/AlunoService";

export class AlunoController {
    private alunoService: AlunoService;

    constructor() {
        this.alunoService = new AlunoService();
    }

    async get(req: Request, res: Response): Promise<Response> {
        try {
            const alunos = await this.alunoService.getAllAlunos();
            return res.json(alunos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { ra, nome, email } = req.body;
            const novoAluno = await this.alunoService.createAluno({ ra, nome, email });
            return res.status(201).json(novoAluno);
        } catch (error: any) {
            if (error.message === 'RA já existe') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { ra } = req.params;
            const { nome, email } = req.body;
            const alunoAtualizado = await this.alunoService.updateAluno(ra, { nome, email });
            return res.json(alunoAtualizado);
        } catch (error: any) {
            if (error.message === 'Aluno não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
```

#### 7.2 Auth Controller
**Arquivo:** `src/controllers/AuthController.ts`
```typescript
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, email, password } = req.body;
            
            if (!nome || !email || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            }

            const result = await this.authService.register({ nome, email, password });
            return res.status(201).json(result);
        } catch (error: any) {
            if (error.message === 'Email já cadastrado') {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios' });
            }

            const result = await this.authService.login(email, password);
            return res.json(result);
        } catch (error: any) {
            if (error.message === 'Credenciais inválidas' || error.message === 'Acesso não autorizado') {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
```

### 8. Atualizar Server.ts

**Arquivo:** `src/server.ts`
```typescript
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/database";
import alunoRouter from "./routes/alunoRoutes";
import router from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/aluno", alunoRouter);
app.use("/auth", router);

const port = 3001;

const startServer = async () => {
    await connectDatabase();
    app.listen(port, () => {
        console.log("Servidor de API rodando na porta", port);
    });
};

startServer();
```

## 🧪 Testando a Implementação

### 1. Instalar dependências:
```bash
npm install
```

### 2. Executar o servidor:
```bash
npm run dev
```

### 3. Verificar se o arquivo `database.sqlite` foi criado na raiz do projeto

### 4. Testar no Swagger UI:
- Acesse: `http://localhost:3001/api-docs`
- Faça login para obter token
- Use o token para testar as operações CRUD

## 🎯 Conceitos Importantes

### Repository Pattern
- **Objetivo**: Separar lógica de acesso aos dados
- **Benefício**: Facilita testes e mudanças de banco

### Service Pattern  
- **Objetivo**: Centralizar regras de negócio
- **Benefício**: Reutilização e manutenibilidade

### ORM (Sequelize)
- **Objetivo**: Mapear objetos para tabelas
- **Benefício**: Abstrai SQL, facilita desenvolvimento

### SQLite
- **Objetivo**: Banco leve para desenvolvimento
- **Benefício**: Não precisa instalar servidor de banco

## 🔍 Próximos Passos
1. Implementar migrations para versionamento do banco
2. Adicionar validações mais robustas
3. Implementar soft delete
4. Adicionar índices para performance
5. Configurar diferentes ambientes (dev, prod)

## 📝 Exercícios Práticos
1. Adicione um campo "curso" ao modelo Aluno
2. Implemente busca por nome
3. Crie endpoint para listar alunos por curso
4. Adicione validação de email único
5. Implemente refresh token
6. Adicione roles/permissões aos usuários
7. Crie middleware para validar propriedade dos dados
8. Implemente soft delete para usuários