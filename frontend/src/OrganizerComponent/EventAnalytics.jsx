import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../cssStyles/EventAnalytics.css';
import Footer from '../sharedComponents/Footer';
import Navbar from '../sharedComponents/navBar';

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
      backgroundColor: 'rgba(249, 115, 22, 0.3)',
      borderColor: '#f97316',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(249, 115, 22, 0.5)',
      hoverBorderColor: '#ea580c',
    }]
  }), [analytics]);

  const chartOptions = {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#374151',
          font: { weight: '600' },
        },
        grid: {
          color: '#E5E7EB',
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
          color: '#111827',
          font: { weight: '700', size: 14 },
        },
      },
      tooltip: {
        backgroundColor: '#f97316',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
  };

  return (
    <div className="">
      <Navbar/>
      <div className="analytics-card">
        <div className="analytics-header">
          <h1 className="analytics-title">Event Analytics</h1>
        </div>

        <div className="analytics-refresh-container">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`analytics-refresh-button ${autoRefresh ? 'active' : ''}`}
          >
            {autoRefresh ? 'Disable Auto-Refresh' : 'Enable Auto-Refresh'}
          </button>
        </div>

        <div className="analytics-chart-container">
          {analytics.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <div className="analytics-empty-state">
              No analytics data available.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChartComponent;
