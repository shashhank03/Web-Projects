import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';
import axios from '../../utils/axiosConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    absent: 0,
    late: 0
  });

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('/api/attendance/stats');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setAttendanceData({
        present: 85,
        absent: 10,
        late: 5
      });
    }
  };

  const data = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        data: [attendanceData.present, attendanceData.absent, attendanceData.late],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
        borderColor: ['#059669', '#DC2626', '#D97706'],
        borderWidth: 2,
        hoverBackgroundColor: ['#34D399', '#F87171', '#FBBF24']
      }
    ]
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', 
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = (context.dataset.data as number[]).reduce(
              (a, b) => a + b,
              0
            );
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  const total = attendanceData.present + attendanceData.absent + attendanceData.late;
  const presentPercentage = total > 0 ? ((attendanceData.present / total) * 100).toFixed(1) : 0;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-center">Student Attendance</h3>
      <div className="relative h-64 mb-4">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center pb-8">
            <div className="text-2xl font-bold text-green-600">{presentPercentage}%</div>
            <div className="text-sm text-gray-500">Present</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="font-semibold text-green-600">{attendanceData.present}</div>
          <div className="text-gray-500">Present</div>
        </div>
        <div>
          <div className="font-semibold text-red-600">{attendanceData.absent}</div>
          <div className="text-gray-500">Absent</div>
        </div>
        <div>
          <div className="font-semibold text-yellow-600">{attendanceData.late}</div>
          <div className="text-gray-500">Late</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
