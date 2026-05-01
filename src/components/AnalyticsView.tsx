import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Calendar, MoreVertical, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

// Generates dummy data for the chart based on the provided reference image
const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      'PM2.5/PM10': 60 + Math.random() * 40,
      'Ozone': 40 + Math.random() * 50,
      'H2S': 20 + Math.random() * 20,
      'CO': 10 + Math.random() * 10,
      'NO2': 5 + Math.random() * 10,
    });
  }
  return data;
};

const PEAK_EVENTS = [
  { id: 1, timestamp: '2023-10-27 14:35', type: 'MQ-7 (CO)', value: '125 ppm', location: 'Station CH-01', status: 'Elevated' },
  { id: 2, timestamp: '2023-10-27 14:35', type: 'MQ-7 (CO)', value: '125 ppm', location: 'Station CH-01', status: 'Elevated' },
  { id: 3, timestamp: '2023-10-27 14:35', type: 'MQ-7 (CO)', value: '125 ppm', location: 'Station CH-01', status: 'Elevated' },
  { id: 4, timestamp: '2023-10-27 14:35', type: 'MQ-7 (CO)', value: '125 ppm', location: 'Station CH-01', status: 'Elevated' },
  { id: 5, timestamp: '2023-10-27 14:40', type: 'MQ-136 (H2S)', value: '50 ppm', location: 'Station CH-03', status: 'Elevated' },
];

export function AnalyticsView() {
  const [timeframe, setTimeframe] = useState('24h');
  const data = useMemo(() => generateData(), []);

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-card-bg border border-card-border rounded-lg p-1">
          {['1j', '6j', '24j', '7h', 'Kustom'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                timeframe === tf ? 'bg-card-border text-white' : 'text-text-light hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
          <div className="mx-1 w-px bg-card-border self-stretch" />
          <button className="px-3 py-1.5 text-text-light hover:text-white flex items-center gap-2">
            <Calendar size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
            <input 
              type="text" 
              placeholder="Cari titik data..." 
              className="bg-card-bg border border-card-border rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary-indigo outline-none w-48"
            />
          </div>
          <button className="p-2 bg-card-bg border border-card-border rounded-lg text-text-light">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-semibold">Perbandingan Sensor Real-time</h3>
            <p className="text-xs text-text-dim">Analisis data historis lintas saluran sensor aktif</p>
          </div>
          <button className="text-text-dim hover:text-white">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOzone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10 }}
                interval={4}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181b', 
                  border: '1px solid #27272a', 
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
                labelStyle={{ marginBottom: '8px', fontWeight: 'bold' }}
              />
              <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px' }} />
              <Area type="monotone" dataKey="PM2.5/PM10" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPM)" name="PM2.5/PM10" />
              <Area type="monotone" dataKey="Ozone" stroke="#f59e0b" fillOpacity={1} fill="url(#colorOzone)" name="Ozon" />
              <Line type="monotone" dataKey="H2S" stroke="#10b981" dot={false} strokeWidth={2} name="H2S" />
              <Line type="monotone" dataKey="CO" stroke="#ef4444" dot={false} strokeWidth={2} name="CO" />
              <Line type="monotone" dataKey="NO2" stroke="#8b5cf6" dot={false} strokeWidth={2} name="NO2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak Events Table */}
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="p-6 border-bottom border-card-border">
          <h3 className="text-lg font-semibold">Kejadian Puncak</h3>
          <p className="text-xs text-text-dim">Pelanggaran ambang batas terbaru dan aktivitas sensor signifikan</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-text-dim font-bold">
              <tr>
                <th className="px-6 py-4">Stempel Waktu</th>
                <th className="px-6 py-4">Tipe Sensor</th>
                <th className="px-6 py-4">Nilai</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-card-border">
              {PEAK_EVENTS.map((event) => (
                <tr key={event.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-text-light">{event.timestamp}</td>
                  <td className="px-6 py-4 font-medium">{event.type}</td>
                  <td className="px-6 py-4 text-primary-indigo font-semibold">{event.value}</td>
                  <td className="px-6 py-4 text-text-dim">{event.location}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 font-bold">
                      {event.status === 'Elevated' ? 'Meningkat' : event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
