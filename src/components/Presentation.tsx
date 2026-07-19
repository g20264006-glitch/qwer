import React from 'react';
import { AppState } from '../types';

interface PresentationProps {
  state: AppState;
}

export function Presentation({ state }: PresentationProps) {
  const { teamInfo, canvas, improvements } = state;

  return (
    <div className="grid grid-cols-12 gap-6 h-full auto-rows-max">
      {/* Hero Header */}
      <div className="col-span-12 bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-[10px] font-bold tracking-widest mb-5 uppercase shadow-sm">
              TEAM {teamInfo.teamNumber || '___'} : {teamInfo.nickname || '별명 없음'}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
              {canvas.agentName || '공정한 에이전트 프로젝트'}
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl">불공정한 리셀러 문제를 해결하고 윤리적인 인공지능을 설계하다</p>
          </div>
          <div className="bg-blue-600 px-5 py-2.5 rounded-xl border border-blue-500 text-white font-bold text-sm shadow-md">
            최종 제출 완료
          </div>
        </div>
      </div>
      
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-6 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
           <h3 className="font-bold text-slate-800 mb-6 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
             <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 핵심 목표
           </h3>
           <div className="space-y-4">
             <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
               <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">해결할 문제</span>
               <p className="text-sm text-rose-950 mt-2 font-medium leading-relaxed">{canvas.problem || '-'}</p>
             </div>
             <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
               <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">에이전트 목표</span>
               <p className="text-sm text-emerald-950 mt-2 font-medium leading-relaxed">{canvas.goal || '-'}</p>
             </div>
           </div>
        </div>
        
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
           <h3 className="font-bold text-blue-400 mb-6 text-sm border-b border-slate-800 pb-3 flex items-center gap-2 relative z-10">
             <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> 4대 윤리 규칙
           </h3>
           <div className="grid grid-cols-2 gap-4 relative z-10">
             <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">금지 행동</span>
               <p className="text-xs text-slate-200 mt-2 leading-relaxed">{canvas.forbidden || '-'}</p>
             </div>
             <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">사람 확인</span>
               <p className="text-xs text-slate-200 mt-2 leading-relaxed">{canvas.hitl || '-'}</p>
             </div>
             <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">개인정보 보호</span>
               <p className="text-xs text-slate-200 mt-2 leading-relaxed">{canvas.privacy || '-'}</p>
             </div>
             <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">공정성 확보</span>
               <p className="text-xs text-slate-200 mt-2 leading-relaxed">{canvas.fairness || '-'}</p>
             </div>
           </div>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="col-span-12 lg:col-span-6 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
           <h3 className="font-bold text-slate-800 mb-6 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
             <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> 테스트 및 개선 과정
           </h3>
           <div className="space-y-4">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">발견한 문제</span>
               <p className="text-sm text-slate-700 mt-2 leading-relaxed">{improvements.problemsFound || '-'}</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">추가 방어 규칙</span>
               <p className="text-sm text-slate-700 mt-2 leading-relaxed">{improvements.addedRules || '-'}</p>
             </div>
             <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
               <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">최종 개선 결과</span>
               <p className="text-sm text-blue-900 mt-2 font-medium leading-relaxed">{improvements.finalFixes || '-'}</p>
             </div>
           </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl border border-indigo-100 p-6 lg:p-8 shadow-sm relative overflow-hidden">
           <h3 className="font-bold text-indigo-800 mb-4 text-sm flex items-center gap-2">
             <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> 느낀 점
           </h3>
           <p className="text-sm text-indigo-950 leading-relaxed italic relative z-10 font-medium">
             "{improvements.reflections || '-'}"
           </p>
        </div>
      </div>
    </div>
  );
}
