import { Aluno } from "./aluno";

export interface Imc {
    imcId?: number;
    peso: number;
    altura: number;
    alunoId: number;
    imcConta: number;
    aluno?: Aluno;
    criadoEm?: string;
    classificacao: string;
}