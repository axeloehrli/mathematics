import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<VertexToStandard onLanguageClick={switchLanguage} language={language} strings={strings} />}
          />
          <Route
            path="/mathematics"
            element={<VertexToStandard onLanguageClick={switchLanguage} language={language} strings={strings} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
