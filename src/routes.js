import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Repositories from "./pages/Repositories";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/repositories/:reposiroty" Component={Repositories} />
      </Routes>
    </BrowserRouter>
  );
}
