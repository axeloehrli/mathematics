import { useEffect, useState } from "react";
import Step from "./components/Step";


function App() {
  const [vertexFunction, setVertexFunction] = useState()

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

  const handleChange = (e) => {
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
    const step1 = { title: "Develop binomial", subSteps: simplifyBinomials() }
    const step2 = { title: "Replace result in formula", value: step1.subSteps[2].value }
    setSteps(prevSteps => [...prevSteps, step1, step2])
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
    return [step1, step2, step3]
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

  return (
    <div className="App">
      <p className="formula">
        f({formulaValues.x})={formulaValues.a}({formulaValues.x}{formulaValues.h > 0 ? "+" : ""}{formulaValues.h})^2{formulaValues.k > 0 ? "+" : formulaValues.k === "k" ? "-" : ""}{formulaValues.k}
      </p>
      <div className="inputs">
        <label htmlFor="a">a:</label>
        <input type="number" id="a" onChange={handleChange} />
        <label htmlFor="h">h:</label>
        <input type="number" id="h" onChange={handleChange} />
        <label htmlFor="k">k:</label>
        <input type="number" id="k" onChange={handleChange} />
      </div>
      <button onClick={onConvertClick}>Convert</button>

      {steps.length > 0 &&
        <div className="steps">
          {steps.map(step => <Step step={step} />)}
        </div>
      }
    </div>
  );
}

export default App;
