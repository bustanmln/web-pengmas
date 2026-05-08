/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SensorCard, SensorStatus } from './components/SensorCard';
import { SettingsView } from './components/SettingsView';
import { User, Clock, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_SENSORS = [
  {
    id: 'CH-01',
    name: 'NOVA PM SDS011',
    description: 'PM2.5/PM10 V2.18.4',
    values: [
      { label: 'PM 2.5', value: '12.4', unit: 'µg/m³' },
      { label: 'PM 10', value: '28.1', unit: 'µg/m³' }
    ],
    status: 'nominal' as SensorStatus,
    icon: 'wind' as const
  },
  {
    id: 'CH-02',
    name: 'ME2-O3',
    description: 'Deteksi Ozon',
    values: [
      { label: 'Ozon', value: '0.04', unit: 'ppm' }
    ],
    status: 'nominal' as SensorStatus,
    icon: 'gas' as const
  },
  {
    id: 'CH-03',
    name: 'MQ-136',
    description: 'Hidrogen Sulfida (H2S)',
    values: [
      { label: 'H2S', value: '0.00', unit: 'ppm' }
    ],
    status: 'nominal' as SensorStatus,
    icon: 'chemical' as const
  },
  {
    id: 'CH-04',
    name: 'MQ-7',
    description: 'Karbon Monoksida (CO)',
    values: [
      { label: 'CO', value: '45.0', unit: 'ppm' }
    ],
    status: 'elevated' as SensorStatus,
    range: 'Rentang: 20-2000ppm',
    icon: 'gas' as const
  },
  {
    id: 'CH-05',
    name: 'FERMION NO2',
    description: 'MEMS Nitrogen Dioksida',
    values: [
      { label: 'NO2', value: '0.2', unit: 'ppm' }
    ],
    status: 'nominal' as SensorStatus,
    range: 'Rentang: 0.1-10ppm',
    icon: 'atom' as const
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sensors, setSensors] = useState(INITIAL_SENSORS);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pengmas-sindangkerta04-f435a-default-rtdb.firebaseio.com/MonitoringStation.json');
        const data = await response.json();
        
        if (data && data.Sensors) {
          const s = data.Sensors;
          
          setSensors([
            {
              id: 'CH-01',
              name: 'NOVA PM SDS011',
              description: 'PM2.5/PM10 V2.18.4',
              values: [
                { label: 'PM 2.5', value: s.PM25 !== undefined ? String(s.PM25) : '0', unit: 'µg/m³' },
                { label: 'PM 10', value: s.PM10 !== undefined ? String(s.PM10) : '0', unit: 'µg/m³' }
              ],
              status: (s.PM25 > 50 || s.PM10 > 100) ? 'elevated' : 'nominal',
              icon: 'wind' as const
            },
            {
              id: 'CH-02',
              name: 'ME2-O3',
              description: 'Deteksi Ozon',
              values: [
                { label: 'Ozon', value: s.Ozone !== undefined ? String(s.Ozone) : '0', unit: 'ppm' }
              ],
              status: s.Ozone > 0.1 ? 'elevated' : 'nominal',
              icon: 'gas' as const
            },
            {
              id: 'CH-03',
              name: 'MQ-136',
              description: 'Hidrogen Sulfida (H2S)',
              values: [
                { label: 'H2S', value: s.H2S !== undefined ? String(s.H2S) : '0', unit: 'ppm' }
              ],
              status: s.H2S > 0.05 ? 'elevated' : 'nominal',
              icon: 'chemical' as const
            },
            {
              id: 'CH-04',
              name: 'MQ-7',
              description: 'Karbon Monoksida (CO)',
              values: [
                { label: 'CO', value: s.CO !== undefined ? String(s.CO) : '0', unit: 'ppm' }
              ],
              status: s.CO > 35 ? 'elevated' : 'nominal',
              range: 'Rentang: 20-2000ppm',
              icon: 'gas' as const
            },
            {
              id: 'CH-05',
              name: 'FERMION NO2',
              description: 'MEMS Nitrogen Dioksida',
              values: [
                { label: 'NO2', value: s.NO2 !== undefined ? String(s.NO2) : '0', unit: 'ppm' }
              ],
              status: s.NO2 > 0.5 ? 'elevated' : 'nominal',
              range: 'Rentang: 0.1-10ppm',
              icon: 'atom' as const
            }
          ]);
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Poll every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background-dark font-sans text-white selection:bg-primary-indigo/30">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-[240px] p-8 lg:p-12 transition-all duration-300">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="space-y-1">
             <h2 className="text-2xl font-semibold tracking-tight">
               {activeTab === 'dashboard' && 'Selamat Datang, Admin'}
               {activeTab === 'settings' && 'Pengaturan Platform'}
             </h2>
             <p className="text-sm text-text-dim">
               {activeTab === 'dashboard' && 'Pantau performa sistem Anda hari ini.'}
               {activeTab === 'settings' && 'Konfigurasi parameter operasional dan batas keamanan.'}
             </p>
          </div>
          <div className="flex items-center gap-3 bg-card-bg px-4 py-2 rounded-full border border-card-border shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary-indigo flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium pr-1">Admin Profile</span>
          </div>
        </header>

        {/* Dynamic Content Switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <>
                {/* Status Line */}
                <div className="flex items-center gap-6 mb-8 text-text-dim">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                     <span className="text-xs font-medium uppercase tracking-widest text-text-light">Sistem Online</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs">
                     <Clock size={14} />
                     <span>Diperbarui: {lastUpdate.toLocaleTimeString()}</span>
                   </div>
                </div>

                {/* Dashboard Grid - Bento Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sensors.map((sensor) => (
                    <SensorCard 
                      key={sensor.id}
                      {...sensor}
                    />
                  ))}
                  
                  <motion.div 
                     whileHover={{ borderColor: '#3f3f46' }}
                     className="bg-card-bg border border-card-border p-6 rounded-2xl flex flex-col justify-center items-center gap-3 text-text-dim border-dashed cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center">
                      <Wifi size={20} />
                    </div>
                    <span className="text-xs font-medium">Tambah Sensor Baru</span>
                  </motion.div>
                </div>
              </>
            )}

            {activeTab === 'settings' && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

