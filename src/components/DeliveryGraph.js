import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'No Units Delivered Over Time',
      data: [1200, 1900, 3000, 5000, 2000, 3000, 8000, 4000],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
    },
  ],
};

function DeliveryGraph() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: data,
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

export default DeliveryGraph;