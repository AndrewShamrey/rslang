import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Preloader from '../../wordConstructor/Game/components/Preloader';
import { BACK_URL } from '../../../utils/constants';
import FetchData from '../../../utils/fetchData';
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

const LineChart = () => {
  const [learnedWords, setLearnedWords] = useState(0);
  // async function fetchData() {
  //   // await setIsLoading(true);
  //   const data = await fetch(`${BACK_URL}/words?page=
  //   ${currentPage}&group=${currentGroup}`).then((d) => d.json());
  //   await setWords(data);
  //   await setIsLoading(false);
  // }

  const fetch = new FetchData(BACK_URL);

  useEffect(() => {
    fetch.getUsersStats('6076ba93bca34e00152daf3d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzZiYTkzYmNhMzRlMDAxNTJkYWYzZCIsImlhdCI6MTYxODQyMjM0MSwiZXhwIjoxNjE4NDM2NzQxfQ.J0VNepH0GBVqRIBX4eHWgciecIYS33LO32VgDBLKYCc')
      .then((data) => {
        console.log(data, data.learnedWords);
        setLearnedWords(data.learnedWords);
      });
  });

  return (
    <div className="line-charts__wrapper">
      <div>
        learned
        {learnedWords}
      </div>
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
};

export default LineChart;
