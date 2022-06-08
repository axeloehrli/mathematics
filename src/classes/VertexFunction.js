export default class VertexFunction {
  constructor(values) {
    this.a = (values.a);
    this.h = (values.h);
    this.k = (values.k);
    this.standardForm = this.fullStandardForm()
  }

  isInputValid(input) {
    if (isNaN(input)) return false
    return true
  }

  vertex() {
    return `
    (${!this.isInputValid(parseFloat(this.h)) ? 0 : parseFloat(this.h)}, 
    ${!this.isInputValid(parseFloat(this.k)) ? 0 : parseFloat(this.k)})`
  }

  fullVertexFormula() {
    const a = this.isInputValid(parseFloat(this.a)) ? parseFloat(this.a) : 1
    const h = this.isInputValid(parseFloat(this.h)) ? parseFloat(this.h) : 0
    const k = this.isInputValid(parseFloat(this.k)) ? parseFloat(this.k) : 0

    const firstTerm = a === 1 ? "" : a
    const secondTerm = h === 0  ? "x²" : `(x${h * -1 > 0 ? "+" : ""}${h * -1})²`
    const thirdTerm = k === 0 ? "" : `${k > 0 ? "+" : ""}${k}`

    return `y = ${firstTerm}${secondTerm}${thirdTerm}`
  }

  fullStandardForm() {
    if (this.vertexToStandardSteps()[3] === undefined) return this.fullVertexFormula()
    return this.vertexToStandardSteps()[3].value
  }

  vertexToStandardSteps() {
    const a = this.isInputValid(parseFloat(this.a)) ? parseFloat(this.a) : 1
    const h = this.isInputValid(parseFloat(this.h)) ? parseFloat(this.h) : 0
    const k = this.isInputValid(parseFloat(this.k)) ? parseFloat(this.k) : 0

    if (h === 0) return []

    const multiplyBinomial = this.multiplyBinomial()
    let step1
    let step2
    let step3
    let step4

    step1 = {
      title: "Multiply binomials",
      subSteps: multiplyBinomial.steps
    }
    step2 = {
      title: "Replace result in formula",
      value: `
      y = ${a}
      (${multiplyBinomial.result})
      ${k > 0 ? "+" : ""}${k !== 0 ? k : ""}`
    }
    step3 = {
      title: "Apply distributive property",
      value: `
      y = ${a}x²
      ${a * multiplyBinomial.firstTerm > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.firstTerm).toFixed(2))}x
      ${a * multiplyBinomial.secondTerm > 0 ? "+" : ""}${parseFloat((a * multiplyBinomial.secondTerm).toFixed(2))}
      ${k > 0 ? "+" : ""}${k !== 0 ? k : ""}`
    }
    step4 = {
      title: "Combine similar values",
      value: `
      y = ${a}x²
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