export default class VertexFunction {
  constructor(values) {
    this.a = (values.a);
    this.h = (values.h);
    this.k = (values.k);
    this.vertex = this.getVertex()
    this.roots = this.findRootsSteps().roots
    this.YIntercept = this.findYInterceptSteps().result
    this.vertexForm = this.fullVertexForm()
    this.standardForm = this.fullStandardForm()
    this.points = this.findPoints()
  }

  findPoints() {
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)

    const startValue = h
    let endValue
    if (isNaN(this.roots.x2)) {
      endValue = h + 5
    } else {
      endValue = this.roots.x2 + 3
    }

    const points = []

    for (let i = startValue; i <= endValue; i++) {
      const solveParentheses = Math.pow((i - h), 2)
      const multiplyByA = solveParentheses * a
      const addK = multiplyByA + k
      points.push({ x: i, y: addK })
    }

    let count = startValue - 1
    let currentY = k
    if (a > 0) {
      while (currentY < points[points.length - 1].y) {
        const solveParentheses = Math.pow((count - h), 2)
        const multiplyByA = solveParentheses * a
        const addK = multiplyByA + k
        points.unshift({ x: count, y: addK })
        currentY = addK
        count--
      }
    } else {
      while (currentY > points[points.length - 1].y) {
        const solveParentheses = Math.pow((count - h), 2)
        const multiplyByA = solveParentheses * a
        const addK = multiplyByA + k
        points.unshift({ x: count, y: addK })
        currentY = addK
        count--
      }
    }

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

    if(a > 0 && this.YIntercept > this.vertex.y && this.YIntercept < points[points.length -1].y) {
      points.push({x: 0, y:this.YIntercept})
      console.log("hello");
    } else if (a < 0 && this.YIntercept < this.vertex.y && this.YIntercept > points[points.length -1].y) {
      points.push({x: 0, y:this.YIntercept})
      console.log("hello");
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


    const firstTerm = a === 1 ? "" : a
    const thirdTerm = k === 0 ? "" : `${k > 0 ? "+" : ""}${k}`

    const step1 = {
      title: "Replace 'x' with 0",
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
      title: "Solve equation",
      value: `
        y = ${result}
      `
    }

    return {steps:[step1, step2], result: result}
  }

  findRootsSteps() {
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)

    if (k === 0) {
      return { steps: [], roots: { x1: h, x2: h } }
    }

    const firstTerm = a === 1 ? "" : a
    const secondTerm = h === 0 ? "x²" : `(x${h * -1 > 0 ? "+" : ""}${h * -1})²`
    const thirdTerm = k === 0 ? "" : `${k > 0 ? "+" : ""}${k}`


    const step1 = {
      title: "Equal function to 0",
      value: `${firstTerm}${secondTerm}${thirdTerm} = 0`
    }

    const equation = this.solveEquation(a, h, k)
    const step2 = {
      title: "Solve equation",
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

    /* STEP 1 */
    /*  Convert number into opposite number 
     since we're moving it to the other side of the equation */
    const step1Values = {
      rightSideValue: (k > 0) ? (0 - k) : (0 + k * -1)
    }
    const step1 = {
      title: "Move 'k' to the other side of the equation",
      value: `${firstTerm}${secondTerm} = ${step1Values.rightSideValue}`
    }

    /* STEP 2 */
    const step2Values = {
      rightSideValue: step1Values.rightSideValue / a
    }
    const step2 = {
      title: "Divide right side by 'a'",
      value: `${secondTerm} = ${step2Values.rightSideValue}`
    }

    /* STEP 3 */
    let step3
    if (h === 0) {
      step3 = {
        title: "Move exponent to the right side as square root",
        value: `x = √${step2Values.rightSideValue}`
      }
    } else {
      step3 = {
        title: "Move exponent to the right side as square root",
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
        title: "Solve square root and use absolute value",
        value: `|x| = ${step4Values.rightSideValue}`
      }
    } else {
      step4 = {
        title: "Solve square root and use absolute value",
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
        title: "Solution 1",
        value: `x = ${step4Values.rightSideValue * -1}`
      }
    } else {
      step5 = {
        title: "Solution 1",
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
        title: "Solution 2",
        value: `x = ${step4Values.rightSideValue}`
      }
    } else {
      step6 = {
        title: "Solution 2",
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
    const a = !this.isInputValid(parseFloat(this.a)) || parseFloat(this.a) === 0 ? 1 : parseFloat(this.a)
    const h = !this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)
    const k = !this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)

    if (h === 0) return []

    const multiplyBinomial = this.multiplyBinomial()

    const step1 = {
      title: "Expand binomials",
      subSteps: multiplyBinomial.steps
    }
    const step2 = {
      title: "Replace result in formula",
      value: `
      y = ${a}
      (${multiplyBinomial.result})
      ${k > 0 ? "+" : ""}${k !== 0 ? k : ""}`
    }
    const step3 = {
      title: "Apply distributive property",
      value: `
      y = ${a === 1 ? "" : a}x²
      ${a * multiplyBinomial.firstTerm > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.firstTerm).toFixed(2))}x
      ${a * multiplyBinomial.secondTerm > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.secondTerm).toFixed(2))}
      ${k > 0 ? "+" : ""}${k !== 0 ? k : ""}`
    }
    const step4 = {
      title: "Combine similar values",
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

    const step1 = {
      title: "Simplify binomial",
      value: `(x${h > 0 ? "+" : ""}${h} ) . (x${h > 0 ? "+" : ""}${h})`
    }

    const step2 = {
      title: "Apply distributive property",
      value: `x²${h > 0 ? "+" : ""}${h}x${h > 0 ? "+" : ""}${h}x${h * h > 0 ? "+" : ""}${parseFloat((h * h).toFixed(2))}`
    }

    const step3 = {
      title: "Combine similar values",
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