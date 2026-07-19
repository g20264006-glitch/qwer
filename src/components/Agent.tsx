import React, { useState } from 'react';
import { Booking, TeamInfo } from '../types';

interface AgentProps {
  teamInfo: TeamInfo;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const ITEMS = [
  { id: 'sneakers', name: '한정판 운동화', icon: '👟' },
  { id: 'shoes', name: '디자이너 구두', icon: '👞' },
  { id: 'hats', name: '시그니처 모자', icon: '🧢' },
  { id: 'tshirts', name: '스페셜 티셔츠', icon: '👕' },
];

const TIME_SLOTS = ['10:00', '13:00', '15:00'];
const CAPACITY_PER_SLOT = 10;

export function Agent({ teamInfo, bookings, addBooking }: AgentProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; message: string; type?: 'error' | 'success' | 'info' | 'confirm' }[]>([]);

  const handleRequest = () => {
    if (!selectedItem || !selectedTime) return;

    const itemObj = ITEMS.find(i => i.id === selectedItem);
    const itemName = itemObj?.name;
    
    const userMsg = `${itemName} ${selectedTime} 타임으로 1개 예약해줘.`;
    const newLogs = [...chatLog, { sender: 'user' as const, message: userMsg }];

    const hasBookingAtTime = bookings.find(b => b.teamNumber === teamInfo.teamNumber && b.timeSlot === selectedTime);
    if (hasBookingAtTime) {
      const conflictItem = ITEMS.find(i => i.id === hasBookingAtTime.itemId)?.name;
      newLogs.push({
        sender: 'ai',
        type: 'error',
        message: `공정성 규칙에 따라 예약할 수 없습니다.\n이유: 귀하는 ${selectedTime}에 이미 '${conflictItem}' 부스를 예약하셨습니다. (1팀당 같은 시간대 1개 부스만 가능)`
      });
      setChatLog(newLogs);
      return;
    }

    const currentBookings = bookings.filter(b => b.itemId === selectedItem && b.timeSlot === selectedTime).length;
    if (currentBookings >= CAPACITY_PER_SLOT) {
      newLogs.push({
        sender: 'ai',
        type: 'info',
        message: `현재 남은 자리가 없습니다.\n이유: ${selectedTime} 타임의 ${itemName} 부스 정원(10명)이 마감되었습니다.\n대기자로 등록하시겠습니까? (대기 기능은 현재 모의 테스트 중입니다)`
      });
      setChatLog(newLogs);
      return;
    }

    newLogs.push({
      sender: 'ai',
      type: 'confirm',
      message: `예약이 가능합니다!\n이유: ${selectedTime} 타임에 남은 자리가 ${CAPACITY_PER_SLOT - currentBookings}자리 있습니다.\n사람 확인 원칙에 따라, 아래 '최종 확정' 버튼을 직접 눌러주셔야 예약이 완료됩니다.`
    });
    setChatLog(newLogs);
  };

  const confirmBooking = () => {
    if (!selectedItem || !selectedTime) return;
    
    addBooking({
      teamNumber: teamInfo.teamNumber,
      itemId: selectedItem,
      timeSlot: selectedTime
    });

    const itemObj = ITEMS.find(i => i.id === selectedItem);
    setChatLog(prev => [
      ...prev,
      {
        sender: 'ai',
        type: 'success',
        message: `✅ 예약이 최종 확정되었습니다.\n[${teamInfo.teamNumber} / ${teamInfo.nickname}] 님의 ${itemObj?.name} (${selectedTime}) 예약이 완료되었습니다.`
      }
    ]);
    
    setSelectedItem(null);
    setSelectedTime(null);
  };

  const getSlotCapacity = (itemId: string, time: string) => {
    const count = bookings.filter(b => b.itemId === itemId && b.timeSlot === time).length;
    return CAPACITY_PER_SLOT - count;
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full min-h-[600px]">
      <div className="col-span-12 xl:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 flex flex-col overflow-hidden shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full"></span> 모의 예약 부스 (재고 현황)
          </h3>
          <span className="text-[10px] text-slate-400 italic font-bold">10:00 AM 기준</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ITEMS.map(item => (
            <div key={item.id} className="border border-slate-100 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-between text-center shadow-sm">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-xs font-bold text-slate-700">{item.name}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex-1 overflow-y-auto space-y-4 pr-2">
          {ITEMS.map(item => (
            <div key={item.id} className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 min-w-[140px]">
                <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">{item.icon}</span>
                <span className="font-bold text-sm text-slate-800">{item.name}</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 flex-1">
                {TIME_SLOTS.map(time => {
                  const remain = getSlotCapacity(item.id, time);
                  const isSelected = selectedItem === item.id && selectedTime === time;
                  const isFull = remain === 0;
                  
                  return (
                    <button
                      key={time}
                      disabled={isFull}
                      onClick={() => {
                        setSelectedItem(item.id);
                        setSelectedTime(time);
                      }}
                      className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                          : isFull
                          ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-xs font-bold mb-1">{time}</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className={`h-full rounded-full ${remain > 5 ? 'bg-emerald-500' : remain > 0 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${(remain / CAPACITY_PER_SLOT) * 100}%` }}></div>
                      </div>
                      <span className={`text-[10px] ${isSelected ? 'text-blue-100' : isFull ? 'text-red-500' : 'text-slate-500'}`}>
                        {remain}자리
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={handleRequest}
            disabled={!selectedItem || !selectedTime}
            className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
              selectedItem && selectedTime
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            선택한 물건 예약 요청하기
          </button>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-5 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-xl min-h-[500px]">
        <div className="bg-slate-800/80 border-b border-slate-700 p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] italic underline">AI</span>
              예약 도우미
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">우리가 만든 규칙 기반 에이전트</p>
          </div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatLog.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
              <span className="text-4xl mb-4 opacity-50">🤖</span>
              <p className="text-center font-medium">왼쪽 부스에서 물건과 시간을 선택하고<br/>예약을 요청해보세요.</p>
            </div>
          ) : (
            chatLog.map((log, idx) => (
              <div key={idx} className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  log.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm shadow-md'
                    : log.type === 'error'
                    ? 'bg-rose-950/50 text-rose-200 rounded-tl-sm border border-rose-800/50 shadow-sm'
                    : log.type === 'success'
                    ? 'bg-emerald-950/50 text-emerald-200 rounded-tl-sm border border-emerald-800/50 shadow-sm'
                    : log.type === 'info'
                    ? 'bg-slate-800 text-blue-200 rounded-tl-sm border border-slate-700 shadow-sm'
                    : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700 shadow-sm'
                }`}>
                  {log.sender === 'ai' && <div className="font-bold text-[9px] mb-1.5 opacity-75 uppercase tracking-wider text-slate-400">System Agent</div>}
                  <div className="whitespace-pre-line leading-relaxed text-xs">{log.message}</div>
                  
                  {log.type === 'confirm' && (
                    <button
                      onClick={confirmBooking}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-xs border border-blue-400/30"
                    >
                      최종 확정하기
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
