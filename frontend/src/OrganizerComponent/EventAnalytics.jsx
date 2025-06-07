import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../cssStyles/EventAnalytics.css';
import Footer from '../sharedComponents/Footer';
import Navbar from '../sharedComponents/navBar';
import { useTheme } from '../theme/ThemeContext';
import { RefreshCw, TrendingUp, Users, Calendar } from 'lucide-react';

function ChartComponent() {
  const [analytics, setAnalytics] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const REFRESH_INTERVAL_SECONDS = 30;

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data: analyticsData } = await axios.get("http://localhost:3000/api/v1/users/events/analytics");
      setAnalytics(analyticsData || []);
    } catch (err) {
      console.error('Error fetching analytics:', err.message, err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary statistics
  const stats = useMemo(() => {
    if (!analytics.length) return null;
    return {
      totalEvents: analytics.length,
      averageBooking: Math.round(
        analytics.reduce((acc, curr) => acc + curr.percentageOfTicketsPerEvent, 0) / analytics.length
      ),
      mostPopular: analytics.reduce((acc, curr) => 
        curr.percentageOfTicketsPerEvent > (acc?.percentageOfTicketsPerEvent || 0) ? curr : acc
      , null)?.title
    };
  }, [analytics]);

  // Periodic refresh for analytics
  useEffect(() => {
    fetchAnalytics();

    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(fetchAnalytics, REFRESH_INTERVAL_SECONDS * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]);

  // Memoize chart data with modern styling
  const chartData = useMemo(() => ({
    labels: analytics.map(item => item.title),
    datasets: [{
      label: 'Tickets Booked (%)',
      data: analytics.map(item => item.percentageOfTicketsPerEvent),
      backgroundColor: isDarkMode ? 'rgba(249, 115, 22, 0.3)' : 'rgba(249, 115, 22, 0.2)',
      borderColor: '#f97316',
      borderWidth: 2,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(249, 115, 22, 0.5)',
      hoverBorderColor: '#ea580c',
    }]
  }), [analytics, isDarkMode]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
          font: { weight: '600' },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
          font: { weight: '600' },
          maxRotation: 45,
          minRotation: 45
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#f3f4f6' : '#111827',
          font: { weight: '600', size: 14 },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#f3f4f6' : '#111827',
        bodyColor: isDarkMode ? '#f3f4f6' : '#111827',
        borderColor: '#f97316',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => `Booked: ${context.raw}%`
        }
      },
    },
  };

  return (
    <div className={`analytics-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar/>
      <div className="analytics-card">
        <div className="analytics-header">
          <h1 className="analytics-title">Event Analytics Dashboard</h1>
          <p className="analytics-subtitle">Real-time insights into your event performance</p>
        </div>

        {stats && (
          <div className="analytics-stats-grid">
            <div className="analytics-stat-card">
              <Calendar className="h-6 w-6 mb-2 mx-auto text-orange-500" />
              <div className="analytics-stat-value">{stats.totalEvents}</div>
              <div className="analytics-stat-label">Total Events</div>
            </div>
            <div className="analytics-stat-card">
              <TrendingUp className="h-6 w-6 mb-2 mx-auto text-orange-500" />
              <div className="analytics-stat-value">{stats.averageBooking}%</div>
              <div className="analytics-stat-label">Average Booking Rate</div>
            </div>
            <div className="analytics-stat-card">
              <Users className="h-6 w-6 mb-2 mx-auto text-orange-500" />
              <div className="analytics-stat-value" style={{ fontSize: '1.2rem' }}>{stats.mostPopular}</div>
              <div className="analytics-stat-label">Most Popular Event</div>
            </div>
          </div>
        )}

        <div className="analytics-controls">
          <div className="analytics-refresh-container">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`analytics-refresh-button ${autoRefresh ? 'active' : ''}`}
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
            </button>
            <button
              onClick={fetchAnalytics}
              className="analytics-refresh-button"
              disabled={loading}
            >
              Refresh Now
            </button>
          </div>
        </div>

        <div className="analytics-chart-container">
          {loading ? (
            <div className="analytics-empty-state">
              <div className="analytics-spinner" />
              Loading analytics data...
            </div>
          ) : analytics.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <div className="analytics-empty-state">
              <TrendingUp className="h-12 w-12 text-orange-500 opacity-50" />
              <p>No analytics data available yet.</p>
              <p className="text-sm opacity-75">Start creating events to see insights here.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChartComponent;
