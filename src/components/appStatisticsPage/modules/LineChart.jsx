import React from 'react';
import { Line } from 'react-chartjs-2';
import './lineChart.scss';

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
  const [dataDaily, setDataDaily] = useState({});
  const [dataTotal, setDataTotal] = useState({});

  const userId = useSelector((rootState) => rootState.control.currentPerson.userId);
  const token = useSelector((rootState) => rootState.control.currentPerson.token);

  const fetch = new FetchData(BACK_URL);

  useEffect(() => {
    fetch.getUsersStats(userId, token)
      .then((statsData) => {
        setLearnedWords(statsData.learnedWords);
        const keys = Object.keys(statsData.optional);
        const dataDailyFetched = {
          labels: keys,
          datasets: [
            {
              data: keys.map((key) => statsData.optional[key]),
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        };
        const dataTotalFetched = {
          labels: keys,
          datasets: [
            {
              data: keys.map((key, i, arr) => {
                if (i === 0) {
                  return statsData.optional[key];
                }
                let dailyToatal = 0;
                for (let j = 0; j < i; j += 1) {
                  dailyToatal += statsData.optional[arr[j]];
                }
                return dailyToatal;
              }),
              fill: false,
              backgroundColor: 'rgb(33, 150, 83)',
              borderColor: 'rgba(33, 150, 83, 0.2)',
            },
          ],
        };
        setDataDaily(dataDailyFetched);
        setDataTotal(dataTotalFetched);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-stats-page__long">
      <div className="app-stats-page__long_heading">
        <h2>
          {STATISTICS_PAGE.longHeader}
        </h2>
        <div className="app-stats-page__long_heading_brief">
          {`${STATISTICS_PAGE.wordsWholeTime}: ${learnedWords}`}
        </div>
      </div>
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
    </div>
  );
};

export default LineChart;
