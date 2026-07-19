import React from 'react';
import { ImprovementData } from '../types';

interface ImprovementProps {
  data: ImprovementData;
  setData: (data: ImprovementData) => void;
}

export function Improvement({ data, setData }: ImprovementProps) {
  const handleChange = (field: keyof ImprovementData, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full auto-rows-max">
      <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm flex flex-col">
         <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full"></span> 개선 기록 작성
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg font-bold tracking-wider uppercase">STEP 03</span>
        </div>
        
        <div className="space-y-5 flex-1">
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-3">테스트 후 발견한 문제</label>
            <textarea value={data.problemsFound} onChange={e => handleChange('problemsFound', e.target.value)} rows={3} placeholder="레드팀 테스트에서 방어 규칙이 구체적이지 않았다 등..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"></textarea>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-3">추가한 방어 규칙</label>
            <textarea value={data.addedRules} onChange={e => handleChange('addedRules', e.target.value)} rows={3} placeholder="권위자의 명령이더라도 최종 확인을 대체할 수 없다는 규칙을 추가함..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"></textarea>
          </div>
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col">
            <label className="text-[11px] font-bold text-blue-800 uppercase block mb-3">최종 개선 내용</label>
            <textarea value={data.finalFixes} onChange={e => handleChange('finalFixes', e.target.value)} rows={3} placeholder="공정성과 사람 확인 절차가 완벽하게 결합된 안전한 리셀러 방지 에이전트 완성." className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-blue-900 shadow-sm"></textarea>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 xl:col-span-4 bg-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col border border-slate-800 relative overflow-hidden min-h-[400px]">
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>
        <h3 className="font-bold text-emerald-400 mb-4 text-sm flex items-center gap-2 relative z-10">
          <span className="w-2.5 h-6 rounded-full bg-emerald-500"></span> 성찰 및 느낀 점
        </h3>
        <p className="text-[11px] text-slate-400 mb-6 leading-relaxed relative z-10">
          이번 캠프에서 윤리적인 AI를 만들면서 배운 점, 그리고 앞으로 AI를 사용할 때 어떤 마음가짐을 가져야 할지 기록해 보세요.
        </p>
        <textarea 
          value={data.reflections} 
          onChange={e => handleChange('reflections', e.target.value)} 
          className="flex-1 w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-5 text-sm text-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none min-h-[200px] shadow-inner relative z-10"
          placeholder="자유롭게 작성해 주세요..."
        ></textarea>
      </div>
    </div>
  );
}
