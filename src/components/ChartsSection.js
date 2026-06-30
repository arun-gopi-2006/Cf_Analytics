import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ChartsSection({ difficultyData, topicData }) {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barInstanceRef = useRef(null);
  const pieInstanceRef = useRef(null);

  // Bar Chart (Difficulty Map)
  useEffect(() => {
    if (!barChartRef.current) return;

    if (barInstanceRef.current) {
      barInstanceRef.current.destroy();
    }

    const ctx = barChartRef.current.getContext('2d');
    barInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: difficultyData.labels,
        datasets: [{
          data: difficultyData.values,
          backgroundColor: '#3b82f6',
          borderRadius: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { size: 11, family: 'monospace' } }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: { color: '#64748b', precision: 0 }
          }
        }
      }
    });

    return () => {
      if (barInstanceRef.current) {
        barInstanceRef.current.destroy();
        barInstanceRef.current = null;
      }
    };
  }, [difficultyData]);

  // Pie Chart (Topics Distribution)
  useEffect(() => {
    if (!pieChartRef.current) return;

    if (pieInstanceRef.current) {
      pieInstanceRef.current.destroy();
    }

    const ctx = pieChartRef.current.getContext('2d');
    const professionalPalette = [
      '#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#64748b',
      '#a855f7', '#06b6d4', '#f43f5e', '#10b981', '#84cc16', '#eab308', '#38bdf8', '#fb7185'
    ];

    pieInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: topicData.labels,
        datasets: [{
          data: topicData.values,
          backgroundColor: professionalPalette,
          borderWidth: 1.5,
          borderColor: '#1e293b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            display: topicData.labels.length <= 15,
            labels: {
              color: '#94a3b8',
              font: { size: 10 },
              boxWidth: 10
            }
          }
        }
      }
    });

    return () => {
      if (pieInstanceRef.current) {
        pieInstanceRef.current.destroy();
        pieInstanceRef.current = null;
      }
    };
  }, [topicData]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#1e293b] p-5 rounded border border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Solved Problem Difficulty Map</h3>
        <div className="h-64 relative">
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
      <div className="bg-[#1e293b] p-5 rounded border border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Topic Wise Solved Distribution (Complete Map)</h3>
        <div className="h-64 relative flex justify-center">
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>
    </section>
  );
}

export default ChartsSection;
