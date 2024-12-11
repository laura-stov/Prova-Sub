import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/aluno";
import { Imc } from "../models/imc";

function CadastrarImc() {
    const navigate = useNavigate();
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [classificacao, setClassificacao] = useState("");
    const [imcConta, setImcConta] = useState(0);
    const [alunoId, setAlunoId] = useState(0);
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    useEffect(() => {
        carregarAlunos();
    })

    function carregarAlunos() {
        fetch("http://localhost:5151/aluno/listar")
            .then((resposta) => resposta.json())
            .then((alunos: Aluno[]) => {
                setAlunos(alunos);
            });
    }

    function cadastrarImcs(e: any) {
        const imc: Imc = {
            imcConta: imcConta,
            classificacao: classificacao,
            peso: peso,
            altura: altura,
            alunoId: alunoId,
        };

        fetch("http://localhost:5151/imc/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(imc),
        })
            .then((resposta) => resposta.json())
            .then((imc: Imc) => {
                navigate("/imc/listar");
            })
        e.preventDefault();
    }

    return (
        <div>
            <h1>Cadastrar Imc</h1>
            <form onSubmit={cadastrarImcs}>
                <label>Peso:</label>
                <input 
                    type="number" 
                    onChange={(e: any) => setPeso(e.target.value)}
                    required
                />
                <br />
                <label>Altura</label>
                <input 
                    type="number" 
                    onChange={(e: any) => setAltura(e.target.value)}
                />
                <br />
                <select onChange={(e: any) => setAlunoId(e.target.value)}>
                    {alunos.map((aluno) => (
                        <option value={aluno.alunoId}
                            key={aluno.alunoId}
                        >
                            {aluno.nome + " " + aluno.sobrenome}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastrarImc;