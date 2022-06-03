import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MathKeyboard from "./components/MathKeyboard";
import Step from "./components/Step";
import VertexToStandard from "./pages/VertexToStandard";

function App() {
  const [vertexFunction, setVertexFunction] = useState()
  const [standardFunction, setStandardFunction] = useState()

  const [steps, setSteps] = useState([])

  const [formulaValues, setFormulaValues] =
    useState(
      {
        a: "a",
        x: "x",
        h: "-h",
        k: "+k"
      }
    )

  /*  const [a, setA] = "a"
   const [h, setH] = "h"
   const [k, setK] = "k"
   const [x, setX] = "x" */

  const [invalidInput, setInvalidInput] = useState(true)

  /* const handleChange = (e) => {
    const { id, value } = e.target

    if (Number.isInteger(parseInt(value)) === false) {
      setFormulaValues(prevState => {
        return { ...prevState, [id]: id === "h" ? "-h" : "+k" }
      })
      return
    }
    setFormulaValues(prevState => {
      return { ...prevState, [id]: value }
    })
  }

  const convertToStandard = () => {
    const binomialInfo = simplifyBinomials()
    const step1 = { title: "Develop binomial", subSteps: binomialInfo.subSteps }
    const step2 = { title: "Replace result in formula", value: <p className="step-value">f(x)={vertexFunction.a}(x<sup>2</sup>+{binomialInfo.firstTerm}x+{binomialInfo.secondTerm}){vertexFunction.k > 0 ? "+" : ""}{vertexFunction.k}</p> }
    const step3 = { title: "Apply distributive property", value: <p className="step-value">f(x)={vertexFunction.a}x<sup>2</sup>+{vertexFunction.a * binomialInfo.firstTerm}x+{vertexFunction.a * binomialInfo.secondTerm}{vertexFunction.k > 0 ? "+" : ""}{vertexFunction.k}</p> }
    const step4 = { title: "Combine similar numbers", value: <p className="step-value">f(x)={vertexFunction.a}x<sup>2</sup>+{vertexFunction.a * binomialInfo.firstTerm}x{parseInt(vertexFunction.a * binomialInfo.secondTerm) + parseInt(vertexFunction.k) > 0 ? "+" : ""}{parseInt(vertexFunction.a * binomialInfo.secondTerm) + parseInt(vertexFunction.k)}</p> }
    setSteps(prevSteps => [...prevSteps, step1, step2, step3, step4])
  }

  const simplifyBinomials = () => {
    const a = vertexFunction.a
    const h = parseInt(vertexFunction.h)
    const k = vertexFunction.k

    const step1 = {
      title: "Simplify binomial",
      value: `(x${h > 0 ? "+" : ""}${h}) . (x${h > 0 ? "+" : ""}${h})`
    }

    const step2 = {
      title: "Apply distributive property",
      value: `x^2${h > 0 ? "+" : ""}${h}x${h > 0 ? "+" : ""}${h}x+${h * h}`
    }

    const step3 = {
      title: "Combine similar numbers",
      value: `x^2${h > 0 ? "+" : ""}${h + h}x+${h * h}`
    }
    return { firstTerm: h + h, secondTerm: h * h, subSteps: [step1, step2, step3] }
  }

  const onConvertClick = () => {
    setVertexFunction(
      {
        a: formulaValues.a,
        x: formulaValues.x,
        h: formulaValues.h,
        k: formulaValues.k
      }
    )
  }

  useEffect(() => {
    if (vertexFunction === undefined) return
    convertToStandard(vertexFunction.h)
  }, [vertexFunction])

  useEffect(() => {
    console.log(steps);
  }, [steps])
 */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VertexToStandard />} />
        <Route path="/mathematics" element={<VertexToStandard />} />
      </Routes>
    </BrowserRouter>
   /*  <div className="App">
      <Header />
      <p className="formula">
        Vertex form: f({formulaValues.x})={formulaValues.a}({formulaValues.x}{formulaValues.h > 0 ? "+" : ""}{formulaValues.h})<sup>2</sup>{formulaValues.k > 0 ? "+" : formulaValues.k === "k" ? "-" : ""}{formulaValues.k}
      </p>
      <div className="inputs">
        <div className="input-container">
          <label htmlFor="a">a</label>
          <input type="" id="a" onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="h">h</label>
          <input type="number" id="h" onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="k">k</label>
          <input type="tel" id="k" onChange={handleChange} />
        </div>
      </div>
      <button>Convert</button>

      {steps.length > 0 &&
        <div className="steps">
          {steps.map(step => <Step key={step.title} step={step} />)}
        </div>
      }
    </div> */
  );
}

export default App;
