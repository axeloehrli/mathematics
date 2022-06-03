import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MathKeyboard from "../components/MathKeyboard";
import Step from "../components/Step"

export default function VertexToStandard() {
  const [showKeyboard, setShowKeyboard] = useState(false)

  const [vertexFunction, setVertexFunction] = useState({ a: "1", h: "0", k: "0" })
  const [standardFunction, setStandardFunction] = useState(null)

  const [selectedInput, setSelectedInput] = useState()

  const [steps, setSteps] = useState([])

  const handleInputClick = e => {
    e.preventDefault()
    setShowKeyboard(true)
    setSelectedInput(e.target.id)
  }

  const handleKeyClick = key => {
    switch (key) {
      case "exit":
        setShowKeyboard(false)
        setSelectedInput()
        break;
      case "return":
        if (vertexFunction[selectedInput].length === 1) {
          setVertexFunction(prevState => {
            return { ...prevState, [selectedInput]: selectedInput === "a" ? "1" : "0" }
          })
        } else {
          setVertexFunction(prevState => {
            return { ...prevState, [selectedInput]: prevState[selectedInput].slice(0, -1) }
          })
        }
        break;
      default:
        setVertexFunction(prevState => {
          let newValue
          // If input value is default, new value will be whatever we first type
          if (prevState[selectedInput].length === undefined || prevState[selectedInput[0]] === "0") {
            newValue = key
          } else {
            newValue = prevState[selectedInput] + key
          }
          return {
            ...prevState,
            [selectedInput]: newValue
          }
        })
        break;
    }


  }

  const validateInput = input => {
    if (isNaN(input)) return false
    if (input % 1 != 0) return false
    if (input === "") return false
    return true
  }

  const fullVertexFormula = () => {
    const firstTerm = vertexFunction.a == "1" || !validateInput(vertexFunction.a) ? "" : vertexFunction.a
    const secondTerm = vertexFunction.h != "0" && validateInput(vertexFunction.h) ? `(x${vertexFunction.h * - 1 > 0 ? "+" : ""}${vertexFunction.h * - 1})` : "x"
    const thirdTerm = vertexFunction.k != "0" ? `${vertexFunction.k > 0 ? "+" : ""}${vertexFunction.k}` : ""

    if (!validateInput(vertexFunction.a) || !validateInput(vertexFunction.h) || !validateInput(vertexFunction.k)) return <p className="user-function">Invalid input</p>
    return <p className="user-function">y = {firstTerm}{secondTerm}<sup>2</sup>{thirdTerm}</p>
  }

  const convertToStandard = () => {
    const binomialInfo = multiplyBinomial()
    console.log(binomialInfo.firstTerm);
    console.log(parseInt(vertexFunction.k));
    const step1 = { title: "Multiply binomials", subSteps: binomialInfo.subSteps }
    const step2 = { title: "Replace result in formula", value: <p className="step-value">y = {vertexFunction.a != 1 && vertexFunction.a}x<sup>2</sup>{binomialInfo.result}{vertexFunction.k > 0 ? "+" : ""}{vertexFunction.k != 0 && vertexFunction.k}</p> }
    const step3 = { title: "Combine similar numbers", value: <p className="step-value">y = {vertexFunction.a != 1 && vertexFunction.a}x<sup>2</sup>{binomialInfo.firstTerm > 0 ? "+" : ""}{binomialInfo.firstTerm}x{binomialInfo.secondTerm + parseInt(vertexFunction.k) > 0 ? "+" : ""}{binomialInfo.secondTerm + parseInt(vertexFunction.k)}</p> }
    setStandardFunction(<p className="standard-function">y = {vertexFunction.a != 1 && vertexFunction.a}x<sup>2</sup>{binomialInfo.firstTerm > 0 ? "+" : ""}{binomialInfo.firstTerm}x{binomialInfo.secondTerm + parseInt(vertexFunction.k) > 0 ? "+" : ""}{ binomialInfo.secondTerm + parseInt(vertexFunction.k)}</p>)
    setSteps(prevState => [...prevState, step1, step2, step3])
  }

  const multiplyBinomial = () => {
    const h = parseInt(vertexFunction.h) * -1

    const step1 = {
      title: "Simplify binomial",
      value: <p className="sub-step">(x{h > 0 ? "+" : ""}{h}) . (x{h > 0 ? "+" : ""}{h})</p>
    }
    const step2 = {
      title: "Apply distributive property",
      value: <p className="sub-step">x<sup>2</sup>{h > 0 ? "+" : ""}{h}x{h > 0 ? "+" : ""}{h}x{h * h > 0 ? "+" : ""}{h * h}</p>
    }
    const step3 = {
      title: "Combine similar numbers",
      value: <p className="sub-step">x<sup>2</sup>{h > 0 ? "+" : ""}{h + h}x+{h * h}</p>
    }
    const info = {
      subSteps: [
        step1,
        step2,
        step3,
      ],
      firstTerm: h + h,
      secondTerm: h * h,
      result: `${h > 0 ? "+" : ""}${h + h}x+${h * h}`
    }
    return info
  }

  return (
    <div className="vertex-to-standard" >
      <Header />
      <p className="formula">
        Vertex form: y = a(x-h)<sup>2</sup> + k
      </p>
      <div className="inputs">
        <div className="input-container" style={selectedInput === "a" ? { borderBottom: "2px solid #ff3737" } : {}} onClick={handleInputClick} id="a">
          <label htmlFor="a">a</label>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0 8px" }} id="a">{vertexFunction.a}</div>
        </div>
        {!validateInput(vertexFunction.a) && <p style={{ color: "red", fontSize: "14px" }}>Invalid Number</p>}

        <div className="input-container" style={selectedInput === "h" ? { borderBottom: "2px solid #ff3737" } : {}} onClick={handleInputClick} id="h">
          <label htmlFor="h">h</label>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0 8px" }} id="h">{vertexFunction.h}</div>
        </div>
        {!validateInput(vertexFunction.h) && <p style={{ color: "red", fontSize: "14px" }}>Invalid Number</p>}

        <div className="input-container" style={selectedInput === "k" ? { borderBottom: "2px solid #ff3737" } : {}} onClick={handleInputClick} id="k">
          <label htmlFor="k">k</label>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0 8px" }} id="k">{vertexFunction.k}</div>
        </div>
        {!validateInput(vertexFunction.k) && <p style={{ color: "red", fontSize: "14px" }}>Invalid number</p>}

      </div>

      {fullVertexFormula()}
      <button onClick={convertToStandard}>Convert</button>
      {steps.length !== 0 && steps.map(step => <Step step={step} />)}
      {standardFunction !== null && standardFunction}
      {showKeyboard && <MathKeyboard handleKeyClick={key => handleKeyClick(key)} />}
    </div>
  )
}