import { LayoutDashboard, Settings, Radio } from 'lucide-react';
import { motion } from 'motion/react';

const menuItems = [
  { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
  { id: 'settings', label: 'PENGATURAN', icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside id="sidebar" className="w-[240px] bg-card-bg border-r border-card-border h-screen flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-2 h-2 rounded-full bg-primary-indigo shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
        <h1 className="text-xl font-bold tracking-tight text-white">NEXA SENSE</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            whileHover={{ x: 2, backgroundColor: 'rgba(39, 39, 42, 0.5)' }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
              item.id === activeTab
                ? 'bg-card-border text-white shadow-sm'
                : 'text-text-light hover:text-white'
            }`}
          >
            <item.icon size={18} className={item.id === activeTab ? 'text-primary-indigo' : 'text-text-light group-hover:text-white'} />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-card-border">
        <button className="flex items-center gap-3 px-4 py-3 text-sm text-text-light hover:text-white transition-colors w-full">
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
