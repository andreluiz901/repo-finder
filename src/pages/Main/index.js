import React, { useState, useCallback } from "react";
import { Conteiner, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState([]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function sumbit() {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        };

        setRepositories(...repositories, data);
        setNewRepo("");
      }

      sumbit();
    },
    [newRepo, repositories]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <Conteiner>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color="#FFFFFF" />;
        </SubmitButton>
      </Form>
    </Conteiner>
  );
}
