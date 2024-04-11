import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Avg. Delivery Distance (Km)',
      data: [34, 28, 30, 37, 39, 35, 30, 36],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
    },
  ],
};

function DistancesGraph() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: data
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} style={{width: '100%', height: '80px'}}></canvas>
    </div>
  );
}

export default DistancesGraph;