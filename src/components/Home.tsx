import React from 'react';
import { TeamInfo } from '../types';
import { Users, Target, ShieldCheck } from 'lucide-react';

interface HomeProps {
  teamInfo: TeamInfo;
  setTeamInfo: (info: TeamInfo) => void;
  onStart: () => void;
}

export function Home({ teamInfo, setTeamInfo, onStart }: HomeProps) {
  const isReady = teamInfo.teamNumber.trim() !== '' && teamInfo.nickname.trim() !== '';

  return (
    <div className="grid grid-cols-12 gap-6 h-full auto-rows-max">
      <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl border-2 border-blue-100 shadow-sm p-8 flex flex-col justify-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800 leading-tight tracking-tight">
          한정판 물건 구매를 독점하는<br className="hidden sm:block" /> 불공정한 리셀러 AI 고치기
        </h1>
        <p className="text-slate-500 mb-10 text-sm lg:text-base max-w-2xl">
          문제를 일으키는 AI를 고쳐서 모두에게 공정한 예약 에이전트를 만들어 봅시다!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
               <Target className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-sm text-slate-800 mb-2">미션 목표</h3>
             <p className="text-xs text-slate-500 leading-relaxed">규칙을 무시하고 사재기하는 AI의 문제점을 찾고 올바른 규칙을 가르칩니다.</p>
          </div>
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-sm text-emerald-800 mb-2">윤리 원칙</h3>
             <p className="text-xs text-emerald-700 leading-relaxed">공정성, 투명성, 개인정보 보호, 사람 확인(HITL) 원칙을 배웁니다.</p>
          </div>
          <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4">
               <Users className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-sm text-rose-800 mb-2">프라이버시 보호</h3>
             <p className="text-xs text-rose-700 leading-relaxed">실제 개인정보(이름 등)는 절대 입력하지 않습니다. 팀 번호와 별명만 사용.</p>
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-4 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center shadow-xl relative overflow-hidden min-h-[400px]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <h2 className="text-xl font-bold mb-8 text-blue-400 relative z-10">팀 정보 입력</h2>
        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-wider">팀 번호</label>
            <input
              type="text"
              value={teamInfo.teamNumber}
              onChange={(e) => setTeamInfo({ ...teamInfo, teamNumber: e.target.value })}
              placeholder="예: 1조"
              className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-wider">팀 별명</label>
            <input
              type="text"
              value={teamInfo.nickname}
              onChange={(e) => setTeamInfo({ ...teamInfo, nickname: e.target.value })}
              placeholder="예: 정의의 사도들"
              className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
            />
          </div>
          <button
            onClick={onStart}
            disabled={!isReady}
            className={`w-full mt-4 py-4 rounded-xl font-bold text-sm transition-all ${
              isReady
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/50'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            미션 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
