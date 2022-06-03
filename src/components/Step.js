import React, { useState } from "react";
import OpenIcon from "../icons/open.svg"
import CloseIcon from "../icons/close.svg"

export default function Step(props) {
  const step = props.step
  const [show, setShow] = useState(false)

  return (
    <div className="step" onClick={() => { setShow(prevState => !prevState) }}>
      <div className="step-main">
        <p className="step-title">{step.title}</p>
        <img src={show ? CloseIcon : OpenIcon} alt="icon" />
      </div>
      {show && (step.value && step.value)}
      {show && step.subSteps &&
        <div className="sub-steps">
          {step.subSteps.map(
            subStep =>
              <div key={subStep.title} className="sub-step">
                <p>{subStep.title}</p>
                {subStep.value}
              </div>
          )}
        </div>
      }
    </div>
  )
}