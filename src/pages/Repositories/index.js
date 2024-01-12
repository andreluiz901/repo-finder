import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackButton, Conteiner, Loading, Owner } from "./styles";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repository() {
  const { repository } = useParams();
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);
      setRepo(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [repository]);

  if (loading) {
    return (
      <Loading>
        <h1>Buscando informações...</h1>
      </Loading>
    );
  }

  return (
    <Conteiner>
      <BackButton to={"/"}>
        <FaArrowLeft color="#000" size={35} />
      </BackButton>

      <Owner>
        <img src={repo.owner.avatar_url} alt={repo.owner.login}></img>
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>
    </Conteiner>
  );
}
