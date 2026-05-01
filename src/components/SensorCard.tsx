import { CheckCircle2, AlertTriangle, Wind, Info, FlaskConical, Atom } from 'lucide-react';
import { motion } from 'motion/react';

export type SensorStatus = 'nominal' | 'elevated' | 'critical';

interface SensorValue {
  label: string;
  value: string;
  unit: string;
}

interface SensorCardProps {
  id: string;
  name: string;
  description: string;
  values: SensorValue[];
  status: SensorStatus;
  range?: string;
  icon?: 'wind' | 'gas' | 'chemical' | 'atom';
}

export function SensorCard({ id, name, description, values, status, range, icon }: SensorCardProps) {
  const isNominal = status === 'nominal';
  
  const IconMap = {
    wind: Wind,
    gas: Info,
    chemical: FlaskConical,
    atom: Atom
  };

  const StatusIcon = IconMap[icon || 'gas'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01, borderColor: '#3f3f46' }}
      className={`relative bg-card-bg border border-card-border p-6 rounded-2xl transition-all duration-300 group ${
        status === 'elevated' ? 'ring-1 ring-orange-500/20' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-semibold text-text-dim uppercase tracking-wider">{description}</span>
        <StatusIcon size={16} className="text-text-dim group-hover:text-primary-indigo transition-colors" />
      </div>

      <div className="space-y-4">
        {values.map((v, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-3xl font-semibold tracking-tight text-white">{v.value}<span className="text-sm font-normal text-text-dim ml-1">{v.unit}</span></span>
            <span className="text-[10px] text-text-dim uppercase font-medium mt-1">{v.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isNominal ? 'bg-green-500' : 'bg-orange-500'} shadow-sm`} />
          <span className={`text-xs font-medium uppercase tracking-wide ${isNominal ? 'text-green-500/80' : 'text-orange-500/80'}`}>
            {isNominal ? 'Normal' : 'Meningkat'}
          </span>
        </div>
        <div className="text-[10px] font-mono text-text-dim font-medium">{id}</div>
      </div>

      {range && (
        <div className="absolute top-6 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[9px] text-text-dim px-2 py-1 bg-card-border rounded-full italic">{range}</span>
        </div>
      )}
    </motion.div>
  );
}
