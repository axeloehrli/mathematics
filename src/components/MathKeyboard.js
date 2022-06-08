import React, { useState } from "react"
import TriangleIcon from "../icons/triangle.svg"
import ReturnIcon from "../icons/keyboardReturnIcon.svg"

export default function MathKeyboard(props) {
  const [darkBackgroundKey, setDarkBackgroundKey] = useState()

  const keys =
    [
      "+", "7", "8", "9", "exit", "-", "4", "5", "6", "(",
      "x", "1", "2", "3", ")", "÷", ".", "0", "return", "=",
    ]

  const setDarkBackground = (key) => {
    setDarkBackgroundKey(key)
    setTimeout(() => {
      setDarkBackgroundKey()
    }, 100)
  }

  let divs = keys.map(key =>
    <div
      key={keys.indexOf(key)}
      className="math-key"
      onClick={() => {
        setDarkBackground(key)
        props.handleKeyClick(key)
      }}
      style={darkBackgroundKey === key ? { backgroundColor: "lightGray" } : {}}
    >
      {key === "exit" ? <img src={TriangleIcon} className="triangle-icon" /> : key === "return" ? <img src={ReturnIcon} /> : key}
    </div>
  )


  return (
    <div className="math-keyboard">
      {divs}
    </div>
  )
}