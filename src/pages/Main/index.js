import React from "react";
import { Conteiner, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";

export default function Main() {
  return (
    <Conteiner>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form>
        <input type="text" placeholder="Adicionar repositórios" />

        <SubmitButton>
          <FaPlus color="#FFFFFF" />;
        </SubmitButton>
      </Form>
    </Conteiner>
  );
}
