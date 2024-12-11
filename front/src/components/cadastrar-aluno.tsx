import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/aluno";

function CadastrarAluno(){
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");

    function cadastrarAlunos(e: any) {
        const aluno: Aluno = {
            nome: nome,
            sobrenome: sobrenome,
        }
    

        fetch("http://localhost:5151/aluno/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(aluno),
        })
            .then((resposta) => resposta.json())
            .then((aluno: Aluno) => {
                navigate("/imc/cadastrar");
            })
        e.preventDefault();
    }

    return (
        <div>
            <h1>Cadastrar Aluno</h1>
            <form onSubmit={cadastrarAlunos}>
                <label>Nome:</label>
                <input 
                    type="text" 
                    onChange={(e: any) => setNome(e.target.value)}
                    required
                />
                <br />
                <label>Sobrenome:</label>
                <input 
                    type="text" 
                    onChange={(e: any) => setSobrenome(e.target.value)}
                />
                <br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastrarAluno;