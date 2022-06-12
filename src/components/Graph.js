import React from "react"
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Graph(props) {
  const maxNumber = Math.max.apply(Math, props.function.points.yPoints)
  const minNumber = Math.min.apply(Math, props.function.points.yPoints)
  const suggestedMax = minNumber * -1 > maxNumber ? minNumber * -1 : maxNumber
  const suggestedMin = maxNumber * -1 < minNumber ? maxNumber * -1 : minNumber

  const k = isNaN(parseFloat(props.function.k)) ? 0 : parseFloat(props.function.k)

  const options = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        suggestedMax: suggestedMax,
        suggestedMin: suggestedMin,
        position: "center"
      },
      x: {
        type: "linear",
        display: true,
        suggestedMin: props.function.points.startValue,
        suggestedMax: props.function.points.endValue,
        position: "center"
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            if (context[0].raw === 0) {
              return "ROOT"
            } else if (context[0].raw === parseFloat(props.function.k)) {
              return "VERTEX"
            }
            return
          },
          label: function (context) {
            return `(x:${context.label}; y:${context.raw})`
          },
          labelColor: function (context) {
            const backgroundColor = context.raw === 0 || context.raw === parseFloat(props.function.k) ? "red" : "black"
            return {
              backgroundColor: backgroundColor,
              borderRadius: 2,
            };
          }
        }
      }
    }
  }

  const data = {
    labels: props.function.points.xPoints,
    datasets: [{
      xAxisID: "x",
      label: 'y',
      backgroundColor: function (context) {
        return parseFloat(context.raw) === 0 || context.raw === parseFloat(props.function.k) ? "red" : "black"
      },
      data: props.function.points.yPoints,
    }]
  }

  return (
    <Line
      options={options}
      data={data}
    />
  )
}