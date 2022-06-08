import React, { useState } from "react";
import OpenIcon from "../icons/open.svg"
import CloseIcon from "../icons/close.svg"

export default function Step(props) {
  const step = props.step
  const [show, setShow] = useState(false)

  return (
    <div className={props.paddingTop ? "step padding" : "step"} >
      <div className="step-main" onClick={() => { setShow(prevState => !prevState) }}>
        <p className="step-title">{step.title}</p>
        <img src={show ? CloseIcon : OpenIcon} alt="icon" />
      </div>
      {show && (step.value && <p className="step-value">{step.value}</p>)}
      {show && step.subSteps &&
        <div className="sub-steps">
          {step.subSteps.map(
            subStep =>
              <div className="sub-step" key={subStep.title}>
                <p>{subStep.title}</p>
                <p>{subStep.value}</p>
              </div>
          )}
        </div>
      }
    </div>
  )
}