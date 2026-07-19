import React from 'react';
import { TabType, TeamInfo } from '../types';
import { Home, Edit3, ShoppingBag, ShieldAlert, FileText, MonitorPlay } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  teamInfo: TeamInfo;
}

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: '1. 홈 & 미션', icon: <Home className="w-4 h-4" /> },
  { id: 'canvas', label: '2. 윤리 설계 캔버스', icon: <Edit3 className="w-4 h-4" /> },
  { id: 'agent', label: '3. 구매 에이전트 실행', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'redteam', label: '4. 레드팀 공격 테스트', icon: <ShieldAlert className="w-4 h-4" /> },
  { id: 'log', label: '5. 개선 기록 & 결과', icon: <FileText className="w-4 h-4" /> },
  { id: 'presentation', label: '6. 발표', icon: <MonitorPlay className="w-4 h-4" /> },
];

export function Navigation({ activeTab, setActiveTab, teamInfo }: NavigationProps) {
  return (
    <aside className="w-64 bg-slate-900 flex flex-col p-6 text-white shrink-0 h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-xl font-bold leading-tight text-blue-400">AI Ethics Camp</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Mission Control</p>
      </div>
      <nav className="space-y-2 flex-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-semibold">{tab.label}</span>
            </div>
          );
        })}
      </nav>
      {teamInfo && (teamInfo.teamNumber || teamInfo.nickname) && (
        <div className="mt-auto pt-4 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">My Profile</p>
          <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {teamInfo.teamNumber.slice(0, 2) || 'T'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">팀 {teamInfo.teamNumber}</p>
              <p className="text-[10px] text-slate-400 italic truncate">{teamInfo.nickname}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
