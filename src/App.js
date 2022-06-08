import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VertexToStandard from "./pages/VertexToStandard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VertexToStandard />} />
        <Route path="/mathematics" element={<VertexToStandard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
