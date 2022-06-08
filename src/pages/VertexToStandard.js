import React, { useEffect, useState } from "react";
import VertexFunction from "../classes/VertexFunction";
import Navbar from "../components/Navbar";
import Step from "../components/Step"

export default function VertexToStandard() {
  const [vertexFunction, setVertexFunction] = useState(new VertexFunction({ a: 1, h: 0, k: 0 }))
  const [standardFunction, setStandardFunction] = useState(null)

  const [selectedInput, setSelectedInput] = useState()

  const [steps, setSteps] = useState([])

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
    setSteps(vertexFunction.vertexToStandardSteps())
    setStandardFunction(vertexFunction.fullStandardForm())
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
      <p className="form-label">Vertex Form:</p>
      {<p className="user-function">{vertexFunction.fullVertexFormula()}</p>}

      <p className="form-label">Standard Form:</p>
      {standardFunction !== null && <p className="standard-function">{standardFunction}</p>}

      <p className="form-label">Vertex:</p>
      {standardFunction !== null && <p style={{marginBottom:"12px"}} className="standard-function">{vertexFunction.vertex()}</p>}
      
      {steps.length !== 0 && <p className="form-label">Steps to find standard form:</p>}
      {steps.length !== 0 && steps.map((step, index) => <Step paddingTop={index === 0 ? true : false} key={step.title} step={step} />)}
    </div>
  )
}