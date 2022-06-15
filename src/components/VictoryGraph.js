import React from "react"
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryZoomContainer } from "victory"
export default function VictoryGraph(props) {
  const yPoints = props.function.points.points.map(point => point.y)
  const maxYNumber = Math.max.apply(Math, yPoints)
  const minYNumber = Math.min.apply(Math, yPoints)
  const suggestedYMax = minYNumber * -1 > maxYNumber ? minYNumber * -1 : maxYNumber
  const suggestedYMin = maxYNumber * -1 < minYNumber ? maxYNumber * -1 : minYNumber

  const xPoints = props.function.points.points.map(point => point.x)
  const maxXNumber = Math.max.apply(Math, xPoints)
  const minXNumber = Math.min.apply(Math, xPoints)
  const suggestedXMax = minXNumber * -1 > maxXNumber ? minXNumber * -1 : maxXNumber
  const suggestedXMin = maxXNumber * -1 < minXNumber ? maxXNumber * -1 : minXNumber

  const k = isNaN(parseFloat(props.function.k)) ? 0 : parseFloat(props.function.k)
  const getPointColor = (point) => {
    if (parseFloat(point.y) === k || parseFloat(point.y) === 0 || parseFloat(point.x) === 0) return "red"
    return "black"
  }
  return (
    <VictoryChart
      standalone={true}
      width={350}
      height={350}
      padding={{ top: 40, bottom: 40, left: 30, right: 30 }}
      containerComponent={
        <VictoryVoronoiContainer
          style={{
            touchAction: "auto"
          }}
          voronoiBlacklist={["line"]}
          labels={({ datum }) => {
            if (parseFloat(datum.y) === k) {
              return `VERTEX (${datum.x} ; ${datum.y})`
            }
            if (parseFloat(datum.y) === 0) {
              return `ROOT (${datum.x} ; ${datum.y})`
            }
            if (parseFloat(datum.x) === 0) {
              return `Y-INTERCEPT (${datum.x} ; ${datum.y})`
            }
            return `(${datum.x} ; ${datum.y})`
          }
          }
        />
      }
    >
      <VictoryLine
        name="line"
        data={props.function.points.points}
      />
      <VictoryScatter

        style={{
          data: {
            fill: ({ datum }) => getPointColor(datum)
          }
        }}
        data={props.function.points.points}
      />

      <VictoryAxis
        crossAxis
        offsetY={175}
        domain={[suggestedXMin, suggestedXMax]}
      />
      <VictoryAxis
        dependentAxis
        crossAxis
        offsetX={175}
        domain={[suggestedYMin, suggestedYMax]}
      />
    </VictoryChart>
  )
}