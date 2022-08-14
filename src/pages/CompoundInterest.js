import React, { useState } from "react";
import Investment from "../classes/Investment";
import Navbar from "../components/Navbar";

export default function CompoundInterest(props) {
  const [showDropdown, setShowDropdown] = useState(false)
  const fm = new Intl.NumberFormat("es-AR")

  const [investment, setInvestment] = useState(new Investment({ amount: 1000000, rate: 53, years: 1, capitalizationName: "Mensual" }))

  const handleCapitalizationNameChange = str => {
    setInvestment(prevState => {
      return new Investment(
        {
          ...prevState,
          capitalizationName: str
        }
      )
    })
  }
  const handleChange = e => {
    const id = e.target.id
    let value

    if (id === "amount") {
      value = parseFloat(e.target.value.replace("$", ""))
    } else {
      value = parseFloat(e.target.value)
    }
    setInvestment(prevState => {
      return new Investment(
        {
          ...prevState,
          [id]: isNaN(value) ? 0 : value
        }
      )
    })
  }


  return (
    <div className="compound-interest">
      <Navbar onLanguageClick={props.onLanguageClick} language={props.language} strings={props.strings} />
      <div className="inputs">
        <div className="compound--input-container">
          <label htmlFor="amount">Monto ARS</label>
          <input id="amount" type="text" value={`$${investment.amount}`} onChange={handleChange} />
        </div>
        <div className="compound--input-container">
          <label htmlFor="years">Plazo (años)</label>
          <input id="years" type="text" value={investment.years} onChange={handleChange} />
        </div>
        <div className="compound--input-container">
          <label htmlFor="capitalization">Capitalización</label>
          <input
            id="capitalization"
            type="text"
            value={investment.capitalizationName}
            readOnly
            onClick={() => setShowDropdown(prevState => !prevState)}
          />
          {showDropdown &&
            <div className="dropdown-menu">
              <p
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false)
                  handleCapitalizationNameChange("Anual")
                }
                }
              >
                Anual
              </p>
              <p
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false)
                  handleCapitalizationNameChange("Semestral")
                }
                }
              >
                Semestral
              </p>
              <p
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false)
                  handleCapitalizationNameChange("Cuatrimestral")
                }
                }
              >
                Cuatrimestral
              </p>
              <p
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false)
                  handleCapitalizationNameChange("Trimestral")
                }
                }
              >
                Trimestral
              </p>
              <p
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false)
                  handleCapitalizationNameChange("Mensual")
                }
                }
              >
                Mensual
              </p>
            </div>}
        </div>
        <div className="compound--input-container">
          <label htmlFor="rate">Tasa de interés</label>
          <input type="text" value={`${investment.rate}%`} readOnly />
          <input id="rate" type="range" min={0} max={100} value={investment.rate} onChange={handleChange} />
        </div>
      </div>
      {investment.hasInvalidInput ?
        <div className="function-info">
          <p className="function-info-label">
            Por favor, ingresar datos válidos
          </p>
        </div> :
        <div className="function-info">
          <div className="function-info-container">
            <p className="function-info-label">Monto inicial:</p>
            <p>${investment.amount}</p>
          </div>
          <div className="function-info-container">
            <p className="function-info-label">Interés ganado:</p>
            <p>${fm.format(investment.gainedInterest)}</p>
          </div>
          <div className="function-info-container">
            <p className="function-info-label">Total:</p>
            <p>${fm.format(investment.total)}</p>
          </div>
          <div className="function-info-container">
            <p className="function-info-label">TNA:</p>
            <p>{investment.rate}%</p>
          </div>
          <div className="function-info-container">
            <p className="function-info-label">TEA:</p>
            <p>{fm.format(investment.effectiveRate)}%</p>
          </div>
        </div>
      }
    </div>
  )
}