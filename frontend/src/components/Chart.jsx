import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useCurrencies } from './CurrencyProvider';
import { useEffect, useState } from 'react';
import { usePriceUpdates } from './PriceProvider';
import { formatNumber } from '../utils/functions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 2.5,
    },
  },
  scales: {
    x: {
      display: true,
      ticks: {
        maxTicksLimit: 10,
        autoSkip: true,
      },
    },
    y: {
      display: true,
      ticks: {
        maxTicksLimit: 12,
        autoSkip: true,
        callback: function (value) {
          return `$${formatNumber(value)}`;
        },
      },
    },
  },
};

function Chart() {

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { priceUpdate } = usePriceUpdates();
  const { selectedCurrency } = useCurrencies();

  useEffect(() => {
    setChartData([]);
    setChartLabels([])
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency && priceUpdate && priceUpdate.last) {
      const symbol = selectedCurrency?.symbol;

      const timestamp = new Date().toLocaleTimeString();

      // max 200 points
      setChartLabels(prev => [...prev.slice(-199), timestamp]);
      setChartData(prev => [...prev.slice(-199), priceUpdate.last]);
    }
  }, [priceUpdate])

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Latest Price',
        data: chartData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      },
    ],
  };

  return (
    <div className="flex items-start justify-center mx-auto w-[96%] min-w-0 relative right-8">
      <div className="h-[30vh] w-[96%]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Chart;
