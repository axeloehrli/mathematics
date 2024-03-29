export default class VertexFunction {
  constructor(values, strings) {
    this.a = (values.a);
    this.h = (values.h);
    this.k = (values.k);
    this.strings = strings;
    this.vertex = this.getVertex()
    this.roots = this.findRootsSteps().roots
    this.YIntercept = this.findYInterceptSteps().result
    this.vertexForm = this.fullVertexForm()
    this.standardForm = this.fullStandardForm()
    this.points = this.findPoints()
  }

  /* 
  Finds points for the equation, starting 
  from the vertex and finishing in an end value
  */
  findPoints() {
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)

    const startValue = h

    let endValue
    /*
    If there are no roots, the end value will be
    5 units to the right, otherwise, it will be 3
    units after the root.
    */
    if (isNaN(this.roots.x2)) {
      endValue = h + 5
    } else {
      endValue = this.roots.x2 + 3
    }

    const points = []

    /* 
    Finds points on the right side of the vertex.
    */
    for (let i = startValue; i <= endValue; i++) {
      const solveParentheses = Math.pow((i - h), 2)
      const multiplyByA = solveParentheses * a
      const addK = multiplyByA + k
      points.push({ x: i, y: addK })
    }

    /* 
    Finds points in the left side of the vertex.
    The limit is however many points were found 
    on the right side of the vertex
    */
    let count = startValue - 1
    const limit = points.length - 1
    for (let i = 0; i < limit; i++) {
      const solveParentheses = Math.pow((count - h), 2)
      const multiplyByA = solveParentheses * a
      const addK = multiplyByA + k
      points.unshift({ x: count, y: addK })
      count--
    }
    /*
    If there are roots and the points array doesn't
    already include them, it pushes them to the array
    and sorts it
    */
    if (
      !isNaN(this.roots.x1) &&
      !isNaN(this.roots.x2) &&
      this.roots.x1 !== h &&
      this.roots.x2 !== h &&
      !points.filter(e => e.x === this.roots.x1).length > 0 &&
      !points.filter(e => e.x === this.roots.x2).length > 0
    ) {
      points.push({ x: this.roots.x1, y: 0 })
      points.push({ x: this.roots.x2, y: 0 })
      points.sort((a, b) => a.x - b.x)
    }


    /* 
    If the Y-Intercept point is between the vertex
    and the last point of the array, and the 
    points array doesn't already include it,
    it pushes it to the points array
    */
    if (
      a > 0 && 
      this.YIntercept > this.vertex.y &&
      this.YIntercept < points[points.length - 1].y &&
      !points.filter(e => e.x === 0).length > 0
    ) {
      points.push({ x: 0, y: this.YIntercept })
    } else if (
      a < 0 && 
      this.YIntercept < this.vertex.y &&
      this.YIntercept > points[points.length - 1].y &&
      !points.filter(e => e.x === 0).length > 0
    ) {
      points.push({ x: 0, y: this.YIntercept })
    }

    points.sort((a, b) => a.x - b.x)
    return { points: points, startValue: startValue, endValue: endValue }
  }

  isInputValid(input) {
    if (isNaN(parseFloat(input))) return false
    return true
  }

  getVertex() {
    return {
      x: this.isInputValid(this.h) ? parseFloat(this.h) : 0,
      y: this.isInputValid(this.k) ? parseFloat(this.k) : 0
    }
  }

  fullVertexForm() {
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)

    const firstTerm = a === 1 ? "" : a
    const secondTerm = h === 0 ? "x²" : `(x${h * -1 > 0 ? "+" : ""}${h * -1})²`
    const thirdTerm = k === 0 ? "" : `${k > 0 ? "+" : ""}${k}`

    return `y = ${firstTerm}${secondTerm}${thirdTerm}`
  }

  fullStandardForm() {
    if (this.vertexToStandardSteps()[3] === undefined) {
      if (this.vertexToStandardSteps()[2] === undefined) {
        return this.vertexForm
      } else {
        return this.vertexToStandardSteps()[2].value
      }
    } else {
      return this.vertexToStandardSteps()[3].value
    }
  }

  findYInterceptSteps() {
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)
    const strings = this.strings.steps.findYIntercept


    const firstTerm = a === 1 ? "" : a
    const thirdTerm = k === 0 ? "" : `${k > 0 ? "+" : ""}${k}`

    const step1 = {
      title: strings.replaceX,
      value:
        `
      y = 
      ${firstTerm}
      ${h === 0 ? "0²" : `(0${h * -1 > 0 ? "+" : ""}${h * -1})²`}
      ${thirdTerm}
      `
    }

    const result = a * Math.pow(0 - h, 2) + k
    const step2 = {
      title: strings.solveEquation,
      value: `
        y = ${result}
      `
    }

    return { steps: [step1, step2], result: result }
  }

  findRootsSteps() {
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)
    const strings = this.strings.steps.findRoots
    if (k === 0) {
      return { steps: [], roots: { x1: h, x2: h } }
    }

    const firstTerm = a === 1 ? "" : a
    const secondTerm = h === 0 ? "x²" : `(x${h * -1 > 0 ? "+" : ""}${h * -1})²`
    const thirdTerm = k === 0 ? "" : `${k > 0 ? "+" : ""}${k}`


    const step1 = {
      title: strings.equalFunction,
      value: `${firstTerm}${secondTerm}${thirdTerm} = 0`
    }

    const equation = this.solveEquation(a, h, k)
    const step2 = {
      title: strings.solveEquation,
      subSteps: equation.subSteps
    }
    return {
      steps: [step1, step2],
      roots: equation.result
    }
  }

  solveEquation(a, h, k) {
    const firstTerm = a === 1 ? "" : a
    const secondTerm = h === 0 ? "x²" : `(x${h * -1 > 0 ? "+" : ""}${h * -1})²`
    const strings = this.strings.steps.findRoots

    /* STEP 1 */
    /*  Convert number into opposite number 
     since we're moving it to the other side of the equation */
    const step1Values = {
      rightSideValue: (k > 0) ? (0 - k) : (0 + k * -1)
    }
    const step1 = {
      title: strings.subStep1,
      value: `${firstTerm}${secondTerm} = ${step1Values.rightSideValue}`
    }

    /* STEP 2 */
    const step2Values = {
      rightSideValue: step1Values.rightSideValue / a
    }
    const step2 = {
      title: strings.subStep2,
      value: `${secondTerm} = ${step2Values.rightSideValue}`
    }

    /* STEP 3 */
    let step3
    if (h === 0) {
      step3 = {
        title: strings.subStep3,
        value: `x = √${step2Values.rightSideValue}`
      }
    } else {
      step3 = {
        title: strings.subStep3,
        value: `(x${h * -1 > 0 ? "+" : ""}${h * -1}) = √${step2Values.rightSideValue}`
      }
    }


    /* STEP 4 */
    let step4
    const step4Values = {
      rightSideValue: parseFloat(Math.sqrt(step2Values.rightSideValue).toFixed(2))
    }
    if (h === 0) {
      step4 = {
        title: strings.subStep4,
        value: `|x| = ${step4Values.rightSideValue}`
      }
    } else {
      step4 = {
        title: strings.subStep4,
        value: `|x${h * -1 > 0 ? "+" : ""}${h * -1}| = ${step4Values.rightSideValue}`
      }
    }


    /* STEP 5 */
    const step5Values = {
      rightSideValue: -1 * step4Values.rightSideValue,
      x: h > 0 ? -1 * step4Values.rightSideValue + h : -1 * step4Values.rightSideValue - h * -1
    }

    let step5
    if (h === 0) {
      step5 = {
        title: strings.subStep5,
        value: `x = ${step4Values.rightSideValue * -1}`
      }
    } else {
      step5 = {
        title: strings.subStep5,
        value: `x = ${step5Values.rightSideValue} ${h > 0 ? "+" : ""}${h !== 0 ? h : ""} = ${step5Values.x}`
      }
    }



    /* STEP 6 */
    const step6Values = {
      rightSideValue: step4Values.rightSideValue,
      x: h > 0 ? step4Values.rightSideValue + h : step4Values.rightSideValue - h * -1
    }
    let step6
    if (h === 0) {
      step6 = {
        title: strings.subStep6,
        value: `x = ${step4Values.rightSideValue}`
      }
    } else {
      step6 = {
        title: strings.subStep6,
        value: `x = ${step6Values.rightSideValue} ${h > 0 ? "+" : ""}${h !== 0 ? h : ""} = ${step6Values.x}`
      }
    }

    return {
      subSteps: [step1, step2, step3, step4, step5, step6],
      result: {
        x1: step5Values.x,
        x2: step6Values.x
      }
    }
  }

  vertexToStandardSteps() {
    const strings = this.strings.steps.findStandardForm
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)

    if (h === 0) return []
    const multiplyBinomial = this.multiplyBinomial()
    const step1 = {
      title: strings.expandBinomials,
      subSteps: multiplyBinomial.steps
    }
    const step2 = {
      title: strings.replaceResult,
      value: `
      y = ${a}
      (${multiplyBinomial.result})
      ${k > 0 ? "+" : ""}${k !== 0 ? k : ""}`
    }
    const step3 = {
      title: strings.applyDist,
      value: `
      y = ${a === 1 ? "" : a}x²
      ${a * multiplyBinomial.firstTerm > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.firstTerm).toFixed(2))}x
      ${a * multiplyBinomial.secondTerm > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.secondTerm).toFixed(2))}
      ${k > 0 ? "+" : ""}${k !== 0 ? k : ""}`
    }
    const step4 = {
      title: strings.combineValues,
      value: `
      y = ${a === 1 ? "" : a}x²
      ${a * multiplyBinomial.firstTerm > 0 ? "+" : ""} ${parseFloat((a * multiplyBinomial.firstTerm).toFixed(2))}x
      ${a * multiplyBinomial.secondTerm + k > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.secondTerm + k).toFixed(2))}`
    }
    if (k === 0) return [step1, step2, step3]
    return [step1, step2, step3, step4]
  }

  multiplyBinomial() {
    // Multiply by -1 since h appears as opposite in vertex form
    const h = parseFloat(this.h) * -1
    const strings = this.strings.steps.findStandardForm
    const step1 = {
      title: strings.simplifyBinomials,
      value: `(x${h > 0 ? "+" : ""}${h} ) . (x${h > 0 ? "+" : ""}${h})`
    }

    const step2 = {
      title: strings.applyDist,
      value: `x²${h > 0 ? "+" : ""}${h}x${h > 0 ? "+" : ""}${h}x${h * h > 0 ? "+" : ""}${parseFloat((h * h).toFixed(2))}`
    }

    const step3 = {
      title: strings.combineValues,
      value: `x²${h + h > 0 ? "+" : ""}${h + h}x${h * h > 0 ? "+" : ""}${parseFloat((h * h).toFixed(2))}`
    }

    return {
      steps: [step1, step2, step3],
      result: step3.value,
      firstTerm: h + h,
      secondTerm: h * h
    }
  }
}