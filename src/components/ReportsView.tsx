import { FileText, Download, Share2, Trash2, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const REPORTS = [
  { id: 'REP-001', name: 'Weekly Environmental Audit', date: '2023-11-20', size: '2.4 MB', type: 'PDF' },
  { id: 'REP-002', name: 'Station CH-01 Performance', date: '2023-11-18', size: '1.1 MB', type: 'CSV' },
  { id: 'REP-003', name: 'Monthly AQI Summary', date: '2023-11-01', size: '4.8 MB', type: 'PDF' },
  { id: 'REP-004', name: 'Alert History Log', date: '2023-10-31', size: '840 KB', type: 'JSON' },
];

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card-bg border border-card-border p-6 rounded-2xl">
        <div>
          <h3 className="text-xl font-bold">Laporan Tergenerasi</h3>
          <p className="text-sm text-text-dim">Akses dan kelola log data sensor yang diekspor</p>
        </div>
        <button className="bg-primary-indigo text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-opacity-90 transition-all flex items-center gap-2">
           Buat Laporan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistics Cards for Reports */}
        <div className="bg-card-bg border border-card-border p-6 rounded-2xl flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-primary-indigo/10 flex items-center justify-center text-primary-indigo">
             <FileText size={24} />
           </div>
           <div>
             <span className="text-2xl font-bold block">42</span>
             <span className="text-xs text-text-dim uppercase tracking-widest font-semibold">Total Laporan</span>
           </div>
        </div>
        <div className="bg-card-bg border border-card-border p-6 rounded-2xl flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
             <Download size={24} />
           </div>
           <div>
             <span className="text-2xl font-bold block">128</span>
             <span className="text-xs text-text-dim uppercase tracking-widest font-semibold">Unduhan</span>
           </div>
        </div>
        <div className="bg-card-bg border border-card-border p-6 rounded-2xl flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
             <Filter size={24} />
           </div>
           <div>
             <span className="text-2xl font-bold block">12.4 GB</span>
             <span className="text-xs text-text-dim uppercase tracking-widest font-semibold">Data Diekspor</span>
           </div>
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-card-border flex justify-between items-center">
            <span className="text-sm font-semibold">Aset File Terbaru</span>
            <button className="text-xs text-primary-indigo font-bold hover:underline">Lihat Semua File</button>
        </div>
        <div className="divide-y divide-card-border">
          {REPORTS.map((report) => (
            <motion.div 
              key={report.id}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
              className="px-6 py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-card-border flex items-center justify-center text-text-light group-hover:text-primary-indigo transition-colors">
                  <FileText size={20} />
                </div>
                <div>
                   <h4 className="text-sm font-semibold">{report.name === 'Weekly Environmental Audit' ? 'Audit Lingkungan Mingguan' : 
                                                          report.name === 'Station CH-01 Performance' ? 'Performa Stasiun CH-01' :
                                                          report.name === 'Monthly AQI Summary' ? 'Ringkasan ISPU Bulanan' :
                                                          report.name === 'Alert History Log' ? 'Log Riwayat Peringatan' : report.name}</h4>
                   <div className="flex items-center gap-2 text-[11px] text-text-dim">
                     <span>{report.id}</span>
                     <span>•</span>
                     <span>{report.date}</span>
                     <span>•</span>
                     <span>{report.size}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 hover:bg-card-border rounded-lg text-text-light hover:text-white transition-colors" title="Unduh">
                   <Download size={16} />
                 </button>
                 <button className="p-2 hover:bg-card-border rounded-lg text-text-light hover:text-white transition-colors" title="Bagikan">
                   <Share2 size={16} />
                 </button>
                 <button className="p-2 hover:bg-card-border rounded-lg text-text-light hover:text-error transition-colors" title="Hapus">
                   <Trash2 size={16} />
                 </button>
                 <ChevronRight size={16} className="text-text-dim ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
