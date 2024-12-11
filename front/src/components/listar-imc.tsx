import { useEffect, useState } from "react";
import { Imc } from "../models/imc";
import axios from "axios";

function ListarImc(){
    const [imcs, setImcs] = useState<Imc[]>([]);

    useEffect(() => {
        carregarImcs();
    })

    function carregarImcs() {
        fetch("http://localhost:5151/imc/listar")
            .then((resposta) => resposta.json())
            .then((imcs: Imc[]) => {
                setImcs(imcs);
            });
    }

    return (
        <div>
            <h1>Listar IMCs</h1>
            <table border={1}>
                <thead>
                    <th>#</th>
                    <th>Nome do Aluno</th>
                    <th>Peso</th>
                    <th>Altura</th>
                    <th>IMC</th>
                    <th>Classificação</th>
                    <th>Criado Em</th>
                </thead>
                <tbody>
                    {imcs.map((imc) => (
                        <tr key={imc.imcId}>
                            <td>{imc.imcId}</td>
                            <td>{imc.aluno!.nome + " " + imc.aluno!.sobrenome}</td>
                            <td>{imc.peso}</td>
                            <td>{imc.altura}</td>
                            <td>{imc.imcConta}</td>
                            <td>{imc.classificacao}</td>
                            <td>{imc.criadoEm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListarImc;