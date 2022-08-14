import React, { useState, useEffect } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import CompoundInterest from "./pages/CompoundInterest";
import VertexToStandard from "./pages/VertexToStandard";
import stringsEN from "./stringsEN";
import stringsES from "./stringsES";

function App() {
  const [language, setLanguage] = useState("ES")

  const switchLanguage = () => {
    setLanguage(prevState => prevState === "ES" ? "EN" : "ES")
  }

  const [strings, setStrings] = useState(stringsES)
  useEffect(() => {
    if (language === "ES") {
      setStrings(stringsES)
    } else {
      setStrings(stringsEN)
    }
  }, [language])

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/vertex-form-calculator" replace />}
        />
        <Route
          path="/vertex-form-calculator"
          element={<VertexToStandard onLanguageClick={switchLanguage} language={language} strings={strings} />}
        />
        <Route
          path="/compound-interest-calculator"
          element={<CompoundInterest onLanguageClick={switchLanguage} language={language} strings={strings} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
