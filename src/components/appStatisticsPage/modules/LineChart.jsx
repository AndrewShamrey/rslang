import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Line } from 'react-chartjs-2';
import './lineChart.scss';

const dataDaily = {
  labels: ['01.04.2021', '02.04.2021', '03.04.2021', '04.04.2021', '05.04.2021', '06.04.2021'],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const dataTotal = {
  labels: ['01.04.2021', '02.04.2021', '03.04.2021', '04.04.2021', '05.04.2021', '06.04.2021'],
  datasets: [
    {
      data: [12, 27, 30, 35, 37, 40],
      fill: false,
      backgroundColor: 'rgb(33, 150, 83)',
      borderColor: 'rgba(33, 150, 83, 0.2)',
    },
  ],
};

const options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = () => (
  <div className="line-charts__wrapper">
    <div className="line-chart__wrapper">
      <h3>Изучено слов за каждый день</h3>
      <Line data={dataDaily} options={options} />
    </div>
    <div className="line-chart__wrapper">
      <h3>Изучено слов за весь период</h3>
      <Line data={dataTotal} options={options} />
    </div>
  </div>
);

export default LineChart;
