export default class Investment {
  constructor(values) {
    this.amount = values.amount
    this.rate = values.rate
    this.years = values.years
    this.capitalizationName = values.capitalizationName
    this.capitalizations = this.getCapitalizations()
    this.gainedInterest = this.getGainedInterest()
    this.total = this.getTotal()
    this.effectiveRate = this.getEffectiveRate()
    this.hasInvalidInput = this.hasInvalidInput()
  }

  hasInvalidInput() {
    if (
      isNaN(this.amount) ||
      isNaN(this.rate) ||
      isNaN(this.years) ||
      isNaN(this.capitalizations)
    ) { return true }
    return false
  }

  getCapitalizations() {
    switch (this.capitalizationName) {
      case "Semestral":
        return 365 / 180
      case "Cuatrimestral":
        return 365 / 120
      case "Trimestral":
        return 365 / 90
      case "Mensual":
        return 365 / 30
      default:
        // Anual
        return 1
    }
  }

  getTotal() {
    const amount = parseFloat(this.amount)
    const rate = parseFloat(this.rate / 100)
    const years = parseFloat(this.years)
    const capitalizations = parseFloat(this.capitalizations)

    const result = amount * Math.pow(1 + rate / capitalizations, capitalizations * years)
    const roundedResult = Math.round(result * 100) / 100

    return roundedResult
  }

  getGainedInterest() {
    return this.getTotal() - this.amount
  }

  getEffectiveRate() {
    const rate = parseFloat(this.rate / 100)
    const caps = parseFloat(this.capitalizations)
    //return (Math.pow(1+rate/caps, caps) - 1) * 100
    return this.gainedInterest * 100 / this.amount
  }
}