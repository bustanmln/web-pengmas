import { Cpu, Info } from 'lucide-react';

const COMPONENTS = [
  { 
    name: 'NOVA PM SDS011', 
    version: 'V2.18.4', 
    type: 'Sensor Partikel Debu', 
    target: 'PM2.5 & PM10', 
    desc: 'Sensor hamburan laser presisi tinggi untuk pemantauan partikel atmosfer.' 
  },
  { 
    name: 'ME2-O3', 
    version: 'V1.0', 
    type: 'Sensor Gas Elektrokimia', 
    target: 'Ozon (O3)', 
    desc: 'Sensor konsumsi daya rendah dengan sensitivitas tinggi terhadap konsentrasi Ozon.' 
  },
  { 
    name: 'MQ-136', 
    version: 'MOD-V2', 
    type: 'Sensor Gas Semikonduktor', 
    target: 'Hidrogen Sulfida (H2S)', 
    desc: 'Dikhususkan untuk mendeteksi gas H2S dengan sensitivitas yang dapat disesuaikan melalui output analog.' 
  },
  { 
    name: 'MQ-7', 
    version: 'Analog-V1', 
    type: 'Sensor Karbon Monoksida', 
    target: 'CO (20-2000ppm)', 
    desc: 'Modul deteksi CO standar menggunakan teknologi keramik micro-gap.' 
  },
  { 
    name: 'DFRobot Fermion NO2', 
    version: 'MEMS-X1', 
    type: 'Sensor Gas MEMS', 
    target: 'Nitrogen Dioksida (0.1-10ppm)', 
    desc: 'Teknologi MEMS ultra-kompak untuk deteksi lingkungan NO2 dengan akurasi tinggi.' 
  }
];

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div className="bg-card-bg border border-card-border p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-1">Inventaris Komponen</h3>
        <p className="text-sm text-text-dim">Spesifikasi teknis dan penamaan komponen perangkat keras aktif.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPONENTS.map((comp, idx) => (
          <div key={idx} className="bg-card-bg border border-card-border p-5 rounded-2xl hover:border-primary-indigo/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-indigo/10 flex items-center justify-center text-primary-indigo">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-primary-indigo transition-colors">{comp.name}</h4>
                  <span className="text-[10px] bg-card-border px-2 py-0.5 rounded-full text-text-light font-mono italic">
                    Firmware: {comp.version}
                  </span>
                </div>
              </div>
              <Info size={16} className="text-text-dim" />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-text-dim font-bold">Kategori</span>
                  <p className="text-xs text-text-light">{comp.type}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-text-dim font-bold">Target Deteksi</span>
                  <p className="text-xs text-primary-indigo font-semibold">{comp.target}</p>
                </div>
              </div>
              <div className="space-y-1 pt-2 border-t border-card-border/50">
                <span className="text-[9px] uppercase tracking-widest text-text-dim font-bold">Ringkasan Pabrikan</span>
                <p className="text-[11px] text-text-dim leading-relaxed">{comp.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
