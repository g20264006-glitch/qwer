import React, { useState } from 'react';
import { AppState, TabType, Booking } from './types';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Canvas } from './components/Canvas';
import { Agent } from './components/Agent';
import { RedTeam } from './components/RedTeam';
import { Improvement } from './components/Improvement';
import { Presentation } from './components/Presentation';

const INITIAL_STATE: AppState = {
  teamInfo: { teamNumber: '', nickname: '' },
  canvas: {
    agentName: '',
    problem: '',
    goal: '',
    inputs: '',
    forbidden: '',
    hitl: '',
    privacy: '',
    fairness: ''
  },
  improvements: {
    problemsFound: '',
    addedRules: '',
    finalFixes: '',
    reflections: ''
  },
  bookings: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const setTeamInfo = (teamInfo: AppState['teamInfo']) => setState(s => ({ ...s, teamInfo }));
  const setCanvas = (canvas: AppState['canvas']) => setState(s => ({ ...s, canvas }));
  const setImprovements = (improvements: AppState['improvements']) => setState(s => ({ ...s, improvements }));
  const addBooking = (booking: Booking) => setState(s => ({ ...s, bookings: [...s.bookings, booking] }));

  return (
    <div className="flex h-screen w-full bg-[#f1f5f9] font-sans text-slate-800 overflow-hidden selection:bg-blue-200">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} teamInfo={state.teamInfo} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="text-blue-600">#</span> 한정판 물건 구매 독점 AI 고치기
          </h2>
          <div className="flex gap-4">
            <div className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium flex items-center shadow-sm">
              ⚠️ 현재 AI 상태: {activeTab === 'home' || activeTab === 'canvas' ? '불공정함' : '개선 중'}
            </div>
            {activeTab === 'presentation' && (
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">
                최종 제출
              </button>
            )}
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'home' && (
            <Home teamInfo={state.teamInfo} setTeamInfo={setTeamInfo} onStart={() => setActiveTab('canvas')} />
          )}
          {activeTab === 'canvas' && (
            <Canvas data={state.canvas} setData={setCanvas} />
          )}
          {activeTab === 'agent' && (
            <Agent teamInfo={state.teamInfo} bookings={state.bookings} addBooking={addBooking} />
          )}
          {activeTab === 'redteam' && (
            <RedTeam />
          )}
          {activeTab === 'log' && (
            <Improvement data={state.improvements} setData={setImprovements} />
          )}
          {activeTab === 'presentation' && (
            <Presentation state={state} />
          )}
        </div>
      </main>
    </div>
  );
}
