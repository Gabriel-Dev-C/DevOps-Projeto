import { Request, Response } from "express";

interface Aluno {
    ra: string,
    nome: string,
    email: string
}

export class AlunoController {
    private alunos: Aluno[] = [
        {
            ra: "123", 
            nome: "fulano", 
            email: "fulado@teste.com"
        }
    ];

    get(req: Request, res: Response): Response {
        return res.json(this.alunos);
    }

    create(req: Request, res: Response) : Response {
        const { ra, nome, email } = req.body;
        const novoAluno: Aluno = {
            ra:ra,
            nome:nome,
            email:email 
        };
        this.alunos.push(novoAluno);
        return res.status(201).json(novoAluno);
    }

    update(req: Request, res: Response): Response {
        const ra = req.params.ra;
        const {nome, email} = req.body;

        const alunoIndex = this.alunos.findIndex(a => a.ra === ra);        

        if (alunoIndex > -1) {
            this.alunos[alunoIndex] = {ra:ra, nome:nome, email:email};
        } else {
            return res.status(404).json({"message": "Aluno não encontrado"})
        }

        return res.status(200).json(this.alunos[alunoIndex]);
    }
}