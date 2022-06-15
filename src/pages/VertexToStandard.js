import React, { useEffect, useState } from "react";
import VertexFunction from "../classes/VertexFunction";
import Navbar from "../components/Navbar";
import Step from "../components/Step"
import VictoryGraph from "../components/VictoryGraph";

export default function VertexToStandard() {
  const [vertexFunction, setVertexFunction] = useState(new VertexFunction({ a: 1, h: 2, k: -3 }))
  const [standardFunction, setStandardFunction] = useState(null)

  const [selectedInput, setSelectedInput] = useState()

  const [convertToStandardSteps, setConvertToStandardSteps] = useState([])
  const [findRootsSteps, setFindRootsSteps] = useState([])
  const [findYInterceptSteps, setFindYInterceptSteps] = useState([])

  const handleInputClick = e => {
    e.preventDefault()
    setSelectedInput(e.target.id)
  }

  const validateInput = (input, isZeroValid) => {
    if (!isZeroValid && input === "0") return false
    if (isNaN(input)) return false
    if (input === "") return false
    return true
  }
  const convertToStandard = () => {
    setConvertToStandardSteps(vertexFunction.vertexToStandardSteps())
    setStandardFunction(vertexFunction.fullStandardForm())
    setFindRootsSteps(vertexFunction.findRootsSteps().steps)
    setFindYInterceptSteps(vertexFunction.findYInterceptSteps().steps)
  }
  const handleChange = (e) => {
    // Only allows numbers, - and .
    const regex1 = new RegExp(/^[-\d. ]*$/)
    if (!regex1.test(e.target.value)) return
    setVertexFunction(prevState => {
      return new VertexFunction(
        {
          ...prevState,
          [e.target.id]: e.target.value
        }
      )
    })
  }

  useEffect(() => {
    convertToStandard()
  }, [vertexFunction])

  return (
    <div className="vertex-to-standard" >
      <Navbar />
      <p className="formula">
        Vertex form: y = a(x-h)<sup>2</sup> + k
      </p>
      <div className="inputs">
        <div className="input-container" style={selectedInput === "a" ? { borderBottom: "2px solid #ff3737" } : {}} onClick={handleInputClick} id="a">
          <label htmlFor="a">a</label>
          <input type="text" id="a" value={vertexFunction.a} onChange={handleChange}>
          </input>
        </div>
        {!validateInput(vertexFunction.a, false) && <p style={{ color: "red", fontSize: "14px" }}>Invalid Number</p>}

        <div className="input-container" style={selectedInput === "h" ? { borderBottom: "2px solid #ff3737" } : {}} onClick={handleInputClick} id="h">
          <label htmlFor="h">h</label>
          <input type="text" id="h" value={vertexFunction.h} onChange={handleChange}></input>
        </div>
        {!validateInput(vertexFunction.h, true) && <p style={{ color: "red", fontSize: "14px" }}>Invalid Number</p>}

        <div className="input-container" style={selectedInput === "k" ? { borderBottom: "2px solid #ff3737" } : {}} onClick={handleInputClick} id="k">
          <label htmlFor="k">k</label>
          <input type="text" id="k" value={vertexFunction.k} onChange={handleChange}></input>
        </div>
        {!validateInput(vertexFunction.k, true) && <p style={{ color: "red", fontSize: "14px" }}>Invalid number</p>}

      </div>
      <VictoryGraph
        function={vertexFunction}
      />

      <div className="function-info">
        <div className="function-info-container">
          <p className="form-label">Vertex Form:</p>
          <p className="function-info-p">{vertexFunction.fullVertexFormula()}</p>
        </div>
        <div className="function-info-container">
          <p className="form-label">Standard Form:</p>
          <p className="function-info-p">{standardFunction}</p>
        </div>
        <div className="function-info-container">
          <p className="form-label">Vertex:</p>
          <p className="function-info-p">{vertexFunction.vertex}</p>
        </div>
        <div className="function-info-container">
          <p className="form-label">Roots:</p>
          <p className="function-info-p">
            {vertexFunction.roots.x1 === vertexFunction.roots.x2 ?
              `x: ${vertexFunction.roots.x1}` :
              `x₁ : ${vertexFunction.roots.x1}
            x₂ : ${vertexFunction.roots.x2}`
            }
            <br />
          </p>
        </div>
      </div>
      <div className="steps">
        {convertToStandardSteps.length !== 0 && (
          <div className="steps-container">
            <p className="steps-title">Steps to find standard form:</p>
            {convertToStandardSteps.map(step => <Step key={step.title} step={step} />)}
          </div>)}
        {findRootsSteps.length !== 0 && (
          <div className="steps-container">
            <p className="steps-title">Steps to find roots:</p>
            {findRootsSteps.map(step=> <Step key={step.title} step={step} />)}
          </div>
        )}
        {findYInterceptSteps.length !== 0 && (
          <div className="steps-container">
            <p className="steps-title">Steps to find Y-Intercept:</p>
            {findYInterceptSteps.map(step => <Step key={step.title} step={step}/>)}
          </div>
        )}
      </div>
    </div>
  )
}