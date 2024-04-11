import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Avg. Delivery Time (Days)',
      data: [2, 3, 1, 5, 8, 3, 3, 3],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4
    },
  ],
};

function DTimeGraph() {
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
      <canvas ref={chartRef} style={{width: '100%', height: '135px'}}></canvas>
    </div>
  );
}

export default DTimeGraph;