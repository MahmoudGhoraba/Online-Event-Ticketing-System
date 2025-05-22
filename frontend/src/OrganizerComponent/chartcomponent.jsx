import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function ChartComponent() {
  const [analytics, setAnalytics] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const REFRESH_INTERVAL_SECONDS = 2;

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const { data: analyticsData } = await axios.get("http://localhost:3000/api/v1/users/events/analytics");
      setAnalytics(analyticsData || []);
    } catch (err) {
      console.error('Error fetching analytics:', err.message, err.response?.data);
    }
  };

  // Periodic refresh for analytics
  useEffect(() => {
    fetchAnalytics();

    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        console.log(`Refreshing analytics at ${new Date().toLocaleTimeString()}`);
        fetchAnalytics();
      }, REFRESH_INTERVAL_SECONDS * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]);

  // Memoize chart data
  const chartData = useMemo(() => ({
    labels: analytics.map(item => item.title),
    datasets: [{
      label: 'Percentage of Tickets Booked (%)',
      data: analytics.map(item => item.percentageOfTicketsPerEvent),
      backgroundColor: 'rgba(37, 99, 235, 0.3)', // #2563EB with opacity
      borderColor: '#2563EB',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(37, 99, 235, 0.5)',
      hoverBorderColor: '#1D4ED8',
    }]
  }), [analytics]);

  const chartOptions = {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#374151', // Gray-700
          font: { weight: '600' },
        },
        grid: {
          color: '#E5E7EB', // Gray-200 grid lines
        },
      },
      x: {
        ticks: {
          color: '#374151',
          font: { weight: '600' },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#111827', // Gray-900
          font: { weight: '700', size: 14 },
        },
      },
      tooltip: {
        backgroundColor: '#2563EB',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
  };

  const handleToggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: 24,
      borderRadius: 12,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxWidth: 900,
      margin: '0 auto',
    }}>
      <h3 style={{
        fontSize: 24,
        fontWeight: 800,
        color: '#111827',
        marginBottom: 24,
        textAlign: 'center',
      }}>
        Event Analytics
      </h3>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <button
          onClick={handleToggleAutoRefresh}
          style={{
            backgroundColor: autoRefresh ? '#2563EB' : '#6B7280',
            color: 'white',
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            boxShadow: autoRefresh
              ? '0 4px 6px rgba(37, 99, 235, 0.5)'
              : 'none',
            transition: 'background-color 0.3s ease',
          }}
        >
          {autoRefresh ? 'Disable Auto-Refresh' : 'Enable Auto-Refresh'}
        </button>
      </div>

      {analytics.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: 18 }}>
          No analytics data available.
        </p>
      )}
    </div>
  );
}

export default ChartComponent;
