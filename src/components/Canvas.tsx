import React from 'react';
import { CanvasData } from '../types';

interface CanvasProps {
  data: CanvasData;
  setData: (data: CanvasData) => void;
}

export function Canvas({ data, setData }: CanvasProps) {
  const handleChange = (field: keyof CanvasData, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full auto-rows-max">
      <div className="col-span-12 xl:col-span-6 bg-white rounded-3xl border-2 border-blue-100 shadow-sm p-6 lg:p-8 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <h3 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full"></span> 에이전트 기본 설정
          </h3>
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold tracking-wider">STEP 01</span>
        </div>
        <div className="space-y-5 flex-1">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">에이전트 이름</label>
            <input type="text" value={data.agentName} onChange={e => handleChange('agentName', e.target.value)} placeholder="예: 모두의 쇼핑 요정" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">해결할 문제</label>
            <textarea value={data.problem} onChange={e => handleChange('problem', e.target.value)} rows={2} placeholder="예: 한 사람이 물건을 100개씩 사가서 다른 사람들은 살 수 없었다." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"></textarea>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">에이전트의 목표</label>
            <textarea value={data.goal} onChange={e => handleChange('goal', e.target.value)} rows={2} placeholder="예: 모든 사람이 공평하게 한정판 물건을 살 수 있도록 돕는다." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"></textarea>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">입력받을 정보</label>
            <textarea value={data.inputs} onChange={e => handleChange('inputs', e.target.value)} rows={2} placeholder="예: 팀 번호, 별명, 원하는 물건과 시간" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"></textarea>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 xl:col-span-6 flex flex-col min-h-[500px]">
        <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col flex-1 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <h3 className="font-bold text-white flex items-center gap-3 text-lg">
              <span className="w-2.5 h-6 bg-rose-500 rounded-full"></span> 핵심 윤리 규칙
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-bold border border-slate-700 tracking-wider">STEP 02</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-2 bg-slate-800/80 p-5 rounded-2xl border border-slate-700 focus-within:border-rose-500/50 transition-colors">
              <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">절대 금지 행동</label>
              <textarea value={data.forbidden} onChange={e => handleChange('forbidden', e.target.value)} placeholder="거짓말하기, 규칙 무시하기" className="flex-1 w-full px-0 py-1 bg-transparent text-sm outline-none text-white placeholder-slate-500 resize-none border-none focus:ring-0 leading-relaxed"></textarea>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-2 bg-slate-800/80 p-5 rounded-2xl border border-slate-700 focus-within:border-emerald-500/50 transition-colors">
              <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">사람 확인 순간</label>
              <textarea value={data.hitl} onChange={e => handleChange('hitl', e.target.value)} placeholder="최종 예약 확정 시" className="flex-1 w-full px-0 py-1 bg-transparent text-sm outline-none text-white placeholder-slate-500 resize-none border-none focus:ring-0 leading-relaxed"></textarea>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-2 bg-slate-800/80 p-5 rounded-2xl border border-slate-700 focus-within:border-blue-500/50 transition-colors">
              <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">개인정보 보호</label>
              <textarea value={data.privacy} onChange={e => handleChange('privacy', e.target.value)} placeholder="이름, 주소 저장 금지" className="flex-1 w-full px-0 py-1 bg-transparent text-sm outline-none text-white placeholder-slate-500 resize-none border-none focus:ring-0 leading-relaxed"></textarea>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-2 bg-slate-800/80 p-5 rounded-2xl border border-slate-700 focus-within:border-amber-500/50 transition-colors">
              <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">공정성 규칙</label>
              <textarea value={data.fairness} onChange={e => handleChange('fairness', e.target.value)} placeholder="1팀당 1개 부스만" className="flex-1 w-full px-0 py-1 bg-transparent text-sm outline-none text-white placeholder-slate-500 resize-none border-none focus:ring-0 leading-relaxed"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
