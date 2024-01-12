import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  Conteiner,
  IssuesList,
  Loading,
  Owner,
  PageActions,
  FilterList,
} from "./styles";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repository() {
  const { repository } = useParams();
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, _setFilters] = useState([
    { state: "all", label: "Todas", active: true },
    { state: "open", label: "Abertas", active: false },
    { state: "closed", label: "Fechadas", active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: filters.find((f) => f.active).state,
            per_page: 5,
          },
        }),
      ]);
      setRepo(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [filterIndex, filters, repository]);

  useEffect(() => {
    async function loadIssue() {
      const response = await api.get(`/repos/${repository}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    }
    loadIssue();
  }, [filterIndex, filters, page, repository]);

  function handlePage(isAdvancePage) {
    setPage(isAdvancePage ? page + 1 : page - 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

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

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button
            type="button"
            key={filter.label}
            onClick={() => handleFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </FilterList>
      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <PageActions>
        <button type="button" onClick={() => handlePage(0)} disabled={page < 2}>
          Voltar
        </button>
        <button type="button" onClick={() => handlePage(1)}>
          Próxima
        </button>
      </PageActions>
    </Conteiner>
  );
}
