import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastrarAluno from "./components/cadastrar-aluno";
import CadastrarImc from "./components/cadastrar-imc";
import ListarImc from "./components/listar-imc";

function App() {
  return (
    <div id="app">
      <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/aluno/cadastrar"}>Cadastrar Aluno</Link>
              </li>
              <li>
                <Link to={"/imc/cadastrar"}>Cadastrar Imc</Link>
              </li>
              <li>
                <Link to={"/imc/listar"}>Listar Imc</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<CadastrarAluno />}/>
            <Route 
              path="/aluno/cadastrar"
              element={<CadastrarAluno />}
            />
            <Route 
              path="/imc/cadastrar"
              element={<CadastrarImc />}
            />
            <Route 
              path="/imc/listar"
              element={<ListarImc />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
